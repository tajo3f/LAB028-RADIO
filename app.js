/**
 * LAB028: GO LIVE - CORE ENGINE
 * @author DJ JOTTAPE 028
 * @version 3.0.0
 */

// 1. CONFIGURAÇÃO CENTRAL (EDITÁVEL)
const RADIO_CONFIG = {
    url: "https://stream.zeno.fm/f9u67m2y30duv", // Link da Transmissão
    name: "LAB028: GO LIVE",
    description: "Sintonizado na batida real",
    updateInterval: 30000 // Intervalo para checar metadados (30s)
};

// 2. GERENCIAMENTO DE ESTADO (Reactive State)
const State = {
    isPlaying: false,
    volume: localStorage.getItem('lab028_vol') || 0.8,
    audioContext: null,
    analyser: null,
    
    // Notifica a interface sobre mudanças
    updateUI() {
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const statusText = document.getElementById('display-desc');

        if (this.isPlaying) {
            playIcon.innerHTML = 'Ⅱ'; // Ícone de Pause
            statusText.innerText = "Transmissão Ativa | 128kbps";
            playBtn.classList.add('playing');
        } else {
            playIcon.innerHTML = '▶'; // Ícone de Play
            statusText.innerText = "Sintonizando a batida real...";
            playBtn.classList.remove('playing');
        }
    }
};

// 3. ENGINE DE ÁUDIO
const audio = new Audio(RADIO_CONFIG.url);
audio.crossOrigin = "anonymous";
audio.preload = "auto";

const AudioEngine = {
    init() {
        audio.volume = State.volume;
        this.setupEventListeners();
        this.loadLastState();
    },

    async toggle() {
        try {
            if (State.isPlaying) {
                audio.pause();
                // Otimização: mata o stream ao pausar para economizar dados
                audio.src = ""; 
                audio.load();
                State.isPlaying = false;
            } else {
                audio.src = RADIO_CONFIG.url;
                await audio.play();
                State.isPlaying = true;
                this.initVisualizer(); // Inicia o motor visual se disponível
            }
            State.updateUI();
        } catch (err) {
            console.error("Erro ao iniciar transmissão:", err);
            alert("Erro ao conectar com o servidor. Tente novamente.");
        }
    },

    setVolume(val) {
        State.volume = val;
        audio.volume = val;
        localStorage.setItem('lab028_vol', val);
    },

    setupEventListeners() {
        document.getElementById('play-btn').onclick = () => this.toggle();
        document.getElementById('vol-slider').oninput = (e) => this.setVolume(e.target.value);
        
        // Media Session API (Controle por fone de ouvido e tela de bloqueio)
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: RADIO_CONFIG.name,
                artist: 'DJ JOTTAPE 028',
                album: 'A Frequência da Nova Cena',
                artwork: [
                    { src: 'assets/imgs/logo-512.png', sizes: '512x512', type: 'image/png' }
                ]
            });
        }
    },

    initVisualizer() {
        // Preparado para implementação de Canvas Visualizer futura
        if (!State.audioContext && State.isPlaying) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            State.audioContext = new AudioContext();
            // Lógica de análise de frequência entraria aqui
        }
    },

    loadLastState() {
        document.getElementById('vol-slider').value = State.volume;
    }
};

// 4. SISTEMA DE ROTAS (SPA - Single Page Application)
const Router = {
    routes: {
        '/': `
            <section class="hero-view fade-in">
                <div class="hero-content">
                    <h2 class="glitch" data-text="LAB028">LAB028</h2>
                    <h3 class="neon-subtitle">GO LIVE</h3>
                    <p class="hero-desc">Onde o funk encontra a tecnologia. Acompanhe os sets exclusivos do DJ JOTTAPE 028 em tempo real.</p>
                    <div class="hero-actions">
                        <button onclick="AudioEngine.toggle()" class="btn-main-cta">OUVIR AGORA</button>
                    </div>
                </div>
            </section>
        `,
        '/artistas': `
            <section class="view-container fade-in">
                <h2 class="section-title">EQUIPE LAB028</h2>
                <div class="artist-grid">
                    <div class="artist-card glass">
                        <div class="artist-img"></div>
                        <h4>DJ JOTTAPE 028</h4>
                        <p>Producer & Founder</p>
                    </div>
                </div>
            </section>
        `,
        '/enviar': `
            <section class="view-container fade-in">
                <h2 class="section-title">DEMO DROP</h2>
                <p>Envie sua música para avaliação na nossa grade.</p>
                <form id="submit-form" class="glass-form">
                    <input type="text" placeholder="Nome do Artista" required>
                    <input type="url" placeholder="Link da Música (Drive/SoundCloud)" required>
                    <button type="submit" class="btn-neon">ENVIAR TRACK</button>
                </form>
            </section>
        `
    },

    go(path) {
        window.history.pushState({}, "", path);
        this.render();
    },

    render() {
        const path = window.location.pathname;
        const container = document.getElementById('view-container');
        container.innerHTML = this.routes[path] || this.routes['/'];
        
        // Scroll para o topo
        window.scrollTo(0, 0);
    }
};

// 5. INICIALIZAÇÃO GLOBAL
window.addEventListener('popstate', () => Router.render());

document.addEventListener('DOMContentLoaded', () => {
    AudioEngine.init();
    Router.render();

    // Remove o Loader após o carregamento
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 2000);
});

// Expondo para o escopo global (para uso nos atributos onclick do HTML)
window.Router = Router;
window.AudioEngine = AudioEngine;
