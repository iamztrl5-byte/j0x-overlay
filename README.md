# JØXTV Social Overlay - OBS Browser Source

## 🎮 Configurazione OBS

### Browser Source Settings:
- **Larghezza:** 400
- **Altezza:** 120
- **URL:** Percorso locale del file index.html
- ☑ **Background trasparente**
- ☑ **Shutdown source when not visible:** OFF

## 📁 Struttura File

```
overlay/
├── index.html       # Struttura HTML overlay dinamico
├── style.css        # Stili neon/cyberpunk + animazioni
├── script.js        # Logica ciclo automatico + animazioni
└── assets/
    ├── youtube.svg   # Icona YouTube (SVG)
    ├── twitch.svg    # Icona Twitch (SVG)
    └── tiktok.svg    # Icona TikTok (SVG)
```

## 🎨 Caratteristiche

- **Stile:** Neon viola/cyberpunk JØX
- **Colori:** #7B26B3 (primary), #A851DB (secondary)
- **Effetti:** Glow, blur, smoke, float animation
- **Animazioni:**
  - Fade in/out smooth tra social
  - PFP fluttuante (float animation)
  - Contatori animati
  - Bottone "Segui" con click fake
  - Smoke effect di sottofondo
- **Ciclo Automatico:** YouTube → TikTok → Twitch → Loop (5 secondi per social)
- **API Ready:** Struttura pronta per integrazione API reali

## 🔧 Come Usare

1. Apri OBS Studio
2. Aggiungi Browser Source
3. Configura come sopra
4. Posiziona overlay nello stream
5. L'overlay cicla automaticamente tra i social

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
- Ciclo timing modificabile in `setInterval(showSocial, 5000)`
