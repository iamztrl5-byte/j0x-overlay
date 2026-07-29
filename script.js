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
// DISCORD
// ===============================

const DISCORD_ID =
"1522076787532632234";




// ===============================
// SOCIALS
// ===============================

const socials = [

    {
        platform: "YOUTUBE",
        username: "JØX TV",
        count: 0,
        label: "FOLLOWERS",
        icon: "logo ig.jpeg",
        active: true
    },


    {
        platform: "TIKTOK",
        username: "j0x_tv",
        count: 1200,
        label: "FOLLOWERS",
        icon: "logo ig.jpeg",
        active: false
    },


    {
        platform: "TWITCH",
        username: "il_j0x",
        count: 0,
        label: "FOLLOWERS",
        icon: "logo ig.jpeg",
        active: true
    },


    {
        platform: "DISCORD",
        username: "JØX Community",
        count: 0,
        label: "MEMBRI ONLINE",
        icon: "logo ig.jpeg",
        active: true
    },


    {
        platform: "INSTAGRAM",
        username: "lil_j0x",
        count: 45000,
        label: "FOLLOWERS",
        icon: "logo ig.jpeg",
        active: false
    }

];




// SOCIAL ATTIVI

const enabledSocials = socials.filter(
    social => social.active
);





// ===============================
// YOUTUBE DATI REALI
// ===============================

async function updateYouTubeData(){

    try{

        const url =
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`;


        const res =
        await fetch(url);


        const data =
        await res.json();



        if(!data.items)
            return;



        const channel =
        data.items[0];



        const youtube =
        socials.find(
            s => s.platform === "YOUTUBE"
        );



        if(youtube){

            youtube.count =
            Number(
                channel.statistics.subscriberCount
            );


            youtube.username =
            "JØX TV";


            youtube.icon =
            channel.snippet.thumbnails.high.url;

        }



    }
    catch(error){

        console.log(
            "Errore YouTube:",
            error
        );

    }

}







// ===============================
// TWITCH DATI REALI
// ===============================

async function updateTwitchData(){

    try{

        const res =
        await fetch(TWITCH_API);



        const data =
        await res.json();



        const twitch =
        socials.find(
            s => s.platform === "TWITCH"
        );



        if(twitch){

            twitch.username =
            data.display_name ||
            twitch.username;



            twitch.icon =
            data.profile_image_url ||
            twitch.icon;



            twitch.count =
            data.followers !== undefined
            ?
            data.followers
            :
            twitch.count;

        }


    }
    catch(error){

        console.log(
            "Errore Twitch:",
            error
        );

    }

}








// ===============================
// DISCORD DATI REALI
// ===============================

async function updateDiscordData(){

    try{


        const res =
        await fetch(
        `https://discord.com/api/guilds/${DISCORD_ID}/widget.json`
        );



        const data =
        await res.json();



        const discord =
        socials.find(
            s => s.platform === "DISCORD"
        );



        if(discord){


            discord.username =
            "JØX Community";


            discord.count =
            data.presence_count || 0;



            discord.label =
            "MEMBRI ONLINE";



            discord.icon =
            "logo ig.jpeg";


        }


    }
    catch(error){

        console.log(
            "Errore Discord:",
            error
        );

    }

}








// ===============================
// ENTRA ORA EFFECT
// ===============================

function subscribeAnimation(){


    const button =
    document.getElementById("subscribeBtn");



    if(!button)
        return;



    button.classList.remove("active");


    button.innerText =
    "ENTRA ORA";



    setTimeout(()=>{


        button.classList.add("active");


        button.innerText =
        "✓ ENTRATO";



        setTimeout(()=>{


            button.classList.remove("active");


            button.innerText =
            "ENTRA ORA";


        },4000);



    },3000);


}









// ===============================
// ROTAZIONE CARD
// ===============================

let index = 0;

let animation;



function showSocial(){


    const card =
    document.getElementById("card");



    if(!card)
        return;



    card.style.opacity =
    "0";


    card.style.transform =
    "translateY(20px)";



    setTimeout(()=>{


        const social =
        enabledSocials[index];



        if(!social)
            return;



        card.className =
        "card " +
        social.platform.toLowerCase();




        const platform =
        document.getElementById(
            "platformName"
        );


        const avatar =
        document.getElementById(
            "avatar"
        );


        const username =
        document.getElementById(
            "username"
        );


        const label =
        document.getElementById(
            "label"
        );



        if(platform)
            platform.innerText =
            social.platform;



        if(avatar)
            avatar.src =
            social.icon;



        if(username)
            username.innerText =
            social.username;



        if(label)
            label.innerText =
            social.label;



        animateNumber(
            social.count
        );



        subscribeAnimation();




        card.style.opacity =
        "1";


        card.style.transform =
        "translateY(0)";



        index++;



        if(index >= enabledSocials.length){

            index = 0;

        }



    },1200);


}









// ===============================
// ANIMAZIONE NUMERI
// ===============================

function animateNumber(target){


    const count =
    document.getElementById(
        "count"
    );


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

document.addEventListener(
"DOMContentLoaded",
()=>{


    const card =
    document.getElementById("card");



    if(card){

        card.style.opacity =
        "1";


        card.style.transform =
        "translateY(0)";

    }




    updateYouTubeData();

    updateTwitchData();

    updateDiscordData();



    showSocial();




    setInterval(()=>{


        updateYouTubeData();

        updateTwitchData();

        updateDiscordData();



    },60000);





    setInterval(
        showSocial,
        10000
    );


});
