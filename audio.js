 // audio.js
document.addEventListener('DOMContentLoaded', () => {
  const audioElement = document.getElementById('audio-element');
  const playButton = document.getElementById('play-button');
  const progressBar = document.getElementById('progress-bar');
  const audioTime = document.getElementById('audio-time');
  const audioPrompt = document.getElementById('audio-prompt');
  const generateAudioButton = document.getElementById('generate-audio-button');
  const voiceSelector = document.getElementById('voice-selector');
  const audioInfo = document.getElementById('audio-info');
  const downloadAudioButton = document.getElementById('download-audio');
  
  // Elemen baru untuk backsound
  const backsoundUpload = document.createElement('input');
  backsoundUpload.type = 'file';
  backsoundUpload.accept = 'audio/*';
  backsoundUpload.style.display = 'none';
  document.body.appendChild(backsoundUpload);
  
  const selectBacksoundBtn = document.createElement('button');
  selectBacksoundBtn.id = 'select-backsound';
  selectBacksoundBtn.className = 'neumorph-btn';
  selectBacksoundBtn.textContent = 'Pilih Backsound';
  
  const removeBacksoundBtn = document.createElement('button');
  removeBacksoundBtn.id = 'remove-backsound';
  removeBacksoundBtn.className = 'neumorph-btn';
  removeBacksoundBtn.textContent = 'Tanpa Backsound';
  
  const backsoundInfo = document.createElement('span');
  backsoundInfo.id = 'backsound-info';
  backsoundInfo.textContent = 'Tidak ada backsound';
  
  const backsoundControls = document.createElement('div');
  backsoundControls.className = 'backsound-controls';
  backsoundControls.append(selectBacksoundBtn, removeBacksoundBtn, backsoundInfo);
  
  // Tempatkan controls setelah audio-player
  const audioPlayer = document.querySelector('.audio-player');
  audioPlayer.parentNode.insertBefore(backsoundControls, audioPlayer.nextSibling);

  let isPlaying = false;
  let lastRequestTime = 0;
  let backsoundAudio = null;
  let hasBacksound = false;

  function updatePlayButton() {
    playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function handleBacksoundUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('audio.*')) {
      backsoundInfo.textContent = 'File harus berupa audio';
      return;
    }
    
    const url = URL.createObjectURL(file);
    if (backsoundAudio) {
      backsoundAudio.pause();
      URL.revokeObjectURL(backsoundAudio.src);
    }
    
    backsoundAudio = new Audio(url);
    backsoundAudio.loop = true;
    hasBacksound = true;
    backsoundInfo.textContent = file.name.length > 20 
      ? file.name.substring(0, 17) + '...' 
      : file.name;
    
    backsoundAudio.volume = 0.3;
  }

  function removeBacksound() {
    if (backsoundAudio) {
      backsoundAudio.pause();
      URL.revokeObjectURL(backsoundAudio.src);
      backsoundAudio = null;
    }
    hasBacksound = false;
    backsoundInfo.textContent = 'Tidak ada backsound';
    backsoundUpload.value = '';
  }

  playButton.addEventListener('click', () => {
    if (!audioElement.src) {
      audioInfo.textContent = 'Tidak ada audio untuk diputar';
      return;
    }

    isPlaying = !isPlaying;
    updatePlayButton();
    
    if (isPlaying) {
      audioElement.play();
      if (hasBacksound && backsoundAudio) {
        backsoundAudio.currentTime = 0;
        backsoundAudio.play();
      }
    } else {
      audioElement.pause();
      if (backsoundAudio) backsoundAudio.pause();
    }
  });

  audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
      audioTime.textContent = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
      progressBar.style.width = `${(audioElement.currentTime / audioElement.duration) * 100}%`;
    }
  });

  audioElement.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
    progressBar.style.width = '0%';
    audioTime.textContent = `00:00 / ${formatTime(audioElement.duration)}`;
    if (backsoundAudio) backsoundAudio.pause();
  });

  selectBacksoundBtn.addEventListener('click', () => backsoundUpload.click());
  removeBacksoundBtn.addEventListener('click', removeBacksound);
  backsoundUpload.addEventListener('change', handleBacksoundUpload);

  async function generateAudio() {
    const now = Date.now();
    if (now - lastRequestTime < 3000) {
      audioInfo.textContent = 'Harap tunggu sebelum generate lagi';
      return;
    }
    lastRequestTime = now;

    const text = audioPrompt.value.trim();
    if (!text) {
      audioInfo.textContent = 'Masukkan teks terlebih dahulu';
      return;
    }

    const voice = voiceSelector.value;
    const encodedText = encodeURIComponent(text);
    const apiUrl = `https://text.pollinations.ai/${encodedText}?model=openai-audio&voice=${voice}`;

    audioInfo.innerHTML = '<div class="loading"></div> Generating audio...';
    generateAudioButton.disabled = true;
    playButton.disabled = true;
    selectBacksoundBtn.disabled = true;
    removeBacksoundBtn.disabled = true;

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
        link.download = `audio_${Date.now()}.mp3`;
        link.click();
      };
    } catch (error) {
      console.error('Error generating audio:', error);
      audioInfo.textContent = 'Gagal generate audio. Silakan coba lagi.';
    } finally {
      generateAudioButton.disabled = false;
      playButton.disabled = false;
      selectBacksoundBtn.disabled = false;
      removeBacksoundBtn.disabled = false;
    }
  }

  generateAudioButton.addEventListener('click', generateAudio);
  audioPrompt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateAudio();
  });
});
