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
                        <option value="standard" data-translate="standard_video">Video Standar</option>
                        <option value="youtube-shorts" data-translate="youtube_shorts">YouTube Shorts</option>
                        <option value="instagram-reels" data-translate="instagram_reels">Instagram Reels</option>
                        <option value="tiktok" data-translate="tiktok">TikTok</option>
                        <option value="advertisement" data-translate="advertisement">Iklan</option>
                        <option value="tutorial" data-translate="tutorial">Tutorial</option>
                        <option value="film-pendek" data-translate="short_film">Film Pendek</option>
                        <option value="dokumenter" data-translate="documentary">Dokumenter</option>
                        <option value="video-klip" data-translate="music_video">Video Klip Musik</option>
                        <option value="video-game" data-translate="game_content">Konten Video Game</option>
                        <option value="live-action" data-translate="live_action">Live Action</option>
                        <option value="animasi-3D" data-translate="3d_animation">Animasi 3D</option>
                        <option value="animasi-2D" data-translate="2d_animation">Animasi 2D</option>
                    </select>
                </div>
                
                <!-- Bagian UI lainnya tetap sama, tapi tambahkan data-translate untuk semua teks yang perlu diterjemahkan -->
                <!-- ... -->
                
                <div class="output-group">
                    <label for="video-prompt-output"><span data-translate="generated_prompt">Prompt yang Dihasilkan</span><br><small><span data-translate="generated_prompt_desc">(Hasil generator prompt video)</span></small></label>
                    <textarea id="video-prompt-output" rows="5" readonly></textarea>
                    <button class="generate-button" id="generate-video-prompt">
                        <i class="fas fa-magic"></i> <span data-translate="generate_prompt">Buat Prompt Video</span>
                    </button>

                    <button class="clear-button" id="clear-video-prompt">
                        <i class="fas fa-eraser"></i> <span data-translate="clear_prompt">Hapus Prompt</span>
                    </button>
                    <button class="copy-button" id="copy-video-prompt">
                        <i class="fas fa-copy"></i> <span data-translate="copy_prompt">Salin Prompt</span>
                    </button>
                    
                    <div class="language-options" style="margin-top: 1rem;">
                        <label><span data-translate="select_language">Pilih Bahasa:</span></label>
                        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                            <button class="language-button active" data-lang="id">Indonesia</button>
                            <button class="language-button" data-lang="en">English</button>
                        </div>
                    </div>
                    
                    <button class="reset-button" id="reset-video-prompt" style="margin-top: 0.5rem;">
                        <i class="fas fa-sync-alt"></i> <span data-translate="reset_form">Reset Form</span>
                    </button>
                </div>
                
                <!-- Dialog Modal -->
                <div id="video-dialog-modal" class="video-dialog hidden">
                    <div class="video-dialog-content">
                        <p id="video-dialog-message">Pesan Anda di sini</p>
                        <button id="video-dialog-close">OK</button>
                    </div>
                </div>
        `;
    }

    setupEventListeners() {
        // ... (event listeners yang sama)

        // Language buttons handler
        const langButtons = document.querySelectorAll('.language-button');
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.currentLanguage = button.dataset.lang;
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.translateUI();
            });
        });

        // ... (event listeners lainnya)
    }

    translateUI() {
        const translations = {
            'id': {
                'generator_title': 'Generator Prompt Video AI',
                'generator_subtitle': 'Buat prompt video berkualitas tinggi untuk generasi video AI',
                'main_subject': 'Subjek Utama',
                'main_subject_desc': '(Objek atau fokus utama video)',
                'action_verb': 'Aksi/Verb',
                'action_verb_desc': '(Aktivitas atau gerakan subjek)',
                'generate_prompt': 'Buat Prompt Video',
                'clear_prompt': 'Hapus Prompt',
                'copy_prompt': 'Salin Prompt',
                'reset_form': 'Reset Form',
                // Tambahkan semua terjemahan lainnya untuk UI
            },
            'en': {
                'generator_title': 'AI Video Prompt Generator',
                'generator_subtitle': 'Create high-quality video prompts for AI video generation',
                'main_subject': 'Main Subject',
                'main_subject_desc': '(Main object or focus of the video)',
                'action_verb': 'Action/Verb',
                'action_verb_desc': '(Activity or movement of the subject)',
                'generate_prompt': 'Generate Video Prompt',
                'clear_prompt': 'Clear Prompt',
                'copy_prompt': 'Copy Prompt',
                'reset_form': 'Reset Form',
                // Tambahkan semua terjemahan lainnya untuk UI
            }
        };

        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[this.currentLanguage][key] || el.textContent;
        });

        // Update placeholder berdasarkan bahasa
        const subjectInput = document.getElementById('video-subject');
        const actionInput = document.getElementById('video-action');
        if (subjectInput && actionInput) {
            subjectInput.placeholder = this.currentLanguage === 'id' 
                ? 'contoh: kota cyberpunk, robot futuristik' 
                : 'example: cyberpunk city, futuristic robot';
            actionInput.placeholder = this.currentLanguage === 'id' 
                ? 'contoh: terbang, menari, bertransformasi' 
                : 'example: flying, dancing, transforming';
        }
    }

    generatePrompt() {
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
            this.showNotification(
                this.currentLanguage === 'id' 
                    ? 'Masukkan subjek utama untuk video Anda' 
                    : 'Please enter the main subject for your video', 
                false
            );
            return;
        }

        // Model translations
        const modelTranslations = {
            'standard': 'standard video',
            'youtube-shorts': 'YouTube Shorts',
            'instagram-reels': 'Instagram Reels',
            'tiktok': 'TikTok',
            'advertisement': 'advertisement',
            'tutorial': 'tutorial',
            'film-pendek': 'short film',
            'dokumenter': 'documentary',
            'video-klip': 'music video',
            'video-game': 'video game content',
            'live-action': 'live action',
            'animasi-3D': '3D animation',
            'animasi-2D': '2D animation'
        };

        // Style translations
        const styleTranslations = {
            'sinematik': 'cinematic',
            'anime': 'anime',
            'cyberpunk': 'cyberpunk',
            'steampunk': 'steampunk',
            'realistis': 'realistic',
            'lukisan': 'painting-like',
            'cat-air': 'watercolor',
            'pixel-art': 'pixel art',
            'claymation': 'claymation',
            'surreal': 'surreal',
            'minimalis': 'minimalist',
            'retro-futuristik': 'retro-futuristic',
            'grunge': 'grunge',
            'noir': 'noir',
            'fantasi': 'fantasy',
            'sci-fi': 'sci-fi',
            'komik': 'comic book style',
            'low-poly': 'low poly',
            'uikit': 'UI kit/interactive'
        };

        // Mood translations
        const moodTranslations = {
            'epik': 'epic',
            'misterius': 'mysterious',
            'romantis': 'romantic',
            'gelap': 'dark',
            'lucu': 'funny',
            'energik': 'energetic',
            'melankolis': 'melancholic',
            'futuristik': 'futuristic',
            'vintage': 'vintage',
            'mimpi': 'dream-like',
            'horor': 'horror',
            'komedi': 'comedy',
            'dramatis': 'dramatic',
            'heroik': 'heroic',
            'tenang': 'calm',
            'tegang': 'tense'
        };

        // Generate prompt dalam bahasa Inggris
        let prompt = `Create a ${modelTranslations[model] || model} in ${styleTranslations[style] || style} style about ${subject} ${action}. `;
        prompt += `Mood should be ${moodTranslations[mood] || mood} with ${lighting} lighting. `;
        prompt += `Use ${camera} camera angle. `;

        if (color) prompt += `Color palette: ${color}. `;
        if (artists) prompt += `Artistic influences: ${artists}. `;
        prompt += `Technical specifications: ${resolution} resolution, ${fps} fps, ${aspect} aspect ratio. `;
        
        // Tambahkan karakter dan dialog (dalam bahasa asli yang dimasukkan user)
        if (charCount !== '0') {
            prompt += `Number of characters: ${charCount}. `;
            
            for (let i = 1; i <= charCount; i++) {
                const charDesc = getValue(`video-character${i}-desc`);
                const charDialog = getValue(`video-character${i}-dialog`);
                
                if (charDesc) prompt += `Character ${i}: ${charDesc}. `;
                if (charDialog) prompt += `Character ${i} dialogue: "${charDialog}". `;
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

    // ... (method lainnya tetap sama)
}

document.addEventListener('DOMContentLoaded', () => {
    new VideoPromptGenerator();
});
