const socials = [

{
  name: "J0X TV",
  count: 26200,
  pfp: "assets/youtube.svg"
},

{
  name: "j0x_tv",
  count: 1200,
  pfp: "assets/tiktok.svg"
},

{
  name: "il_j0x",
  count: 350,
  pfp: "assets/twitch.svg"
}

];


let index = 0;

function showSocial() {

  const card = document.getElementById("card");

  card.classList.remove("show");

  setTimeout(()=>{

    let s = socials[index];

    document.getElementById("pfp").src = s.pfp;
    document.getElementById("name").innerText = s.name;

    animateNumber(s.count);

    card.classList.add("show");

    clickFollow();

    index = (index + 1) % socials.length;

  },800);

}


function animateNumber(end){

  let current = 0;

  let step = end / 30;

  let timer = setInterval(()=>{

    current += step;

    if(current >= end){
      current = end;
      clearInterval(timer);
    }

    document.getElementById("count").innerText =
      Math.floor(current).toLocaleString();

  },30);

}


function clickFollow(){

  let btn = document.getElementById("followBtn");

  btn.classList.remove("clicked");

  setTimeout(()=>{
    btn.classList.add("clicked");
    btn.innerText = "Seguito";
  },1500);

  setTimeout(()=>{
    btn.innerText = "Segui";
  },3000);

}


setInterval(showSocial, 5000);

showSocial();
