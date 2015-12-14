/*roughMux.ino: rough code for reading from Arudino analog inputs
  using an analog multiplexer.
  author: Gillian Rosen, Dec 2015

  This code is to be used with the Mayhew Labs 48-pin analog multiplexer
  and draws heavily from their example code:
  http://mayhewlabs.com/arduino-mux-shield
*/

//Give convenient names to the control pins
#define CONTROL0 5
#define CONTROL1 4
#define CONTROL2 3
#define CONTROL3 2

//Create arrays for data from the the MUXs
//See the Arduino Array Reference: http://www.arduino.cc/en/Reference/Array
int mux0array[16];
//don't need mux 1 or 2, just 0

void setup()
{
  //Set MUX control pins to output
  pinMode(CONTROL0, OUTPUT);
  pinMode(CONTROL1, OUTPUT);
  pinMode(CONTROL2, OUTPUT);
  pinMode(CONTROL3, OUTPUT);

  //Open the serial port at 9600 bps
  Serial.begin(9600);
}


void loop()
{
  //This loop scrolls through and store inputs on multiplexer 0
  for (int i = 0; i < 9; i++) {
    //set the correct logic for the control pins to select the desired input
    digitalWrite(CONTROL0, (i & 15) >> 3);
    digitalWrite(CONTROL1, (i & 7) >> 2);
    digitalWrite(CONTROL2, (i & 3) >> 1);
    digitalWrite(CONTROL3, (i & 1));

    //Read and store the input value at a location in the array
    mux0array[i] = analogRead(0);
    if (mux0array[i] < 900) {

      //marshal up pin name and value
      //format: PIN.VAL
      String sendstr = "";
      sendstr.concat(i);
      sendstr.concat(".");
      sendstr.concat(mux0array[i]);

      Serial.println(sendstr);
    }
    //we'll only use 0 through 8.
  }

  //done! wait a wee bit.
  delay(100);
}
