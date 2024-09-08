class Steer{//this class creates the steer and controls the car movement front and back
  constructor(ctr,X=windowWidth/3,Y=windowHeight/2,F2){//takes the steerX,the font and the position for the steer to be placed
    this.angle=0;//equate the angle to 0
    this.X=X;//set the X and Y for the placement of the steering wheel
    this.Y=Y;
    this.ctr=ctr;
    this.movementLR=0;//create this Left right variable to store the movement
    this.F2=F2;
  }
  show(ctr){//takes steer x
    this.ctr=ctr;//update the ctr with steerX
  push();//designing the steering using stack so that it can be rotated entirely at once
  translate(this.X,this.Y);//making the orijin these
  rotate(this.angle);//causes the rotation
  noFill(0);
  strokeWeight(80);
  rectMode(CENTER);
  circle(0,0,500);
  fill(0);
  stroke(0);
  strokeWeight(12);
  beginShape();
  curveVertex(-230,-80);
  curveVertex(-230,-80);
  curveVertex(0,-120);
  curveVertex(230,-80);
  curveVertex(230,0);
  curveVertex(80,70);
  curveVertex(40,230);
  curveVertex(-40,230);
  curveVertex(-80,70);
  curveVertex(-230,0);
  curveVertex(-230,-80);
  curveVertex(-230,-80);
  fill(0);
  endShape();
  fill(100);
    noStroke()
  textSize(50)
    textAlign(CENTER);
  textFont(this.F2);
  text('REKAS',0,0);//steering wheel/car brand
  pop();
    if(this.ctr>0&&this.ctr<windowWidth){//while the value is within our range
  this.angle=map(this.ctr,0,windowWidth,-PI/2,PI/2);//update angle based on this
  }
  }
  steerTurn(movementFB,wallstop){//this function controls the turning of the steer
    if(this.angle<-PI/5&&movementFB==1&&wallstop!=1){
        this.movementLR=4;//front left
      }
      else if(this.angle<-PI/5&&movementFB==2&&wallstop!=2){
        this.movementLR=6;//back left
      }
      else if(this.angle>=-PI/5&&this.angle<-PI/8){
        this.movementLR=0;//to prevent bugs 
      }
      else if(this.angle>=-PI/8&&this.angle<PI/8&&movementFB==1&&wallstop!=1){
        this.movementLR=1;//move straight ahead
      }
      else if(this.angle>=-PI/8&&this.angle<PI/8&&movementFB==2&&wallstop!=2){
        this.movementLR=2;//reverse
      }
      else if(this.angle>=PI/8&&this.angle<PI/5.5){
        this.movementLR=0;//yeah
      }
      else if(this.angle>=PI/5.5&&movementFB==1&&wallstop!=1){
        this.movementLR=3;//front right
      }
      else if(this.angle>=PI/5.5&&movementFB==2&&wallstop!=2){
        this.movementLR=5;//back right
      }
      else{
        this.movementLR=0;//dont move
      }
    return this.movementLR;
  }
}