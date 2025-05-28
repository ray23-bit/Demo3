
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

    let isPlaying = false;

    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
    }

    playButton.addEventListener('click', () => {
        if (!audioElement.src) return;

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }

        isPlaying = !isPlaying;
    });

    audioElement.addEventListener('timeupdate', () => {
        audioTime.textContent = \`\${formatTime(audioElement.currentTime)} / \${formatTime(audioElement.duration)}\`;
        progressBar.style.width = \`\${(audioElement.currentTime / audioElement.duration) * 100}%\`;
    });

    audioElement.addEventListener('ended', () => {
        isPlaying = false;
    });

    async function generateAudio() {
        const text = audioPrompt.value.trim();
        if (!text) return;

        const voice = voiceSelector.value;
        const encodedText = encodeURIComponent(text);
        const apiUrl = \`https://text.pollinations.ai/\${encodedText}?model=openai-audio&voice=\${voice}\`;

        audioInfo.innerHTML = '<div class="audio-loading-spinner"></div>';
        generateAudioButton.disabled = true;

        try {
            audioElement.src = apiUrl;
            await new Promise((resolve, reject) => {
                audioElement.addEventListener('loadedmetadata', resolve, { once: true });
                audioElement.addEventListener('error', reject, { once: true });
            });

            audioInfo.textContent = text;
            downloadAudioButton.onclick = () => {
                const link = document.createElement('a');
                link.href = apiUrl;
                link.download = 'rizqio_audio.mp3';
                link.click();
            };
        } catch {
            audioInfo.textContent = 'Gagal menghasilkan audio.';
        } finally {
            generateAudioButton.disabled = false;
        }
    }

    generateAudioButton.addEventListener('click', generateAudio);
    audioPrompt.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateAudio();
    });
});
