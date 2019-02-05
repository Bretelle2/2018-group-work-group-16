
let a = 0;
let w = 300;
let h = 300;
function preload(){
  costole = loadImage('assets/costole.png');
}
function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
}
function draw() {
background(0);
imageMode(CENTER);
image(costole, windowWidth/2, windowHeight/2, w, h);
imageRatio = costole.height/costole.width;

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function keyPressed() {
if(keyIsDown(82) && keyIsDown(71) && keyIsDown(67)&& keyIsDown(73)&& keyIsDown(72) && keyIsDown(71) && a == 0) {
setInterval(scompari, 500)
a = 1;
}
}
function scompari() {
  if (a == 1) {
  a = 2;
  tint(255, 200);
  setInterval(scompari2, 500);
}
}

function scompari2() {
if (a == 2) {
a = 3;
tint(255, 100);
setInterval(scompari3, 500)
}
}

function scompari3() {
if (a == 3) {
a = 4;
tint(255, 50);
setInterval(scompari4, 500)
}
}

function scompari4() {
if (a == 4) {
tint(255, 0);
setInterval(appari, 250)
}
}

function appari() {
  window.location.reload();
  window.open("tutorial.html", "_self")
}
