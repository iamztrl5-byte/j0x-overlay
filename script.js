const socials = [

{
  title: "YOUTUBE",
  name: "J0X TV",
  count: 26200,
  pfp: "assets/youtube.svg"
},

{
  title: "TIKTOK",
  name: "j0x_tv",
  count: 1200,
  pfp: "assets/tiktok.svg"
},

{
  title: "TWITCH",
  name: "il_j0x",
  count: 350,
  pfp: "assets/twitch.svg"
},

{
  title: "INSTAGRAM",
  name: "lil_j0x",
  count: 45000,
  pfp: "assets/tiktok.svg"
}

];


let index = 0;

function showSocial() {

  const card = document.getElementById("card");
  if (!card) return;

  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  setTimeout(()=>{

    let s = socials[index];

    const titleEl = document.getElementById("title");
    const pfpEl = document.getElementById("pfp");
    const nameEl = document.getElementById("name");

    if (titleEl) titleEl.innerText = s.title;
    if (pfpEl) pfpEl.src = s.pfp;
    if (nameEl) nameEl.innerText = s.name;

    animateNumber(s.count);

    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

    index = (index + 1) % socials.length;

  },1200);

}


function animateNumber(end){

  const countEl = document.getElementById("count");
  if (!countEl) return;

  let current = 0;
  let step = end / 40;

  let timer = setInterval(()=>{

    current += step;

    if(current >= end){
      current = end;
      clearInterval(timer);
    }

    countEl.innerText = Math.floor(current).toLocaleString();

  },30);

}


document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  if (card) {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }
  
  setTimeout(() => {
    showSocial();
  }, 10000);
});

setInterval(showSocial, 11000);
