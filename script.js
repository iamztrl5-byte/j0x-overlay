// 🔑 CONFIG (METTI QUI LA TUA CHIAVE E POI TI DO IO IL CHANNEL ID)
const API_KEY = "INCOLLA_LA_TUA_CHIAVE";
const CHANNEL_ID = "UC0DGVBMy27moUROQ8gWoKMg";


// 📊 SOCIALS (NON TOCCATO)
const socials = [

    {
        platform: "YOUTUBE",
        username: "JØX TV",
        count: 26200,
        icon: "assets/youtube.svg"
    },

    {
        platform: "TIKTOK",
        username: "j0x_tv",
        count: 1200,
        icon: "assets/tiktok.svg"
    },

    {
        platform: "TWITCH",
        username: "il_j0x",
        count: 350,
        icon: "assets/twitch.svg"
    },

    {
        platform: "INSTAGRAM",
        username: "lil_j0x",
        count: 45000,
        icon: "assets/instagram.svg"
    }

];


// 🔴 NUOVA FUNZIONE YOUTUBE (AGGIUNTA)
async function updateYouTubeData() {

    try {

        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.items || data.items.length === 0) return;

        const channel = data.items[0];

        const subs = parseInt(channel.statistics.subscriberCount);
        const name = channel.snippet.title;
        const pfp = channel.snippet.thumbnails.default.url;

        // aggiorna SOLO YouTube
        socials[0].count = subs;
        socials[0].username = name;
        socials[0].icon = pfp;

    } catch (e) {

        console.log("Errore YouTube:", e);

    }

}


// 🔁 CODICE TUO (NON TOCCATO)
let index = 0;
let animation;


function showSocial(){

    const card = document.getElementById("card");

    if(!card) return;


    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";


    setTimeout(()=>{


        const social = socials[index];


        const platform = document.getElementById("platformName");
        const icon = document.getElementById("socialIcon");
        const username = document.getElementById("username");


        if(platform)
            platform.innerText = social.platform;


        if(icon)
            icon.src = social.icon;


        if(username)
            username.innerText = social.username;


        animateNumber(social.count);


        card.style.opacity = "1";
        card.style.transform = "translateY(0)";


        index++;

        if(index >= socials.length){
            index = 0;
        }

    },1200);

}


function animateNumber(target){

    const count = document.getElementById("count");

    if(!count)
        return;

    if(animation)
        clearInterval(animation);

    let current = 0;

    const speed = target / 50;

    animation = setInterval(()=>{

        current += speed;

        if(current >= target){

            current = target;
            clearInterval(animation);

        }

        count.innerText =
        Math.floor(current).toLocaleString("it-IT");

    },25);

}


// 🚀 AVVIO (MODIFICATO LEGGERMENTE)
document.addEventListener("DOMContentLoaded", ()=>{

    const card = document.getElementById("card");

    if(card){
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }

    // prima prende YouTube, poi mostra
    updateYouTubeData().then(() => {
        showSocial();
    });

    // loop ogni 10s
    setInterval(() => {
        updateYouTubeData();
        showSocial();
    },10000);

});
