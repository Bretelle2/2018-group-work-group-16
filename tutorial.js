var w = 0;
var h = 0;
var start = -1;
var step1 = 0;
var timer;
var sommaTot = 0;
var song;
var value = 0;
var message = '';

function preload() {
  song = loadSound('assets/song.mp3');
  bold = loadFont("font/GTAmericaMono-Bold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(value);
  fill(255);
  ellipse(width / 2, height / 2, 10, 10);
  push();
  fill(255,0,0,170);
  push();
  fill(255,0,0,255);
  strokeWeight(2);
  pop();

  ellipse(width / 2, height / 2, w, h);
  pop();
  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  textFont(bold);
  fill(255);
  text(message, width/2, height/2+200);

  if (frameCount % 35 == 0 && song.isPlaying()) {
    blinking();
  } else {
    w = 0;
    h = 0;
  }

  if ((keyIsDown(83) && keyIsDown(68) && keyIsDown(74) && keyIsDown(75)) && song.isPlaying()) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      lose();
    }, 3000);
    var now = Date.now();
    if (step1 == 5) {
      message = 'Good work, lets try the real stuff now!';
      setTimeout(testPassed, 1000)
      clearTimeout(timer);
    }
    //mantiene il ritmo con un delta da fixare
    else if ((now - start > 900 || now - start < 200 || sommaTot > 1500) && start != -1) {
      //text('Try again, you are not keeping up correctly!',width/6,height/8);
    } else {
      //stai andando bene
      //value = 255;
      if (start != -1) {
        sommaTot = sommaTot + (now - start - 600);
      }
      step1++;
    }
    start = now;
  }
}

function blinking() {
  w = 50;
  h = 50;
}

function mouseClicked() {
  if (song.isPlaying() == false) {
    song.play();
  } else if (song.isPlaying()) {
    song.pause();
  }
}

function testPassed() {
  song.pause();
  window.location.reload();
  window.open("pagina1.html", "_self")
}
