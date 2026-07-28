# JØXTV Social Overlay - OBS Browser Source

## 🎮 Configurazione OBS

### Browser Source Settings:
- **Larghezza:** 600
- **Altezza:** 120
- **URL:** Percorso locale del file index.html
- ☑ **Background trasparente**
- ☑ **Shutdown source when not visible:** OFF

## 📁 Struttura File

```
J0X_OVERLAY/
├── index.html       # Struttura HTML overlay
├── style.css        # Stili neon/cyberpunk
├── script.js        # Logica animazioni + API ready
└── assets/
    ├── youtube.png   # Icona YouTube (SVG)
    ├── twitch.png    # Icona Twitch (SVG)
    └── tiktok.png    # Icona TikTok (SVG)
```

## 🎨 Caratteristiche

- **Stile:** Neon viola/cyberpunk JØX
- **Colori:** #7B26B3 (primary), #A851DB (secondary)
- **Effetti:** Glow, blur, gradienti
- **Animazioni:** Contatori animati all'avvio
- **API Ready:** Struttura pronta per integrazione API reali

## 🔧 Come Usare

1. Apri OBS Studio
2. Aggiungi Browser Source
3. Configura come sopra
4. Posiziona overlay nello stream
5. I contatori si animano all'avvio

## 🚀 Upgrade Futuri

### Versione 2
- Animazione entrata tipo HUD GTA
- Particelle viola
- Logo JØX al centro
- Barra "LIVE NOW"
- Follower goal

### Versione 3
- Alert system:
  - "NUOVO FOLLOW"
  - "NUOVO SUB"
  - "NUOVO FOLLOWER TIKTOK"
  - "TOP SUPPORTER"

### Versione 4
- Pannello completo con:
  - 🔴 LIVE indicator
  - Logo JØXTV
  - Contatori multi-platform
  - Road to goal

## 🔌 Integrazione API

Il file `script.js` è pronto per integrazione API reali. Sostituire i valori demo con fetch calls a:
- YouTube Data API
- Twitch Helix API
- TikTok API

## 📝 Note

- Le icone attuali sono placeholder SVG
- Per grafica definitiva: preparare logo JØXTV e icone custom
- Layout modificabile in style.css
- Valori demo in script.js da sostituire con dati reali
