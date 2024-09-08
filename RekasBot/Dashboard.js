class dash{//this class prints the dashboard, the gear and the detection screen
  constructor(dashY){
    this.Y=dashY;//the Y coordinate to which the dashboard is drawn
    this.movementFB=0;//the front and back movement counter
    this.gearY=0;//this controls the gearmovement
  }
  showdash(){
    push();//creating the dashboard
    strokeWeight(5)//set stroke weight to 5
    fill(193, 154, 107);//fill with brown
    beginShape();//we draw the dashboard
    curveVertex(0,this.Y);
    curveVertex(0,this.Y);
    curveVertex(windowWidth/2,this.Y-50);//creating the curve look
    curveVertex(windowWidth,this.Y);
    curveVertex(windowWidth,windowHeight);
    curveVertex(0,windowHeight);
    curveVertex(0,this.Y);
    curveVertex(0,this.Y);
    endShape();
    pop();
  }
  showgear(gearY){//this function shows the gear
    this.gearY=gearY;//capies value of the gearY from handpose
    rectMode(CENTER);//set rectange mode
    textSize(50);
    fill(0);//fill with black
    rect(windowWidth*0.5,this.Y+110,150,300,50);
    if(mouseIsPressed){//if the mouse is pressed means gear is being controlled
      if(this.gearY<windowHeight*0.35){
        this.movementFB=1;//set gear to drive
      }
      else if(this.gearY>windowHeight*0.5){
        this.movementFB=2;//set gear to reverse
      }
      else{
        this.movementFB=0;//set gear to P
      }
    }
    textAlign(CENTER);//align text to center
    textSize(50);
    fill(0,128,0);//fill with green
    switch(this.movementFB){
      case 0:
        text('P',windowWidth*0.5,this.Y+110);//p for parking
        break;
      case 1:
        text('D',windowWidth*0.5,this.Y+110);//D for drive
        break;
      case 2:
        text('R',windowWidth*0.5,this.Y+110);//R for reverse
        break;
    }
    textAlign(LEFT);
    textSize(12);
    return this.movementFB;//return the gear movement info 
  }
  showScreen(wallstop){//this shows the detection
    rectMode(CENTER);
    textSize(50);
    textAlign(CENTER);
    fill(0);
    rect(windowWidth*0.75,this.Y+110,500,300,50);//create screen
    fill(128,0,0);//fill the text with red
    if(wallstop==1){//if the front ultrasonic sensor is the one sensing
      text('OBJECT',windowWidth*0.75,this.Y+50);
      text('DETECTED',windowWidth*0.75,this.Y+130);
      text('AHEAD',windowWidth*0.75,this.Y+210);
    }
    else if(wallstop==2){//if the back ultrasonic is the one sensing
      text('OBJECT',windowWidth*0.75,this.Y+50);
      text('DETECTED',windowWidth*0.75,this.Y+130);
      text('BEHIND',windowWidth*0.75,this.Y+210);
    }
    else{
      fill(0,128,0);//fill the text with green
      text('No',windowWidth*0.75,this.Y+50);
      text('OBJECT',windowWidth*0.75,this.Y+130);
      text('DETECTED',windowWidth*0.75,this.Y+210);
    }
    textAlign(LEFT);
    textSize(12);
  }
}