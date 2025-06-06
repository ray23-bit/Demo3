
class VideoPromptGenerator {
    constructor() {
        this.container = document.getElementById('videoPromptGenerator');
        if (!this.container) return;

        this.currentLanguage = 'id';
        this.initUI();
        this.setupEventListeners();
        this.setDefaults();
        this.translateUI();
    }

    async translateText(text, targetLang = 'en') {
        try {
            const response = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    q: text,
                    source: 'auto',
                    target: targetLang,
                    format: 'text'
                })
            });
            const result = await response.json();
            return result.translatedText || text;
        } catch (err) {
            console.error('Translation error:', err);
            return text;
        }
    }

    async generatePrompt() {
        const getValue = (id) => document.getElementById(id)?.value.trim() || '';
        const getSelectValue = (id) => document.getElementById(id)?.value || '';

        const subject = getValue('video-subject');
        const action = getValue('video-action');
        const model = getSelectValue('video-model');
        const style = getSelectValue('video-style');
        const mood = getSelectValue('video-mood');
        const camera = getSelectValue('video-camera');
        const lighting = getSelectValue('video-lighting');
        const color = getValue('video-color');
        const artists = getValue('video-artists');
        const resolution = getSelectValue('video-resolution');
        const fps = getSelectValue('video-fps');
        const aspect = getSelectValue('video-aspect');
        const details = getValue('video-details');
        const sound = getValue('video-sound');
        const charCount = getSelectValue('video-characters');

        if (!subject) {
            this.showNotification(this.currentLanguage === 'id' ? 'Masukkan subjek utama untuk video Anda' : 'Please enter the main subject for your video', false);
            return;
        }

        const translatedSubject = await this.translateText(subject);
        const translatedAction = await this.translateText(action);
        const translatedColor = await this.translateText(color);
        const translatedArtists = await this.translateText(artists);
        const translatedDetails = await this.translateText(details);
        const translatedSound = await this.translateText(sound);

        let prompt = `Create a ${model} in ${style} style about ${translatedSubject} ${translatedAction}. `;
        prompt += `Mood should be ${mood} with ${lighting} lighting. `;
        prompt += `Use ${camera} camera angle. `;

        if (translatedColor) prompt += `Color palette: ${translatedColor}. `;
        if (translatedArtists) prompt += `Artistic influences: ${translatedArtists}. `;
        prompt += `Technical specifications: ${resolution} resolution, ${fps} fps, ${aspect} aspect ratio. `;

        if (charCount !== '0') {
            prompt += `Number of characters: ${charCount}. `;
            for (let i = 1; i <= charCount; i++) {
                const charDesc = getValue(`video-character${i}-desc`);
                const charDialog = getValue(`video-character${i}-dialog`);

                if (charDesc) {
                    const translatedDesc = await this.translateText(charDesc);
                    prompt += `Character ${i}: ${translatedDesc}. `;
                }
                if (charDialog) {
                    prompt += `Character ${i} dialogue: "${charDialog}". `;
                }
            }
        }

        if (translatedDetails) prompt += `Additional details: ${translatedDetails}. `;
        if (translatedSound) prompt += `Sound effects and music: ${translatedSound}. `;

        prompt += `--v 4.1 --style 4b --q 2`;

        const output = document.getElementById('video-prompt-output');
        if (output) output.value = prompt;

        this.showNotification(this.currentLanguage === 'id' ? 'Prompt video berhasil dibuat!' : 'Video prompt generated successfully!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VideoPromptGenerator();
});
