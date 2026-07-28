const socials = [

{
  title: "YOUTUBE",
  name: "J0X TV",
  count: 26200,
  pfp: "assets/logo yt"
},

{
  title: "TIKTOK",
  name: "j0x_tv",
  count: 1200,
  pfp: "assets/logo tiktok"
},

{
  title: "TWITCH",
  name: "il_j0x",
  count: 350,
  pfp: "assets/logo tiktok"
},

{
  title: "INSTAGRAM",
  name: "lil_j0x",
  count: 45000,
  pfp: "assets/logo ig"
}

];


let index = 0;

function showSocial() {

  const card = document.getElementById("card");

  card.classList.remove("show");

  setTimeout(()=>{

    let s = socials[index];

    document.getElementById("title").innerText = s.title;
    document.getElementById("pfp").src = s.pfp;
    document.getElementById("name").innerText = s.name;

    animateNumber(s.count);

    card.classList.add("show");

    index = (index + 1) % socials.length;

  },1200);

}


function animateNumber(end){

  let current = 0;

  let step = end / 40;

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


setInterval(showSocial, 11000);

showSocial();
