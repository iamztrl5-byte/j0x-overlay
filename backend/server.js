const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());


const CLIENT_ID = "g4l0jxd9jnx3f9us44lcs5vonw38ve";
const CLIENT_SECRET = "o5m5tgpxqaunr1hd9en0390gub9jom";


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
