//setting global variables

let showConstellations = true;
let warpActive = false;
let warpStarted = false;
let storyStarted = false;

let warpStartTime = 0;
let warpSpeed = 0.2;
let tunnelMode = false;

//ELEMENTS 

const introScreen = document.getElementById("introScreen");
const skyScreen = document.getElementById("skyScreen");

const introMusic = document.getElementById("introMusic");
const warpMusic = document.getElementById("warpMusic");

const startText = document.getElementById("startText");
const storyText = document.getElementById("storyText");
const continueText = document.getElementById("continueText");

const warpText = document.getElementById("warpMessage");
const flash = document.getElementById("warpFlash");

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

/* -------------------------------- */
/* CANVAS */
/* -------------------------------- */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* -------------------------------- */
/* INTRO SCREEN */
/* -------------------------------- */

introScreen.addEventListener("click", () => {

introScreen.classList.remove("visible");
introScreen.classList.add("hidden");

setTimeout(()=>{

skyScreen.classList.remove("hidden");
skyScreen.classList.add("visible");

introMusic.currentTime = 0;
introMusic.volume = 1;
introMusic.play();

},1500);

});

/* -------------------------------- */
/* NORMAL STAR SKY */
/* -------------------------------- */

let stars = [];

for(let i=0;i<150;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
radius:Math.random()*1.5+0.5
});

}

/* -------------------------------- */
/* CONSTELLATIONS */
/* -------------------------------- */

const ariesRaw=[
{x:0,y:0},
{x:0.8,y:0.5},
{x:1.6,y:0.8},
{x:2.2,y:0.6}
];

function drawAries(){

const scale=62;
const offsetX=canvas.width*0.17;
const offsetY=canvas.height*0.80;

ctx.fillStyle="white";

ariesRaw.forEach(p=>{

let x=offsetX+p.x*scale;
let y=offsetY-p.y*scale;

ctx.beginPath();
ctx.arc(x,y,3,0,Math.PI*2);
ctx.fill();

});

}

const piscesRaw=[
{ x:1.97,y:.82},{ x:2.47,y:1.92},{ x:3.18,y:3.05},{ x:3.53,y:3.74},
{ x:4.13,y:4.6},{ x:3.76,y:5.3},{ x:4.15,y:5.64},{ x:2.9,y:1.27},
{ x:3.48,y:1.3},{ x:4.11,y:1.6},{ x:4.61,y:1.73},{ x:5.21,y:1.55},
{ x:7.2,y:1.73},{ x:8.1,y:1.52},{ x:8.67,y:1.68},{ x:9.16,y:1.5},
{ x:9.3,y:1.09},{ x:8.88,y:0.67},{ x:8.17,y:0.67}
];

function drawPisces(){

const scale=40;
const offsetX=canvas.width*0.55;
const offsetY=canvas.height*0.2;

ctx.fillStyle="white";

piscesRaw.forEach(p=>{

let x=offsetX+p.x*scale;
let y=offsetY+p.y*scale;

ctx.beginPath();
ctx.arc(x,y,2,0,Math.PI*2);
ctx.fill();

});

}

/* -------------------------------- */
/* STORY */
/* -------------------------------- */

const introNarration=`Greetings Lotus! 
\n


I heard through the cosmic grapevine that it was your 18th birthday. So as by tradition, it is your time to embark on a once in a lifetime adventure... around the universe! Have fun visiting these new and exciting planets, enjoy the views, and most importantly... enjoy the awesome local music! As a musical connoisseur and professor of intergalactic music at Alienville University, I will be your tour guide. So sit back, buckle up (as there may be some turbulence). And last of all, HAPPY BIRTHDAY!!!! You're an adult! Exciting adventures lie ahead :)
`;


function typeWriter(text, element, speed=19){

let i=0;
element.innerHTML="";
function type(){

if(i<text.length){

element.innerHTML+=text[i];
i++;

setTimeout(type,speed);

}else{

continueText.style.opacity=1;

}

}

type();

}

startText.addEventListener("click",()=>{

if(storyStarted) return;
storyStarted=true;

startText.style.opacity=0;

setTimeout(()=>{
typeWriter(introNarration,storyText);
},200);

});

/* -------------------------------- */
/* LYRIC SYSTEM */
/* -------------------------------- */

const lyrics=[

{time:0.5,text:"Ready..?"},
{time:3,text:"Hold tight!"},
{time:4,text:"Turbulence ahead!"},
{time:5.2,text:"Enjoy the views!"},
{time:8,text:"Oooo pretty rainbow galaxy"},
{time:13,text:"Getting closer.."},
{time:18,text:"Adventure begins soon.."},
{time:24.2,text:"We are immaterial"},


];

/* change the times above to match the song */

function updateLyrics(){

let t = warpMusic.currentTime;

lyrics.forEach(line=>{

if(t>line.time && t<line.time+2){

warpText.innerText=line.text;
warpText.style.opacity=1;

}

});

}

/* -------------------------------- */
/* WARP START */
/* -------------------------------- */

continueText.addEventListener("click",startWarpTravel);

function startWarpTravel(){

if(warpStarted) return;
warpStarted=true;

storyText.style.display="none";
continueText.style.display="none";

showConstellations=false;

introMusic.pause();

warpMusic.currentTime=0;
warpMusic.play();

warpActive=true;
warpStartTime=Date.now();

}

/* -------------------------------- */
/* STAR TUNNEL MODE */
/* -------------------------------- */

let tunnelStars=[];

for(let i=0;i<900;i++){

tunnelStars.push({

x:Math.random()*2-1,
y:Math.random()*2-1,
z:Math.random()*canvas.width

});

}

/* -------------------------------- */
/* ANIMATION */
/* -------------------------------- */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

if(!warpActive){

/* NORMAL SKY */

stars.forEach(star=>{

ctx.beginPath();
ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

});

if(showConstellations){

drawPisces();
drawAries();

}

}else{

let elapsed=(Date.now()-warpStartTime)/1000;

/* first phase: accelerate original stars */

if(elapsed<5){

warpSpeed+=0.08;

stars.forEach(star=>{

ctx.beginPath();
ctx.moveTo(star.x,star.y);
ctx.lineTo(star.x,star.y+warpSpeed*15);

let hue=(Date.now()*0.2+star.y)%360;

ctx.strokeStyle=`hsl(${hue},100%,70%)`;
ctx.lineWidth=star.radius;

ctx.stroke();

star.y-=warpSpeed;

if(star.y<0){
star.y=canvas.height;
star.x=Math.random()*canvas.width;
}

});

}

/* second phase: hyperspace tunnel */

else{

tunnelMode=true;

tunnelStars.forEach(star=>{

star.z-=40;

if(star.z<=0){

star.z=canvas.width;
star.x=Math.random()*2-1;
star.y=Math.random()*2-1;

}

let k=128/star.z;

let px=star.x*k*canvas.width/2+canvas.width/2;
let py=star.y*k*canvas.height/2+canvas.height/2;

let hue=(Date.now()*0.15+star.z)%360;

ctx.beginPath();
ctx.moveTo(px,py);
ctx.lineTo(px+star.x*20,py+star.y*20);

ctx.strokeStyle=`hsl(${hue},100%,70%)`;
ctx.lineWidth=2;

ctx.shadowBlur=12;
ctx.shadowColor=`hsl(${hue},100%,70%)`;

ctx.stroke();

ctx.shadowBlur=0;

});

}

/* update lyrics */

updateLyrics();

/* flash after ~25s */

if(elapsed>25){

triggerFlash();

}

}

requestAnimationFrame(animate);

}

animate();

/* -------------------------------- */
/* FLASH */
/* -------------------------------- */

function triggerFlash(){

warpActive=false;

let brightness=0;

let interval=setInterval(()=>{

brightness+=0.08;

flash.style.opacity=brightness;

if(brightness>=1){

clearInterval(interval);

/* SAVE SONG POSITION */
localStorage.setItem("songIndex",1);
localStorage.setItem("songTime",warpMusic.currentTime);

/* GO TO PLANET */
window.location.href="planet1.html";

}

},40);

}