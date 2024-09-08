class ipage{
  constructor(IB,S1,S2,F1,F2){//receive all needed variables as in images and sound
    this.BG=IB;//the background
    this.S1=S1;//sound
    this.playbool=false;//boolean to start game
    this.helpbool=false;//boolean to open help page
    this.F2=F2//font
  }
  show(){//this shows the designs in the page
    this.BG.resize(windowWidth,windowHeight);//resize the introimage
    image(this.BG,0,0);//displaying background
    textAlign(CENTER);
    this.createhelp();//calling the help function for the help page
    this.playbox();//calling the playbox button function
    if(this.helpbool){//if the helpbool is true display the help page
      this.helppage();
    }
    return this.playbool;//this returns true if the play button is pressed
  }
  
  playbox(){//this function displays the start button
    rectMode(CORNER);
    fill(150,180,40);
      if(mouseX>windowWidth*0.1&&mouseX<(windowWidth*0.1)+350&&mouseY>windowHeight*0.8&&mouseY<(windowHeight*0.8)+150){
      fill(150,0,0);//creating the hover effect
    }
    if(mouseX>windowWidth*0.1&&mouseX<(windowWidth*0.1)+350&&mouseY>windowHeight*0.8&&mouseY<(windowHeight*0.8)+150&&mouseIsPressed&&!this.helpbool){
      S2.pause();// the play is pressed, play pause the background music
      this.S1.play();//playing the start button pressed sound
      this.playbool=true;//sets the playboolean to true 
    }
    rect(windowWidth*0.1,windowHeight*0.8,350,150,60);//drawing the start button
    fill(0);
    textFont(F1);
    textSize(90);
    textAlign(CENTER);
    text("Start",windowWidth*0.1+180,windowHeight*0.8+110);
  }
  createhelp(){
    fill(100);
    if(dist(mouseX,mouseY,windowWidth*0.9,windowHeight*0.1)<=30){
      fill(60);//create hover effect
    }
    if(dist(mouseX,mouseY,windowWidth*0.9,windowHeight*0.1)<=30&&mouseIsPressed){
      this.helpbool=true;//set boolean to open help page
    }
    circle(windowWidth*0.9,windowHeight*0.1,60);//these following code just creates the help button
    fill(255,255,0);
    textSize(30);
    textFont(NORMAL);
    text("?",windowWidth*0.9,windowHeight*0.1+10);
  }
  helppage(){
    fill(100);
    rect(50,50,windowWidth*0.95,windowHeight*0.9,50);
    textFont(this.F2);
    fill(255);
    textSize(80);
    text('WELCOME',windowWidth*0.5,windowHeight*0.25);
    textSize(30);
    text('Move your Hand Up and Down while pressing the mouse to control the gear',windowWidth*0.5,windowHeight*0.4);
    text('Move your Hand left and right to control the steer',windowWidth*0.5,windowHeight*0.5);
    text('Click on the Q key to go to the Homepage',windowWidth*0.5,windowHeight*0.6);
    text('Press the space bar to connect to Arduino',windowWidth*0.5,windowHeight*0.7);
    text('GOOD LUCK!',windowWidth*0.5,windowHeight*0.8);
    fill(100);
    if(dist(mouseX,mouseY,windowWidth*0.5,windowHeight*0.9)<=30){
      fill(60);//create hover effect
    }
    if(dist(mouseX,mouseY,windowWidth*0.5,windowHeight*0.9)<=30&&mouseIsPressed){
      this.helpbool=false;//set boolean to close help page
    }
    circle(windowWidth*0.5,windowHeight*0.9,60);//these following code just creates the ok button
    fill(255,255,0);
    textSize(30);
    textFont(NORMAL);
    text("OK",windowWidth*0.5,windowHeight*0.9+10);
    
  }
}