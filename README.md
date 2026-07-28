# JØXTV Social Overlay - OBS Browser Source

## 🎮 Configurazione OBS

### Browser Source Settings:
- **Larghezza:** 260
- **Altezza:** 100
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
    ├── logo yt       # Logo YouTube (immagine reale)
    ├── logo tiktok   # Logo TikTok (immagine reale)
    └── logo ig       # Logo Instagram (immagine reale)
```

## 🎨 Caratteristiche

- **Stile:** Neon viola/cyberpunk JØX - stile preciso streamer professionale
- **Colori:** #7B26B3 (primary), #A851DB (secondary)
- **Font:** Inter (Google Fonts) per tipografia premium
- **Effetti:**
  - Glass effect con blur 25px
  - Glow viola elegante
  - Fade smooth 1.2s cubic-bezier
- **Dimensioni:**
  - Box: 260px width, 18px border-radius
  - PFP: 42px, 10px border-radius
  - Spacing preciso (10px gap, 14px padding)
- **Animazioni:**
  - Fade in/out smooth tra social
  - Contatori animati (40 steps)
  - Pallino live rosso
- **Ciclo Automatico:** YouTube → TikTok → Twitch → Instagram → Loop
- **Timing:** 10 secondi visibile + 1.2s fade = 11.2s totale per social
- **API Ready:** Struttura pronta per integrazione API reali

## 🔧 Come Usare

1. Apri OBS Studio
2. Aggiungi Browser Source
3. Configura come sopra
4. Posiziona overlay nello stream
5. L'overlay cicla automaticamente tra i social

## � Note

- Le immagini devono essere nella cartella `assets/` con i nomi specificati
- Twitch usa la stessa immagine di TikTok
- Layout modificabile in style.css
- Valori demo in script.js da sostituire con dati reali
- Ciclo timing modificabile in `setInterval(showSocial, 11000)`
- Fade timing modificabile in `setTimeout` (attualmente 1200ms)
