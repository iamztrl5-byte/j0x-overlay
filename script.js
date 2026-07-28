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


let index = 0;
let animation;


function showSocial(){

    const card = document.getElementById("card");

    if(!card) return;


    // uscita animazione

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



        // entrata animazione

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




document.addEventListener("DOMContentLoaded", ()=>{


    const card = document.getElementById("card");


    if(card){

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }



    showSocial();



    setInterval(showSocial,10000);



});
