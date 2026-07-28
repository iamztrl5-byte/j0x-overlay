// Version demo + pronta API:

let values = {

youtube: 26200,
twitch: 350,
tiktok: 1200

};



function animate(id,start,end){

let current=start;

let duration=800;

let step=(end-start)/(duration/20);


let timer=setInterval(()=>{

current+=step;


if(
(step>0 && current>=end) ||
(step<0 && current<=end)
){

current=end;
clearInterval(timer);

}


document.getElementById(id)
.innerHTML=Math.floor(current)
.toLocaleString();


},20);


}




function updateSocial(){


animate(
"youtubeCount",
0,
values.youtube
);


animate(
"twitchCount",
0,
values.twitch
);


animate(
"tiktokCount",
0,
values.tiktok
);


}


updateSocial();





// QUI POI INSERIAMO API REALI

setInterval(()=>{


console.log(
"aggiornamento social..."
);


// esempio:
// fetch youtube
// fetch twitch
// fetch tiktok


},30000);
