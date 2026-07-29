const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());


// ===============================
// DATI TWITCH DA RENDER ENV
// ===============================

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;


const REDIRECT_URI =
"https://j0x-twitch-api.onrender.com/auth/twitch/callback";


// Token applicazione
let twitchToken = "";


// Token utente Twitch
let userToken = process.env.TWITCH_USER_TOKEN || "";


console.log(
    "USER TOKEN CARICATO:",
    userToken ? "SI" : "NO"
);



// ===============================
// CREA TOKEN APP TWITCH
// ===============================

async function getToken(){

    const response = await fetch(
        "https://id.twitch.tv/oauth2/token",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:
            `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        }
    );


    const data = await response.json();


    twitchToken = data.access_token;


    console.log("Token app Twitch ottenuto");

}



// ===============================
// LOGIN TWITCH OAUTH
// ===============================

app.get("/auth/twitch",(req,res)=>{


    const authURL =
    "https://id.twitch.tv/oauth2/authorize" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + REDIRECT_URI +
    "&response_type=code" +
    "&scope=moderator:read:followers";


    res.redirect(authURL);


});




// ===============================
// CALLBACK TWITCH
// ===============================

app.get("/auth/twitch/callback", async(req,res)=>{


    try{


        const code = req.query.code;


        console.log(
            "CODE RICEVUTO:",
            code ? "SI" : "NO"
        );



        const response = await fetch(
            "https://id.twitch.tv/oauth2/token",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:
                `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`
            }
        );


        const data = await response.json();



        console.log(
            "RISPOSTA TOKEN TWITCH:",
            {
                access_token: data.access_token ? "PRESENTE" : "MANCANTE",
                refresh_token: data.refresh_token ? "PRESENTE" : "MANCANTE",
                scope: data.scope || [],
                error: data.message || null
            }
        );



        userToken = data.access_token || "";



        console.log(
            "Token utente Twitch ottenuto"
        );


        console.log(
            "USER TOKEN RICEVUTO:",
            userToken ? "SI" : "NO"
        );


        res.send(
            "Twitch autorizzato correttamente. Puoi tornare all'overlay."
        );


    }
    catch(error){


        console.log(
            "ERRORE CALLBACK TWITCH:",
            error
        );


        res.status(500).send(
            "Errore autorizzazione Twitch"
        );


    }


});




// ===============================
// PRENDE DATI TWITCH
// ===============================

async function getTwitchUser(){


    if(!twitchToken){

        await getToken();

    }



    const userResponse = await fetch(
        "https://api.twitch.tv/helix/users?login=lil_j0x",
        {
            headers:{
                "Client-ID":CLIENT_ID,
                "Authorization":`Bearer ${twitchToken}`
            }
        }
    );


    const userData = await userResponse.json();


    const user = userData.data[0];


    let followers = 0;



    // ===============================
    // FOLLOWER REALI
    // ===============================

    if(userToken){


        const followersResponse = await fetch(
            `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`,
            {
                headers:{
                    "Client-ID":CLIENT_ID,
                    "Authorization":`Bearer ${userToken}`
                }
            }
        );


        const followersData =
        await followersResponse.json();



        console.log(
            "FOLLOWERS TWITCH:",
            followersData
        );


        followers =
        followersData.total || 0;


    }
    else{


        console.log(
            "Nessun token utente Twitch presente"
        );


    }



    return {

        display_name:user.display_name,

        profile_image_url:user.profile_image_url,

        followers:followers

    };


}




// ===============================
// API OVERLAY
// ===============================

app.get("/twitch", async(req,res)=>{


    try{


        const user =
        await getTwitchUser();


        res.json(user);


    }
    catch(error){


        console.log(
            "ERRORE TWITCH:",
            error
        );


        res.status(500).json({

            error:"Twitch API error"

        });


    }


});




// ===============================
// AVVIO SERVER RENDER
// ===============================

const PORT =
process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        "JØX Twitch API online sulla porta " + PORT
    );

});
