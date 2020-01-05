var net;
var video;
var currentResult;
var cheeck1;
var cheeck2;
var smoke1;
var smoke2;


function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  
  // The line below + the videoLoadedCallback were added 
  // after the video was shot to fix compability issues.
  video.elt.addEventListener('loadeddata', videoLoadedCallback);
  
  video.size(800, 600);
  video.hide();

  cheeck1 = loadImage("heart.png");
  cheeck2 = loadImage("heart.png");
  smoke1 = loadImage("left.png");
  smoke2 = loadImage("right.png");
}

function draw() {
  background(255);
  image(video, 0, 0, 800, 600);

  if (currentResult) {
    var nose = currentResult.keypoints[0].position;
    var eye1 = currentResult.keypoints[1].position;
    var eye2 = currentResult.keypoints[2].position;
    var ear1 = currentResult.keypoints[3].position;
    var ear2 = currentResult.keypoints[4].position;

    var scale = (eye1.x - eye2.x) / 5500;

    image(cheeck1,
      (eye1.x -10) -1 * scale,
      (eye1.y + 40) -1* scale,
      cheeck1.width * scale,
      cheeck1.height * scale);
    image(cheeck2,
      (eye2.x - 25) -1 * scale,
      (eye2.y + 40) -1* scale,
      cheeck1.width * scale,
      cheeck1.height * scale);
    image(smoke2,
      (ear1.x - 25) -1 * scale,
      (ear1.y -30) -1* scale,
      smoke1.width * scale*10,
      smoke1.height * scale*10);
    image(smoke1,
      (ear2.x -70) -1 * scale,
      (ear2.y -30) -1* scale,
      smoke2.width * scale*10,
      smoke2.height * scale*10);
  }
}

// The new callback
function videoLoadedCallback() {
  print("Video Loaded");
  posenet.load().then(loadedCallback);
}

function loadedCallback(model) {
  print("Model loaded!");
  net = model;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}

function estimateCallback(result) {
  currentResult = result;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}
