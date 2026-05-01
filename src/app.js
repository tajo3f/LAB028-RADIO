// =============================
// 🔥 CONFIGURAÇÃO DA WEB RÁDIO
// =============================
const RADIO_CONFIG = {
  streamURL: "https://stream.zeno.fm/f9u67m2y30duv", // Cole seu link aqui
  name: "LAB028 RADIO",
  description: "Onde os hits nascem",
  autoPlay: false
};

// --- GERENCIAMENTO DE ESTADO (Pub/Sub) ---
const State = {
    playing: false,
    currentView: '/',
    volume: 0.8
};

// --- MOTOR DE ÁUDIO ---
const AudioEngine = {
    audio: new Audio(RADIO_CONFIG.streamURL),
    
    init() {
        this.audio.volume = State.volume;
        this.setupListeners();
    },

    setupListeners() {
        const playBtn = document.getElementById('play-btn');
        const volSlider = document.getElementById('vol-slider');

        playBtn.addEventListener('click', () => this.toggle());
        volSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value;
        });
    },

    toggle() {
        const icon = document.getElementById('play-icon');
        if (State.playing) {
            this.audio.pause();
            icon.innerText = "▶";
        } else {
            this.audio.play().catch(() => alert("Clique em qualquer lugar da página para habilitar o áudio."));
            icon.innerText = "II";
        }
        State.playing = !State.playing;
    }
};

// --- ROTEADOR SPA ---
const Router = {
    routes: {
        '/': `
            <section class="hero">
                <h1 class="glitch">LAB028</h1>
                <p>O SOM DA QUEBRADA EM ALTA DEFINIÇÃO</p>
                <div class="glass" style="padding: 20px; margin-top: 30px;">
                    <p>DJs Online: <strong>DJ JOTTAPE 028</strong></p>
                </div>
            </section>
        `,
        '/artistas': `
            <section style="padding: 150px 10%;">
                <h2>ARTISTAS LAB028</h2>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;">
                    <div class="glass" style="height: 200px;"></div>
                    <div class="glass" style="height: 200px;"></div>
                    <div class="glass" style="height: 200px;"></div>
                </div>
            </section>
        `,
        '/enviar': `
            <section style="padding: 150px 10%;">
                <h2>ENVIE SUA TRACK</h2>
                <form id="music-form" style="display:flex; flex-direction:column; gap:15px; max-width:400px; margin-top:30px;">
                    <input type="text" placeholder="Nome Artístico" class="glass" style="padding:15px; color:white;">
                    <input type="email" placeholder="Seu E-mail" class="glass" style="padding:15px; color:white;">
                    <button class="btn-neon" style="padding:15px; background:var(--primary); color:white; border:none; cursor:pointer;">ENVIAR AGORA</button>
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
        
        // Efeito de transição suave
        container.style.opacity = 0;
        setTimeout(() => container.style.opacity = 1, 50);
    }
};

// --- INICIALIZAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    AudioEngine.init();
    Router.render();
    
    // UI Config inicial
    document.getElementById('display-station-name').innerText = RADIO_CONFIG.name;
    document.getElementById('display-desc').innerText = RADIO_CONFIG.description;

    // Remove Loader
    setTimeout(() => {
        document.getElementById('loader').style.opacity = "0";
        setTimeout(() => document.getElementById('loader').remove(), 500);
    }, 1500);
});

// Suporte ao botão voltar do navegador
window.addEventListener('popstate', () => Router.render());