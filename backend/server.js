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


let twitchToken = "";


// ===============================
// CREA TOKEN TWITCH
// ===============================

async function getToken(){

    const response = await fetch(
        "https://id.twitch.tv/oauth2/token",
        {
            method: "POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:
            `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        }
    );


    const data = await response.json();


    twitchToken = data.access_token;


    console.log("Token Twitch ottenuto");

}



// ===============================
// PRENDE DATI TWITCH
// ===============================

async function getTwitchUser(){


    // PROFILO

    const userResponse = await fetch(
        "https://api.twitch.tv/helix/users?login=lil_j0x",
        {
            headers:{
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${twitchToken}`
            }
        }
    );


    const userData = await userResponse.json();


    const user = userData.data[0];



    // FOLLOWER

    const followersResponse = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${user.id}`,
        {
            headers:{
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${twitchToken}`
            }
        }
    );


    const followersData = await followersResponse.json();



    console.log("FOLLOWERS TWITCH:", followersData);



    return {

        display_name: user.display_name,

        profile_image_url: user.profile_image_url,

        followers: followersData.total || 0

    };


}



// ===============================
// ENDPOINT OVERLAY
// ===============================

app.get("/twitch", async(req,res)=>{


    try{


        if(!twitchToken){

            await getToken();

        }



        const user = await getTwitchUser();



        res.json(user);



    }
    catch(error){


        console.log("ERRORE TWITCH:", error);


        res.status(500).json({

            error:"Twitch API error"

        });


    }


});




// ===============================
// AVVIO SERVER RENDER
// ===============================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        "JØX Twitch API online sulla porta " + PORT
    );

});
