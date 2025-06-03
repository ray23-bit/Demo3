 // audio.js

document.addEventListener('DOMContentLoaded', () => { const audioElement = document.getElementById('audio-element'); const playButton = document.getElementById('play-button'); const progressBar = document.getElementById('progress-bar'); const audioTime = document.getElementById('audio-time'); const audioPrompt = document.getElementById('audio-prompt'); const generateAudioButton = document.getElementById('generate-audio-button'); const voiceSelector = document.getElementById('voice-selector'); const audioInfo = document.getElementById('audio-info'); const downloadAudioButton = document.getElementById('download-audio'); const clearBacksoundButton = document.getElementById('clear-backsound'); const userBacksoundInput = document.getElementById('user-backsound');

let isPlaying = false; let lastRequestTime = 0; let userSelectedMusic = null;

if (userBacksoundInput) { userBacksoundInput.addEventListener('change', () => { const file = userBacksoundInput.files[0]; if (file) { userSelectedMusic = URL.createObjectURL(file); } }); }

if (clearBacksoundButton) { clearBacksoundButton.addEventListener('click', () => { userSelectedMusic = null; if (userBacksoundInput) userBacksoundInput.value = ''; }); }

function updatePlayButton() { playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'; }

function formatTime(seconds) { if (isNaN(seconds)) return '00:00'; const mins = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}; }

playButton.addEventListener('click', () => { if (!audioElement.src) { audioInfo.textContent = 'No audio to play'; return; }

isPlaying = !isPlaying;
updatePlayButton();
isPlaying ? audioElement.play() : audioElement.pause();

});

audioElement.addEventListener('timeupdate', () => { if (!isNaN(audioElement.duration)) { audioTime.textContent = ${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}; progressBar.style.width = ${(audioElement.currentTime / audioElement.duration) * 100}%; } });

audioElement.addEventListener('ended', () => { isPlaying = false; updatePlayButton(); progressBar.style.width = '0%'; audioTime.textContent = 00:00 / ${formatTime(audioElement.duration)}; const backgroundMusic = document.getElementById('background-music'); if (backgroundMusic) backgroundMusic.pause(); });

async function generateAudio() { const now = Date.now(); if (now - lastRequestTime < 3000) { audioInfo.textContent = 'Please wait before generating again'; return; } lastRequestTime = now;

const text = audioPrompt.value.trim();
if (!text) {
  audioInfo.textContent = 'Please enter some text';
  return;
}

const voice = voiceSelector.value;
const encodedText = encodeURIComponent(text);
const apiUrl = `https://text.pollinations.ai/${encodedText}?model=openai-audio&voice=${voice}`;

audioInfo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating audio...';
generateAudioButton.disabled = true;
playButton.disabled = true;

try {
  audioElement.src = apiUrl;

  await new Promise((resolve, reject) => {
    audioElement.addEventListener('loadedmetadata', resolve, { once: true });
    audioElement.addEventListener('error', reject, { once: true });
    setTimeout(() => reject(new Error('Timeout')), 30000);
  });

  audioInfo.textContent = text;
  downloadAudioButton.onclick = () => {
    const link = document.createElement('a');
    link.href = apiUrl;
    link.download = `rizqio_audio_${Date.now()}.mp3`;
    link.click();
  };

  if (typeof playBackgroundMusicBasedOnText === 'function') {
    playBackgroundMusicBasedOnText(text);
  }

} catch (error) {
  console.error('Audio generation error:', error);
  audioInfo.textContent = 'Failed to generate audio. Please try again.';
} finally {
  generateAudioButton.disabled = false;
  playButton.disabled = false;
}

}

generateAudioButton.addEventListener('click', generateAudio); audioPrompt.addEventListener('keypress', (e) => { if (e.key === 'Enter') generateAudio(); }); });

