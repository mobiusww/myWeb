let i_bubbleS
let video;
let poseNet
let noseX = 0;
let noseY = 0;
let thresHD = -1;
let thresBuffer = 15;
let button;
let sound_alarm;

function preload() {
  sound_alarm = new Audio("Alarm.mp3");
  // sound_alarm=loadSound("Alarm.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight)
  video = createCapture(VIDEO);
  createCapture
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', f_getPoses)

  button = createButton('Set Posture');
  button.position(0, 0);
  button.mousePressed(f_setThresHD);

  sld_thresBuffer = createSlider(5, 100, 25, 1)
  sld_thresBuffer.position(200, 0);




  noStroke();
}

function f_setThresHD() {
  thresHD = noseY;

}

function draw() {
  image(video, 0, 0);
  thresBuffer = sld_thresBuffer.value();
  // text(str,x,y,[x2],[y2])


  fill(255);
  circle(noseX, noseY, 20);
  if (thresHD > 0) {
    fill(255, 255, 0, 100);

    rect(0, thresHD, video.width, thresBuffer)
    fill(255, 0, 0, 150);
    rect(0, thresHD + thresBuffer, video.width, video.height - (thresHD + thresBuffer));
    f_alarm();
  }
  fill(0)
  textSize(12);
  text('Set Buffer Zone', sld_thresBuffer.x + 8 , sld_thresBuffer.height+12);

}

function f_alarm() {

  if (noseY >= (thresHD + thresBuffer)) {
    sound_alarm.play();
    textSize(50);
    fill(0);

    text('SIT STRAIGHT!!', 50, thresHD + thresBuffer+100);
  } else {
    sound_alarm.pause();
  }

}

function modelLoaded() {
  console.log('ml5 posenet model loaded')
}

function f_getPoses(poses) {
  // console.log(poses)
  if (poses.length > 0) {
    noseX = poses[0].pose.nose.x;
    noseY = poses[0].pose.nose.y;
    // noseX = poses[0].pose.rightShoulder.x;
    // noseY = poses[0].pose.rightShoulder.y;
  }
}
