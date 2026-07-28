const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());


const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;


let twitchToken = "";


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

}



async function getTwitchUser(){

    const response = await fetch(
        "https://api.twitch.tv/helix/users?login=lil_j0x",
        {
            headers:{
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${twitchToken}`
            }
        }
    );


    const data = await response.json();

    return data.data[0];

}



app.get("/twitch", async(req,res)=>{


    if(!twitchToken){

        await getToken();

    }


    const user = await getTwitchUser();


    res.json(user);


});



app.listen(3000,()=>{

    console.log("JØX Twitch API online");

});
