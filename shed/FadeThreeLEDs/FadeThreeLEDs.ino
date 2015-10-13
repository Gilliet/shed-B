/*FadeThreeLEDs: code to control brightness of three LEDs using
 * an IR proximity sensor. 
 * 
 * Gillian Rosen / gtr@andrew.cmu.edu
 * 
 */

// These constants won't change.  They're used to give names
// to the pins used:
const int analogInPin = A1;  // Analog input pin that the potentiometer is attached to

int pins[] = {9,10,11};
int pins2[] = {3,5,6}; 

int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)
int brightness = 0; 
int maxValue = 0; 
void setup() {
  for (int i = 0; i <= 2; i++){ 
    pinMode(pins[i],OUTPUT);
      pinMode(pins2[i],OUTPUT);
  }
  
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 700, 1, 5);
  brightness = computeBrightness(sensorValue);

  if (sensorValue > maxValue) {
    maxValue = sensorValue; 
    
  }
 
  // print the results to the serial monitor:
  Serial.print("sensor = " );
  Serial.print(sensorValue);
  Serial.print("\t output = ");
  Serial.println(outputValue);
Serial.print("\t max = ");
  Serial.println(maxValue);
 /* int onoff[] = {0,0,0};
  switch (outputValue){
    case 2: 
    onoff[0] = 1; 
    break; 
    case 3:
    onoff[1] = 1; 
    break; 
    case 4: 
    onoff[2] = 1;
    break; 
    default: 
    break;
  }
  */
 /* for (int i = pins[0]; i <= pins[2]; i++){ 
   //for changing color with distance
   //digitalWrite(i+10,onoff[i]);

   //for fade
   analogWrite(i,brightness);
  }
  */
  for(int i = 0; i <=2 ; i++){
    analogWrite(pins[i],brightness);
    analogWrite(pins2[i],brightness);
     
  }
  
  // wait 2 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(2);
}

int computeBrightness(int sv){
  if (sv < 50){
    return 0; 
  }
  return map(pow(sv,2),50,pow(680,2),0,255);
  }
