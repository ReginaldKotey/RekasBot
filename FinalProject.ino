#include <Servo.h>//include the Servo library/
#include <time.h>//include the time library for seeding random number

Servo myservo;//creating servo object

const int ain1Pin = 3;//setting pins for motor for left side which is connected in parallel
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;//setting pinf for motor for right side 
const int bin2Pin = 7;
const int pwmBPin = 6;

const int trigPin1 = 11;//setting pins for front ultrasonic sensor
const int echoPin1= A0;//I used A0 pin cause I didnt have space...Please pardon me
const int trigPin2 = 10;//setting pins for back ultrasonic sensor
const int echoPin2 = A1;//here too

const int warningbuzzer=12;//setting the buzzer to 12
//servo motor
const int headmovePin=9;//setting the servo motor pin to 9

int wallstop=0;//initializing the obstacle detection

unsigned long previousMillis = 0;//setting millis to 0
const long interval = 5000;//setting interval for the millis


void setup() {
  myservo.attach(headmovePin);//pass the servo pin to the servo library
  
  randomSeed(time(NULL));//seed random number using the current time 

  pinMode(ain1Pin, OUTPUT);//setting the pins as output and input
  pinMode(2, OUTPUT);//light checker
  pinMode(ain2Pin, OUTPUT);//motor pin
  pinMode(pwmAPin, OUTPUT); // not needed really
  pinMode(bin1Pin, OUTPUT);
  pinMode(bin2Pin, OUTPUT);
  pinMode(pwmBPin, OUTPUT); // not needed really
  // Start serial communication so we can send data
  // over the USB connection to our p5js sketch
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(warningbuzzer, OUTPUT);

  Serial.begin(9600);//setting the serial band

  while (!Serial.available()) {
    digitalWrite(LED_BUILTIN, HIGH); // on/blink while waiting for serial data
    Serial.println("0,0"); // send a starting message
    delay(300);            // wait 1/3 second
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000);//delay for a second
  }
}

void loop() {
  wallstop=crushstop();
  //When the serial is detected do this
  while (Serial.available()) {//while the serial connection exists
    digitalWrite(LED_BUILTIN, HIGH); // led on while receiving data
    wallstop=crushstop();//update the wallstop from the crush function
    unsigned long currentMillis = millis();//set current millis

    if (currentMillis - previousMillis >= interval) {
      // save the last time you blinked the LED
      previousMillis = currentMillis;
      movehead();//if the interval is reached, move the head
    }
    int movement = Serial.parseInt();//get the movement case from p5
   if (Serial.read() == '\n') {//when we read a new line,
     switch(movement){//execute the following commmands based on the case
      case 0://no movement
        analogWrite(pwmAPin, 0);
        digitalWrite(ain1Pin, HIGH);
        digitalWrite(ain2Pin, LOW);
        analogWrite(pwmBPin, 0);
        digitalWrite(bin1Pin, LOW);
        digitalWrite(bin2Pin, HIGH);
      break;
      case 1://forward
        analogWrite(pwmAPin, 255);
        digitalWrite(ain1Pin, LOW);
        digitalWrite(ain2Pin, HIGH);
        analogWrite(pwmBPin, 255);
        digitalWrite(bin1Pin, HIGH);
        digitalWrite(bin2Pin, LOW);
      break;
      case 2://reverse
        analogWrite(pwmAPin, 255);
        digitalWrite(ain1Pin, HIGH);
        digitalWrite(ain2Pin, LOW);
        analogWrite(pwmBPin, 255);
        digitalWrite(bin1Pin, LOW);
        digitalWrite(bin2Pin, HIGH);
      break;
      case 3://right front
        analogWrite(pwmBPin, 255);
        digitalWrite(bin1Pin, HIGH);
        digitalWrite(bin2Pin, LOW);
      break;
      case 4://left front
        analogWrite(pwmAPin, 255);
        digitalWrite(ain1Pin, LOW);
        digitalWrite(ain2Pin, HIGH);
      break;
      case 5://right back
       analogWrite(pwmBPin, 255);
        digitalWrite(bin1Pin, LOW);
        digitalWrite(bin2Pin, HIGH);
      break;
      case 6://left back
        analogWrite(pwmAPin, 255);
        digitalWrite(ain1Pin, HIGH);
        digitalWrite(ain2Pin, LOW);
      break;
      default://if not case is gotten within our expected range, stop
        analogWrite(pwmAPin, 0);
        digitalWrite(ain1Pin, HIGH);
        digitalWrite(ain2Pin, LOW);
        analogWrite(pwmBPin, 0);
        digitalWrite(bin1Pin, LOW);
        digitalWrite(bin2Pin, HIGH);
      break;
     }
      delay(5);
      Serial.println(wallstop);//send the detection to p5
      
    }
  }
  
}

int crushstop(){//this function returns 1 when an obstacle is ahead and 2 when an obstacle is behind
  int wallstop=0;//initialize wallstop
  digitalWrite(trigPin1, LOW); 
  delayMicroseconds(2); //basically shooting beems and using the time it takes to bounce back to calculate distance
  digitalWrite(trigPin1, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trigPin1, LOW); 
  // Time it takes for the pulse to travel back from the object long 
  int duration1 = pulseIn(echoPin1, HIGH); 
  // Universal conversion of time into distance in cm 
  int distance1 = duration1 * 0.034 / 2;//divided by two beause its a two way thing

  digitalWrite(trigPin2, LOW); 
  delayMicroseconds(2); 
  digitalWrite(trigPin2, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trigPin2, LOW); 
  // Time it takes for the pulse to travel back from the object long 
  int duration2 = pulseIn(echoPin2, HIGH); 
  // Universal conversion of time into distance in cm 
  int distance2 = duration2 * 0.034 / 2;
  if(distance1<5){//if collision is detected behind, send 2
    wallstop=2;
    tone(warningbuzzer,2000);//play the tone
    delay(5);
  }
  else if(distance2<5){
    wallstop=1;//if collision is detected infront, send 1
    tone(warningbuzzer,2000);//play the tone
    delay(5);
  }
  else{
    wallstop=0;
    noTone(warningbuzzer);//if nothing is detected dont play a tone
  }
  return wallstop;//return this info
}

void movehead(){
  myservo.write(random(0, 180));//move the head to a random number between 0 and 180
  delay(15);
}
