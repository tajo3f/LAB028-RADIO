# 🎧 LAB028 RADIO | Next-Gen Audio Experience

![Versão](https://img.shields.io/badge/version-2.1.0-7B2EFF?style=for-the-badge)
![Status](https://img.shields.io/badge/status-live-00F0FF?style=for-the-badge)
![Tech](https://img.shields.io/badge/Pure-JavaScript-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **LAB028 RADIO** é uma aplicação Single Page Application (SPA) ultra-moderna, desenvolvida para alta performance e imersão sonora. Focada na cultura underground e urbana, a plataforma combina engenharia de áudio avançada com design futurista.

---

## ⚡ Over-Engineering Highlights

A aplicação não é apenas um player; é um ecossistema frontend construído sob os pilares da **Engenharia de Software de 2026**:

*   **Visualização de Áudio em Tempo Real:** Processamento via `Web Audio API` (Fast Fourier Transform - FFT) para renderização de partículas dinâmicas no Canvas.
*   **Zero-Framework Architecture:** Construído 100% com Vanilla JavaScript, utilizando o padrão **ES6 Modules** para evitar poluição de escopo global.
*   **State Management (Observer Pattern):** Gerenciamento de estado reativo para controle sincronizado entre navegação, UI e fluxo de áudio.
*   **Glassmorphism & Motion Design:** Interface baseada em camadas de desfoque gaussiano aceleradas por hardware (GPU).
*   **SPA Engine Customizada:** Sistema de roteamento interno que utiliza a `History API` para transições de página sem recarregamento (Zero-Flicker).

---

## 🎨 Design System

| Elemento | Especificação | Hex |
| :--- | :--- | :--- |
| **Primary Glow** | Purple Neon | `#7B2EFF` |
| **Secondary Accent** | Cyber Blue | `#00F0FF` |
| **Background** | Deep Black | `#030303` |
| **Typography** | Outfit / Syncopate | Sans-Serif |

---

## 🏗️ Arquitetura do Projeto

```text
LAB028-RADIO/
├── assets/
│   ├── css/
│   │   └── style.css       # Design System & Micro-interações
│   └── imgs/               # Assets estáticos e logos
├── src/
│   ├── modules/
│   │   ├── audioEngine.js  # Processamento Web Audio API
│   │   ├── visualizer.js   # Lógica de renderização do Canvas
│   │   └── router.js       # SPA Logic & History API
│   ├── state/
│   │   └── globalState.js  # Gerenciador de Estado reativo
│   └── app.js              # Entry point & Orquestrador
├── index.html              # Shell da aplicação
└── manifest.json           # PWA Configuration
