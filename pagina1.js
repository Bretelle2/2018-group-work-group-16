let value = 0;
var timer;
//timer iniziale
var start = -1;
/*somma di tutti le volte che sbagli a premere anche di pochi millisecondi
e se la superi hai perso DA AGGIUNGERE NEL SECONDO IF */
var sommaTot = 0;
var step1 = 0;
var check = 0;
var passo = 0;
var life = 2;
var heart;
var song;
var w1 = 300;
var h1 = 300;
var w2 = 300;
var h2 = 300;
var caso = 1;
var mic;
let timer2;
var passoSoffio = 0;
var message = '';
var message2 = '';
var z1;
let amplitude = 3;
var ease;
var w = 0;
var h = 0;
var a = 0;
var alfa = 40;
function preload() {
  // put preload code here
  heart = loadImage('assets/heart.png');
  song = loadSound('assets/song.mp3');

}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  bold = loadFont("font/GTAmericaMono-Bold.otf");
}

function draw() {
  // put drawing code here
  z1 = new Wave(width / 2, height / 2, 1, 70, width);
  background(0,0,0,alfa);

  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  textSize(30);
  textFont(bold);
  //TUTTI I TESTI SONO GESTITI QUA
  text(message, width / 2, height / 2+200);
  text(message2, width / 2, height / 2+260);
  imageMode(CENTER);
  z1.display();

  // push();
  // fill(255);
  // ellipse(width / 6, height / 2, w, h);
  // pop();
  if (frameCount % 35 == 0 && song.isPlaying()) {
    blinking();
  } else {
    w = 0;
    h = 0;
  }

if (keyIsDown(83) && keyIsDown(68) && keyIsDown(74) && keyIsDown(75) && (passo == 0 || passo == 2 || passo == 4)) {
    ease = map(sin(frameCount / 20), -1, 1, 3, 4.5);
    amplitude = 3 + ease;
  } else {
    amplitude = 1.5;
  }
  if (passo == 1 || passo == 3) {
    if (song.isPlaying()) {
      song.pause();

    }

//disegno barra

    var vol = mic.getLevel() * 10;
    var threshold_min = 0.3;
    message = 'Hold N and blow to';
    amplitude = 0;
    alfa = 255;
    if (vol > threshold_min) {
      fill(255, 255, 255, 60);
      rect(windowWidth/2-160, windowHeight/5*2, vol * 30, 50);
    }


    stroke(255);
    line(windowWidth/2-160, windowHeight/5*2, windowWidth/2-160, windowHeight/5*2+50);
    line(windowWidth/2+130, windowHeight/5*2, windowWidth/2+130, windowHeight/5*2+50);
    if (keyIsDown(78) && (passoSoffio == 0 || passoSoffio == 4)) {
      clearTimeout(timer2);
      message = '';
      timer2 = setTimeout(function() {
        lose();
      }, 10000);
      passoSoffio++;
    }
    if ((passoSoffio == 1 || passoSoffio == 5) && vol > threshold_min) {
      clearTimeout(timer2);
      start = Date.now();
      passoSoffio++;
    } else if ((passoSoffio == 2 || passoSoffio == 6) && (Date.now() - start) > 1000) {
      passoSoffio++;

      if (vol > threshold_min) {

        if (passoSoffio == 7) {
          winStep2();
        } else {
          message2 = 'Release and click again to blow another time';
        }
      } else {
        lose();
        passoSoffio --;
      }
    } else if (passoSoffio == 3 && !keyIsDown(78)) {
      passoSoffio++;
    }
  } else {
    image(heart, windowWidth / 2, windowHeight / 2, w1, h1);
  }
}



function Wave(x, y, barwid, maxhei, amount) {
  //Initial Variables
  //Coords
  this.x = x;
  this.y = y;
  //Bar Properties
  this.maxhei = maxhei;
  this.amount = amount;
  this.barwid = barwid;
  //noStroke();
  //Display
  this.display = function() {
    push();
    rectMode(CENTER);
    for (this.i = 0; this.i < this.amount; this.i++) {
      //Time in milliseconds/600 for smoothe transitions
      this.time = millis() / 600;
      //Cycling colors depending on time
      this.r = map(sin(this.time + amplitude), -1, 1, 110, 210);
      this.g = map(sin(this.time + amplitude), -1, 1, 0, 18);
      this.b = map(sin(this.time + amplitude), -1, 1, 0, 18);
      fill(this.r, this.g, this.b);
      //Height depending on time and i
      this.hei = map(sin(this.i / 90 + this.time), -1, 1, 0, this.maxhei) * amplitude;
      //Actual Draw
      noStroke();
      rect(this.x + this.i * this.barwid - this.amount * this.barwid / 2, this.y, this.barwid + 2, this.hei / 6);
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyIsDown(83) && keyIsDown(68) && keyIsDown(74) && keyIsDown(75) && (passo == 0 || passo == 2 || passo == 4)) {

    if (!song.isPlaying() || song.isPaused()) {
      song.play();
    }
    w1 = 330;
    h1 = 330;
    caso--;
    alfa = 40;
    clearTimeout(timer);
    timer = setTimeout(function() {
      lose2();

    }, 3000);
    var now = Date.now();
    if (step1 == 30) {
      if (passo == 4) {
        winStep3();
      } else {
        winStep1();
      }
      clearTimeout(timer);
    }
    else if ((now - start > 900 || now - start < 200 || sommaTot > 1500) && start != -1) {
      lose();
      message = 'You are not keeping up'
    } else {
//stai andando bene
      if (step1 > 15) {
        message = 'Keep it up, you are doing well!'
      }
      if (start != -1) {
        sommaTot = sommaTot + (now - start - 600);
      }
      step1++;
      // check++;
      // console.log('check', check);
    }
    start = now;
  }
}

function blinking() {
  w = 50;
  h = 50;
}

function keyReleased() {
  w1 = 300;
  h1 = 300;
}

function lose() {
  value = 50;
  sommaTot = 0;
  a++;
  if (a >= 3) {
    window.location.reload();
  window.open("haiperso.html", "_self")

  }
}

function lose2() {
    window.location.reload();
  window.open("haiperso.html", "_self")
}

function winStep1() {
  value = 200;
  step1 = 0;
  sommaTot = 0;
  message = '';
  passo++;
  console.log('passo', passo);
}

function winStep2() {
  passo++;
  passoSoffio = 0;
  start = -1;
  message = '';
  message2 = '';
  console.log('passo', passo);
}

function winStep3() {
  passo++;
  console.log('vinto', passo);
  window.location.reload();
  window.open("haivinto.html", "_self")
}


function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
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

  //Display
  this.display = function()
  {
	for(this.i=0; this.i<this.amount; this.i++)
    {
      push();
      rectMode(CENTER);
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
      pop();
    }
  }

}
