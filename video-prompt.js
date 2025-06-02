 class VideoPromptGenerator {
    constructor() {
        this.container = document.getElementById('videoPromptGenerator');
        if (!this.container) return;
        
        this.initUI();
        this.setupEventListeners();
        this.setDefaults();
    }

    initUI() {
        this.container.innerHTML = `
            <h2 class="panel-title"><i class="fas fa-film"></i> AI Video Prompt Generator</h2>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Generate high-quality video prompts for AI video generation</p>
            
            <div class="section">
                
                <div class="input-group">
                    <label for="video-preset">Preset Style<br><small>(Gaya Cepat)</small></label>
                    <select id="video-preset">
                        <option value="">-- Select a preset / Pilih preset --</option>
                        <option value="cinematic">🎬 Cinematic Pack</option>
                        <option value="anime">🧧 Anime Pack</option>
                        <option value="cyberpunk">⚡ Cyberpunk Pack</option>
                        <option value="romantic">💖 Romantic Pack</option>
                        <option value="horror">👻 Horror Pack</option>
                        <option value="documentary">📽️ Documentary Pack</option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="video-subject">Main Subject</label>
                    <input type="text" id="video-subject" placeholder="e.g., cyberpunk city, futuristic robot">
                </div>
                
                <div class="input-group">
                    <label for="video-action">Action/Verb</label>
                    <input type="text" id="video-action" placeholder="e.g., flying, dancing, transforming">
                </div>
                
                <div class="input-group">
                    <label for="video-style">Visual Style</label>
                    <select id="video-style">
<option value="cinematic">Cinematic</option>
<option value="anime">Anime</option>
<option value="cyberpunk">Cyberpunk</option>
<option value="steampunk">Steampunk</option>
<option value="realistic">Realistic</option>
<option value="painterly">Painterly</option>
<option value="watercolor">Watercolor</option>
<option value="pixel-art">Pixel Art</option>
<option value="claymation">Claymation</option>
<option value="surreal">Surreal</option>
<option value="minimalist">Minimalist</option>
<option value="retro-futurism">Retro Futurism</option>
<option value="noir">Noir</option>
<option value="expressionist">Expressionist</option>
<option value="baroque">Baroque</option>
<option value="gothic">Gothic</option>
<option value="vaporwave">Vaporwave</option>
<option value="grunge">Grunge</option>
<option value="dreamcore">Dreamcore</option>
<option value="neonpunk">Neonpunk</option>
</select>
                </div>
                
                <div class="input-group">
                    <label for="video-mood">Mood/Tone</label>
                    <select id="video-mood">
<option value="epic">Epic</option>
<option value="mysterious">Mysterious</option>
<option value="romantic">Romantic</option>
<option value="dark">Dark</option>
<option value="whimsical">Whimsical</option>
<option value="energetic">Energetic</option>
<option value="melancholic">Melancholic</option>
<option value="futuristic">Futuristic</option>
<option value="vintage">Vintage</option>
<option value="dreamy">Dreamy</option>
<option value="horror">Horror</option>
<option value="comedic">Comedic</option>
<option value="uplifting">Uplifting</option>
<option value="suspenseful">Suspenseful</option>
<option value="calm">Calm</option>
<option value="intense">Intense</option>
<option value="inspirational">Inspirational</option>
<option value="nostalgic">Nostalgic</option>
</select>
                </div>
            </div>
            
            <div class="section advanced-section">
                <input type="checkbox" id="video-advanced-toggle" class="advanced-toggle" style="display: none;">
                <label for="video-advanced-toggle" class="toggle-container">
                    <span class="toggle"></span>
                    <span>Advanced Options</span>
                </label>
                
                <div class="advanced-content" id="video-advanced-content">
                    <div class="input-group">
                        <label for="video-camera">Camera Angle</label>
                        <select id="video-camera">
<option value="close-up">Close-up</option>
<option value="medium shot">Medium shot</option>
<option value="wide shot">Wide shot</option>
<option value="aerial view">Aerial view</option>
<option value="dutch angle">Dutch angle</option>
<option value="over-the-shoulder">Over-the-shoulder</option>
<option value="point-of-view">Point-of-view</option>
<option value="tracking shot">Tracking shot</option>
<option value="low angle">Low Angle</option>
<option value="high angle">High Angle</option>
<option value="extreme close-up">Extreme Close-up</option>
<option value="long shot">Long Shot</option>
<option value="two shot">Two Shot</option>
<option value="fish eye">Fisheye Lens</option>
</select>
                    </div>
                    
                    <div class="input-group">
                        <label for="video-lighting">Lighting</label>
                        <select id="video-lighting">
<option value="natural">Natural</option>
<option value="studio">Studio</option>
<option value="neon">Neon</option>
<option value="volumetric">Volumetric</option>
<option value="low-key">Low-key</option>
<option value="high-key">High-key</option>
<option value="backlit">Backlit</option>
<option value="rim light">Rim light</option>
<option value="chiaroscuro">Chiaroscuro</option>
<option value="dramatic">Dramatic</option>
<option value="soft">Soft</option>
<option value="hard">Hard</option>
<option value="golden hour">Golden Hour</option>
<option value="moonlight">Moonlight</option>
</select>
                    </div>
                    
                    <div class="input-group">
                        <label for="video-color">Color Palette</label>
                        <input type="text" id="video-color" placeholder="e.g., pastel blues and pinks, monochrome">
                    </div>
                    
                    <div class="input-group">
                        <label for="video-artists">Artistic Influences</label>
                        <input type="text" id="video-artists" placeholder="e.g., Studio Ghibli, Wes Anderson">
                    </div>
                    
                    <div class="input-group">
                        <label for="video-resolution">Resolution</label>
                        <select id="video-resolution">
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="2K">2K</option>
                            <option value="4K">4K</option>
                            <option value="8K">8K</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="video-fps">Frame Rate</label>
                        <select id="video-fps">
                            <option value="24">24 fps (cinematic)</option>
                            <option value="30">30 fps (standard)</option>
                            <option value="60">60 fps (smooth)</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="video-aspect">Aspect Ratio</label>
                        <select id="video-aspect">
<option value="16:9">16:9 (widescreen)</option>
<option value="4:3">4:3 (standard)</option>
<option value="1:1">1:1 (square)</option>
<option value="21:9">21:9 (ultrawide)</option>
<option value="9:16">9:16 (vertical)</option>
<option value="horizontal 9:16">9:16 (horizontal)</option>
</select>
                    </div>
                    
                    <div class="input-group">
                        <label for="video-details">Additional Details</label>
                        <textarea id="video-details" rows="3" placeholder="Any other specific details or requirements..."></textarea>
                    </div>
                </div>
            </div>
            
            <div class="output-group">
                <label for="video-prompt-output">Generated Prompt</label>
                <textarea id="video-prompt-output" rows="5" readonly></textarea>
                <button class="generate-button" id="generate-video-prompt">
                    <i class="fas fa-magic"></i> Generate Video Prompt
                </button>
                <button class="copy-button" id="copy-video-prompt">
                    <i class="fas fa-copy"></i> Copy Prompt
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        // Advanced options toggle
        const advancedToggle = document.getElementById('video-advanced-toggle');
        if (advancedToggle) {
            advancedToggle.addEventListener('change', (e) => {
                const content = document.getElementById('video-advanced-content');
                if (content) {
                    content.style.display = e.target.checked ? 'block' : 'none';
                }
            });
        }

        
        // Preset dropdown
        const presetDropdown = document.getElementById('video-preset');
        if (presetDropdown) {
            presetDropdown.addEventListener('change', (e) => {
                const preset = e.target.value;
                const apply = (id, value) => {
                    const el = document.getElementById(id);
                    if (el) el.value = value;
                };
                if (preset === 'cinematic') {
                    apply('video-style', 'cinematic');
                    apply('video-mood', 'epic');
                    apply('video-camera', 'wide shot');
                    apply('video-lighting', 'chiaroscuro');
                    apply('video-aspect', '21:9');
                    apply('video-fps', '24');
                    apply('video-resolution', '4K');
                } else if (preset === 'anime') {
                    apply('video-style', 'anime');
                    apply('video-mood', 'whimsical');
                    apply('video-camera', 'medium shot');
                    apply('video-lighting', 'soft');
                    apply('video-aspect', '16:9');
                    apply('video-fps', '30');
                    apply('video-resolution', '1080p');
                } else if (preset === 'cyberpunk') {
                    apply('video-style', 'cyberpunk');
                    apply('video-mood', 'futuristic');
                    apply('video-camera', 'dutch angle');
                    apply('video-lighting', 'neon');
                    apply('video-aspect', '21:9');
                    apply('video-fps', '60');
                    apply('video-resolution', '4K');
                } else if (preset === 'romantic') {
                    apply('video-style', 'painterly');
                    apply('video-mood', 'romantic');
                    apply('video-camera', 'close-up');
                    apply('video-lighting', 'golden hour');
                    apply('video-aspect', '4:3');
                    apply('video-fps', '24');
                    apply('video-resolution', '1080p');
                } else if (preset === 'horror') {
                    apply('video-style', 'noir');
                    apply('video-mood', 'horror');
                    apply('video-camera', 'point-of-view');
                    apply('video-lighting', 'low-key');
                    apply('video-aspect', '16:9');
                    apply('video-fps', '24');
                    apply('video-resolution', '1080p');
                } else if (preset === 'documentary') {
                    apply('video-style', 'realistic');
                    apply('video-mood', 'calm');
                    apply('video-camera', 'aerial view');
                    apply('video-lighting', 'natural');
                    apply('video-aspect', '16:9');
                    apply('video-fps', '30');
                    apply('video-resolution', '4K');
                }
            });
        }


        // Generate button
        const generateBtn = document.getElementById('generate-video-prompt');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generatePrompt());
        }

        // Copy button
        const copyBtn = document.getElementById('copy-video-prompt');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPrompt());
        }
    }

    setDefaults() {
        // Set default values for demonstration
        const defaults = {
            'video-subject': 'cyberpunk cityscape',
            'video-action': 'glowing with neon lights',
            'video-style': 'cyberpunk',
            'video-mood': 'futuristic',
            'video-camera': 'aerial view',
            'video-lighting': 'neon',
            'video-color': 'neon blues, purples, and pinks',
            'video-artists': 'Blade Runner, Akira',
            'video-resolution': '1080p',
            'video-fps': '24',
            'video-aspect': '16:9',
            'video-details': 'Rain falling, reflections on wet surfaces, holographic advertisements'
        };

        for (const [id, value] of Object.entries(defaults)) {
            const element = document.getElementById(id);
            if (element) element.value = value;
        }
    }

    generatePrompt() {
        const getValue = (id) => document.getElementById(id)?.value.trim() || '';
        const getSelectValue = (id) => document.getElementById(id)?.value || '';

        const subject = getValue('video-subject');
        const action = getValue('video-action');
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
        const dialogue = getValue('video-dialogue');
        const advancedEnabled = document.getElementById('video-advanced-toggle')?.checked || false;

        if (!subject) {
            this.showNotification('Please enter a main subject for your video', false);
            return;
        }

        let prompt = `Create a ${style} style video of ${subject} ${action}. `;
        prompt += `The mood should be ${mood} with ${lighting} lighting. `;
        prompt += `Use a ${camera} camera angle. `;

        if (color) prompt += `Color palette: ${color}. `;
        if (artists) prompt += `Artistic influences: ${artists}. `;
        if (advancedEnabled) {
            prompt += `Technical specifications: ${resolution} resolution, ${fps} fps, ${aspect} aspect ratio. `;
        }
        if (dialogue) prompt += `Dialog: "${dialogue}". `;
        if (details) prompt += `Additional details: ${details}. `;

        prompt += `--v 4.1 --style 4b --q 2`;

        const output = document.getElementById('video-prompt-output');
        if (output) output.value = prompt;
    }

    copyPrompt() {
        const output = document.getElementById('video-prompt-output');
        if (!output || !output.value) {
            this.showNotification('No prompt to copy! Generate a prompt first.', false);
            return;
        }

        output.select();
        document.execCommand('copy');

        // Visual feedback
        const copyBtn = document.getElementById('copy-video-prompt');
        if (copyBtn) {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }

        this.showNotification('Video prompt copied to clipboard!');
    }

    showNotification(message, isSuccess = true) {
        // You can integrate with your existing notification system
        const notification = document.getElementById('notification');
        if (notification) {
            notification.style.display = 'block';
            notification.style.backgroundColor = isSuccess ? 'var(--success)' : 'var(--error)';
            const messageEl = document.getElementById('notification-message');
            if (messageEl) messageEl.textContent = message;
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        } else {
            alert(message);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoPromptGenerator();
});
