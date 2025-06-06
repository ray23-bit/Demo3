 class VideoPromptGenerator {
    constructor() {
        this.container = document.getElementById('videoPromptGenerator');
        if (!this.container) return;
        
        this.currentLanguage = 'id'; // Default bahasa Indonesia
        this.initUI();
        this.setupEventListeners();
        this.setDefaults();
        this.translateUI(); // Terjemahkan UI berdasarkan bahasa default
    }

    initUI() {
        this.container.innerHTML = `
            <h2 class="panel-title"><i class="fas fa-film"></i> <span data-translate="generator_title">Generator Prompt Video AI</span></h2>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;"><span data-translate="generator_subtitle">Buat prompt video berkualitas tinggi untuk generasi video AI</span></p>
            
            <div class="section">
                <div class="input-group">
                    <label for="video-subject"><span data-translate="main_subject">Subjek Utama</span><br><small><span data-translate="main_subject_desc">(Objek atau fokus utama video)</span></small></label>
                    <input type="text" id="video-subject" placeholder="contoh: kota cyberpunk, robot futuristik">
                </div>
                
                <div class="input-group">
                    <label for="video-action"><span data-translate="action_verb">Aksi/Verb</span><br><small><span data-translate="action_verb_desc">(Aktivitas atau gerakan subjek)</span></small></label>
                    <input type="text" id="video-action" placeholder="contoh: terbang, menari, bertransformasi">
                </div>
                
                <div class="input-group">
                    <label for="video-model"><span data-translate="video_model">Model Video</span><br><small><span data-translate="video_model_desc">(Format dan tujuan video)</span></small></label>
                    <select id="video-model">
                        <option value="standard" data-translate="standard_video" data-translate-en="standard video">Video Standar</option>
                        <option value="youtube-shorts" data-translate="youtube_shorts" data-translate-en="YouTube Shorts">YouTube Shorts</option>
                        <option value="instagram-reels" data-translate="instagram_reels" data-translate-en="Instagram Reels">Instagram Reels</option>
                        <option value="tiktok" data-translate="tiktok" data-translate-en="TikTok">TikTok</option>
                        <option value="advertisement" data-translate="advertisement" data-translate-en="advertisement">Iklan</option>
                        <option value="tutorial" data-translate="tutorial" data-translate-en="tutorial">Tutorial</option>
                        <option value="film-pendek" data-translate="short_film" data-translate-en="short film">Film Pendek</option>
                        <option value="dokumenter" data-translate="documentary" data-translate-en="documentary">Dokumenter</option>
                        <option value="video-klip" data-translate="music_video" data-translate-en="music video">Video Klip Musik</option>
                        <option value="video-game" data-translate="game_content" data-translate-en="video game content">Konten Video Game</option>
                        <option value="live-action" data-translate="live_action" data-translate-en="live action">Live Action</option>
                        <option value="animasi-3D" data-translate="3d_animation" data-translate-en="3D animation">Animasi 3D</option>
                        <option value="animasi-2D" data-translate="2d_animation" data-translate-en="2D animation">Animasi 2D</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="video-style"><span data-translate="visual_style">Gaya Visual</span><br><small><span data-translate="visual_style_desc">(Estetika dan tampilan visual)</span></small></label>
                    <select id="video-style">
                        <option value="sinematik" data-translate="cinematic" data-translate-en="cinematic">Sinematik</option>
                        <option value="anime" data-translate="anime" data-translate-en="anime">Anime</option>
                        <option value="cyberpunk" data-translate="cyberpunk" data-translate-en="cyberpunk">Cyberpunk</option>
                        <option value="steampunk" data-translate="steampunk" data-translate-en="steampunk">Steampunk</option>
                        <option value="realistis" data-translate="realistic" data-translate-en="realistic">Realistis</option>
                        <option value="lukisan" data-translate="painting-like" data-translate-en="painting-like">Seperti Lukisan</option>
                        <option value="cat-air" data-translate="watercolor" data-translate-en="watercolor">Cat Air</option>
                        <option value="pixel-art" data-translate="pixel_art" data-translate-en="pixel art">Pixel Art</option>
                        <option value="claymation" data-translate="claymation" data-translate-en="claymation">Claymation</option>
                        <option value="surreal" data-translate="surreal" data-translate-en="surreal">Surealis</option>
                        <option value="minimalis" data-translate="minimalist" data-translate-en="minimalist">Minimalis</option>
                        <option value="retro-futuristik" data-translate="retro_futuristic" data-translate-en="retro-futuristic">Retro Futuristik</option>
                        <option value="grunge" data-translate="grunge" data-translate-en="grunge">Grunge</option>
                        <option value="noir" data-translate="noir" data-translate-en="noir">Noir</option>
                        <option value="fantasi" data-translate="fantasy" data-translate-en="fantasy">Fantasi</option>
                        <option value="sci-fi" data-translate="sci_fi" data-translate-en="sci-fi">Sci-Fi</option>
                        <option value="komik" data-translate="comic_style" data-translate-en="comic book style">Gaya Komik</option>
                        <option value="low-poly" data-translate="low_poly" data-translate-en="low poly">Low Poly</option>
                        <option value="uikit" data-translate="ui_kit" data-translate-en="UI kit/interactive">UI Kit/Interaktif</option>
                    </select>
                </div>
                
                <!-- Rest of your HTML remains the same, just add data-translate-en to all select options -->
                
                <div class="output-group">
                    <!-- Output group HTML remains the same -->
                </div>
                
                <!-- Dialog Modal -->
                <div id="video-dialog-modal" class="video-dialog hidden">
                    <div class="video-dialog-content">
                        <p id="video-dialog-message">Pesan Anda di sini</p>
                        <button id="video-dialog-close">OK</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ... (keep all existing methods until generatePrompt)

    async forceTranslate(text) {
        if (!text) return '';
        if (this.currentLanguage === 'en') return text;
        
        // Simple translation mapping - in a real app, use a proper translation API
        const translations = {
            'contoh: kota cyberpunk, robot futuristik': 'example: cyberpunk city, futuristic robot',
            'contoh: terbang, menari, bertransformasi': 'example: flying, dancing, transforming',
            'Detail atau persyaratan spesifik lainnya...': 'Additional details or specific requirements...',
            'Deskripsi efek suara atau musik yang diinginkan...': 'Description of desired sound effects or music...',
            'pemandangan kota cyberpunk': 'cyberpunk cityscape',
            'berkilau dengan lampu neon': 'shimmering with neon lights',
            'biru neon, ungu, dan merah muda': 'neon blue, purple, and pink',
            'Hujan turun, pantulan di permukaan basah, iklan holografik': 'Rain falling, reflections on wet surfaces, holographic advertisements',
            'Musik synthwave dengan bass yang dalam dan efek suara futuristik': 'Synthwave music with deep bass and futuristic sound effects',
            'kota cyberpunk': 'cyberpunk city',
            'robot futuristik': 'futuristic robot',
            'terbang': 'flying',
            'menari': 'dancing',
            'bertransformasi': 'transforming',
            'biru dan merah muda pastel': 'pastel blue and pink',
            'monokrom': 'monochrome',
            'Studio Ghibli': 'Studio Ghibli',
            'Wes Anderson': 'Wes Anderson'
        };
        
        return translations[text] || text;
    }

    async generatePrompt() {
        const getValue = (id) => document.getElementById(id)?.value.trim() || '';
        const getSelectValue = (id) => {
            const element = document.getElementById(id);
            if (!element) return '';
            const selectedOption = element.options[element.selectedIndex];
            return selectedOption.getAttribute('data-translate-en') || selectedOption.value;
        };

        // Get all values (force English translations)
        const subject = await this.forceTranslate(getValue('video-subject'));
        const action = await this.forceTranslate(getValue('video-action'));
        const model = getSelectValue('video-model');
        const style = getSelectValue('video-style');
        const mood = getSelectValue('video-mood');
        const camera = getSelectValue('video-camera');
        const lighting = getSelectValue('video-lighting');
        const color = await this.forceTranslate(getValue('video-color'));
        const artists = await this.forceTranslate(getValue('video-artists'));
        const resolution = getSelectValue('video-resolution');
        const fps = getSelectValue('video-fps');
        const aspect = getSelectValue('video-aspect');
        const details = await this.forceTranslate(getValue('video-details'));
        const sound = await this.forceTranslate(getValue('video-sound'));
        const charCount = getSelectValue('video-characters');

        if (!subject) {
            this.showNotification(
                this.currentLanguage === 'id' 
                    ? 'Masukkan subjek utama untuk video Anda' 
                    : 'Please enter the main subject for your video', 
                false
            );
            return;
        }

        // Generate prompt in English
        let prompt = `Create a ${model} in ${style} style about ${subject} ${action}. `;
        prompt += `Mood should be ${mood} with ${lighting} lighting. `;
        prompt += `Use ${camera} camera angle. `;

        if (color) prompt += `Color palette: ${color}. `;
        if (artists) prompt += `Artistic influences: ${artists}. `;
        prompt += `Technical specifications: ${resolution} resolution, ${fps} fps, ${aspect} aspect ratio. `;
        
        // Add characters and dialogue
        if (charCount !== '0') {
            prompt += `Number of characters: ${charCount}. `;
            
            for (let i = 1; i <= charCount; i++) {
                const charDesc = await this.forceTranslate(getValue(`video-character${i}-desc`));
                const charDialog = getValue(`video-character${i}-dialog`);
                
                if (charDesc) {
                    prompt += `Character ${i}: ${charDesc}. `;
                }
                if (charDialog) {
                    prompt += `Character ${i} dialogue: "${charDialog}". `;
                }
            }
        }
        
        if (details) prompt += `Additional details: ${details}. `;
        if (sound) prompt += `Sound effects and music: ${sound}. `;

        prompt += `--v 4.1 --style 4b --q 2`;

        const output = document.getElementById('video-prompt-output');
        if (output) {
            output.value = prompt;
        }

        this.showNotification(
            this.currentLanguage === 'id' 
                ? 'Prompt video berhasil dibuat!' 
                : 'Video prompt generated successfully!'
        );
    }

    // ... (keep all remaining existing methods)
}

// Inisialisasi saat DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    new VideoPromptGenerator();
});
