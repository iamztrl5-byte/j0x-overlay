// ===============================
// YOUTUBE API
// ===============================

const API_KEY = "AIzaSyBIypEAhqedfbXG-igRAkWQttp3xVblvN0";
const CHANNEL_ID = "UC0DGVBMy27moUROQ8gWoKMg";


// ===============================
// TWITCH BACKEND
// ===============================

const TWITCH_API =
"https://j0x-twitch-api.onrender.com/twitch";


// ===============================
// SOCIALS
// ===============================

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



// ===============================
// YOUTUBE DATI REALI
// ===============================

async function updateYouTubeData(){

    try{

        const url =
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`;


        const res = await fetch(url);

        const data = await res.json();


        if(!data.items) return;


        const channel = data.items[0];


        socials[0].count =
        Number(channel.statistics.subscriberCount);


        socials[0].username =
        channel.snippet.title;


        socials[0].icon =
        channel.snippet.thumbnails.default.url;


    }
    catch(error){

        console.log("Errore YouTube:", error);

    }

}




// ===============================
// TWITCH DATI REALI
// ===============================

async function updateTwitchData(){

    try{

        const res = await fetch(TWITCH_API);

        const data = await res.json();


        socials[2].username =
        data.display_name;


        socials[2].icon =
        data.profile_image_url;


    }
    catch(error){

        console.log("Errore Twitch:", error);

    }

}




// ===============================
// ROTAZIONE CARD
// ===============================


let index = 0;
let animation;



function showSocial(){

    const card =
    document.getElementById("card");


    if(!card) return;



    card.style.opacity = "0";

    card.style.transform =
    "translateY(20px)";



    setTimeout(()=>{


        const social =
        socials[index];



        const platform =
        document.getElementById("platformName");


        const icon =
        document.getElementById("socialIcon");


        const username =
        document.getElementById("username");



        if(platform)
            platform.innerText =
            social.platform;



        if(icon)
            icon.src =
            social.icon;



        if(username)
            username.innerText =
            social.username;



        animateNumber(
            social.count
        );



        card.style.opacity = "1";

        card.style.transform =
        "translateY(0)";



        index++;


        if(index >= socials.length){

            index = 0;

        }



    },1200);

}




// ===============================
// ANIMAZIONE NUMERI
// ===============================


function animateNumber(target){


    const count =
    document.getElementById("count");



    if(!count)
        return;



    if(animation)
        clearInterval(animation);



    let current = 0;


    const speed =
    target / 50;



    animation =
    setInterval(()=>{


        current += speed;



        if(current >= target){

            current = target;

            clearInterval(animation);

        }



        count.innerText =
        Math.floor(current)
        .toLocaleString("it-IT");



    },25);

}





// ===============================
// START
// ===============================


document.addEventListener("DOMContentLoaded",()=>{


    const card =
    document.getElementById("card");



    if(card){

        card.style.opacity = "1";

        card.style.transform =
        "translateY(0)";

    }



    // aggiorna dati prima di partire

    updateYouTubeData();

    updateTwitchData();



    showSocial();



    setInterval(()=>{


        updateYouTubeData();

        updateTwitchData();


    },60000);



    setInterval(showSocial,10000);



});
