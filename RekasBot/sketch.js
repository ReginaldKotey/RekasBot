let mySteer;//variable going to store steer object
let myDash;//gonna store the dashboard object
let handpose;//gonna store posenet object
let video;//gonna store video object
let predictions = [];//gonna store set of predictions from posenet
let steerX=300;//gonna store the average x coordinate of the hand
let gearY=250;//gonna store the average y coordinate of the hand
let movementLR=0;//gonnna store the left and right movement
let movementFB=0;//gonna store the front and back movement

let wallstop=0;//gonna store the obstacle detection
let steercontrol=0;//gonna control steer to make it feel smooth

let IntroBackground;//intropage background
let S1;//sound 1(button)
let S2;//sound 2
let F1;
let F2;
let introp;//gonna store intropage object
let introbool=true;//going to control the intropage display
let gamebool=false;//going to control the mainpage display

function preload(){
  //in this preload function we will load all the uploads we need before we even start the game.
  IntroBackground=loadImage("intro1.jpg");//this is for the background
  S1=loadSound("button.mp3");//these sets are for the sounds
  S2=loadSound("msound.mp3");
  F1=loadFont("font1.ttf");//these sets are for the fonts 
  F2=loadFont("font2.ttf");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);//capture video using camera
  video.size(width, height);//set the size of the video to that of the screen
   steercontrol=windowWidth/2//set the steercontrol for smoothness
  handpose = ml5.handpose(video);//get posenet from the video feed using the ml library

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  introp=new ipage(IntroBackground,S1,S2,F1,F2);//create intropage object
  mySteer=new Steer(steerX,windowWidth*0.5,windowHeight*0.85,F2);//create steer object
  myDash=new dash(windowHeight*0.85);//create dashboard object
  S2.loop();//start playing the sound but with loop property
}

function draw() {
  if(introbool){//if the introbool is true show intropage
    gamebool=introp.show();//update gamebool from intro.show function
    movementLR=int(random(0,6));//do random stuff
    if(gamebool){introbool=false;}//if the gamebool is true,set intro to false
  }
  else{
    background(50,150,255);
  myDash.showdash()//show the dash
  drawKeypoints();//call this function for geting info from the video hand detection
  movementFB=myDash.showgear(gearY);//update the front back movement from the showgear function
  movementLR=mySteer.steerTurn(movementFB,wallstop);//update the leftright movement from the steerturn function
  if(steerX>0&&steerX<windowWidth){//if the steerX is within the range we want
    mySteer.show(steerX);//show the steer with this value
    steercontrol=steerX;//update the steercontrol incase we stop getting data
  }
  else{//if the steerX is not in our range,
    if(steercontrol<windowWidth/2-5){steercontrol+=10;}//using our steercontrol,slowly move the steer to the center
    else if(steercontrol>windowWidth/2+5){steercontrol-=10;}
    mySteer.show(steercontrol);
  }
  myDash.showScreen(wallstop);//show the screen with the wallstop getten form the Arduino
  }
}
function keyPressed() {//if spaebar is pressed connect to arduino
  if (key == " ") {
    // important to have in order to start the serial connection!!
    setUpSerial();//connect to arduino
  }
}
function readSerial(data) {
  

  if (data!=null){//if the data is not null
    //////////////////////////////////
    //READ FROM ARDUINO HERE (handshake)
    //////////////////////////////////
    wallstop= int(trim(data));
    //////////////////////////////////
    //SEND TO ARDUINO HERE (handshake)
    //////////////////////////////////
    let sendToArduino = movementLR + "\n";
    writeSerial(sendToArduino);
  }
    
}
function drawKeypoints() {
  let totalX=0;//set variable to store the sum of the x coordinates of all the predictions
  let totalY=0;//same for y
  let avgctr=0;//set a counter to count the predictions
  let len=0;//I dont use len here but i was experimenting somthing
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    len=predictions.lenght*prediction.landmarks.length;
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
       totalX+=windowWidth-map(keypoint[0],0,video.width,0,windowWidth);//map the points to our window size and sum it
      totalY+=map(keypoint[1],0,video.height,0,windowHeight);
      avgctr++;//increase this too
    }
  }
  steerX=totalX/avgctr;//update steerX with the average of X
  gearY=totalY/avgctr;//same for Y but with average of Y
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);//resize the canvas to go to fullpage
}

function keyTyped() {
  // $$$ For some reason on Chrome/Mac you may have to press f twice to toggle. Works correctly on Firefox/Mac
  if (key === 'f') {
    toggleFullscreen();//if f is pressed, show fullpage
  }
  if(key==='q'){//if q is pressed go to h=intro page
    if(introbool==false){
      introbool=true;
      introp.playbool=false;
      S2.play();
    }
  }
  // uncomment to prevent any default behavior
  // return false;
}

// Toggle fullscreen state. Must be called in response
// to a user event (i.e. keyboard, mouse click)
function toggleFullscreen() {
  let fs = fullscreen(); // Get the current state
  fullscreen(!fs); // Flip it!
}