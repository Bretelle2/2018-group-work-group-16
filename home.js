var w;
let amplitude = 3;
var ease;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  w1 = new Wave(width/2, height/2, 1, 200, width);
  background(0,0,0,10);
  // w1.barwid = map(mouseX, 0, width, 5, 1);
  // w1.maxhei = map(mouseY, 0, height, height, 1);
  w1.display();
  // FUNZIONA SE SI PREME +
  if (keyIsDown(107) || keyIsDown(187)) {
    ease = map(sin(frameCount/20), -1, 1, 3, 4.5);
    amplitude = 3+ease;
  } else {
    amplitude = 1.5;
  }
}


//Wave Object
function Wave(x, y, barwid, maxhei, amount)
{
  //Initial Variables
  //Coords
  this.x = x;
  this.y = y;
  //Bar Properties
  this.maxhei = maxhei;
  this.amount = amount;
  this.barwid = barwid;
  //noStroke();
  rectMode(CENTER);
  //Display
  this.display = function()
  {
	for(this.i=0; this.i<this.amount; this.i++)
    {
      //Time in milliseconds/600 for smoothe transitions
      this.time = millis()/600;
      //Cycling colors depending on time
      this.r = map(sin(this.time+amplitude), -1, 1, 110, 210);
      this.g = map(sin(this.time+amplitude), -1, 1, 0, 18);
      this.b = map(sin(this.time+amplitude), -1, 1, 0, 18);
      fill(this.r, this.g, this.b);
      //Height depending on time and i
  	  this.hei = map(sin(this.i/90 + this.time), -1, 1, 0, this.maxhei)*amplitude;
      //Actual Draw
      noStroke();
   	  rect(this.x + this.i*this.barwid-this.amount*this.barwid/2, this.y, this.barwid+2, this.hei/6);

    }
  }

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
