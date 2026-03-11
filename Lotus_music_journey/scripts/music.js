const music = document.getElementById("music");

const playlist = [
"roses.webm",
"immaterial.webm",
"monaLisa.webm",
"runAwayWithMe.webm",
"spiritInTheSky.webm",
"magician.webm",
"3.1459.webm",
"dancedance.webm"
];

let index = parseInt(localStorage.getItem("songIndex"));
if (isNaN(index)) index = 0;

let time = parseFloat(localStorage.getItem("songTime"));
if (isNaN(time)) time = 0;

/* load song */
music.src = playlist[index];
music.currentTime = time;
music.preload = "auto";

music.play().catch(()=>{});

/* constantly save time */
setInterval(()=>{
localStorage.setItem("songTime", music.currentTime);
localStorage.setItem("songIndex", index);
},1000);

/* go to next song */
function nextSong(){

index++;

if(index >= playlist.length){
index = 0;
}

localStorage.setItem("songIndex", index);
localStorage.setItem("songTime", 0);

music.src = playlist[index];
music.play();

}

/* detect ending */
music.addEventListener("timeupdate",()=>{

if(music.duration && music.currentTime >= music.duration - 0.3){
nextSong();
}

});