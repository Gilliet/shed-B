/* clock.js: (bad) javascript code for displaying current tango pose 
 *           and (temporarily) logging poses. 
 * author: Gillie Rosen, gtr@andrew.cmu.edu
*/

window.onload = initClock;
 
function initClock() {
  var now = new Date();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  if (min < 10) min = "0" + min;  // insert a leading zero
  if (sec < 10) sec = "0" + sec;
  document.getElementById('posDisplay').innerHTML
        = "Pos:" + min ;
          document.getElementById('oriDisplay').innerHTML
        = "Ori:" + sec ;
  setTimeout('initClock()', 500);
  

document.getElementById("record").onclick = function() {recordClick()};

/* TANGO STUFF */ 
/* 
// simplest way to start motion tracking on an ADF with one call
var adfName = ""; //note: you use the *name* and not the *uuid*
                         //leave adfName as null or "" to not load an adf
Tangova.start(tangoCallback, onErrorCallback, adfName);

// to stop the motion tracking
// note: these callbacks won't be called at the moment (but the function does work)
Tangova.stopTango(successCallback, errorCallback);

// to set the maximum pose update rate (starts at 30hz)
Tangova.setMaxUpdateRate(15.5); // 15.5 hz
*/
}

function tangoCallback(data) {
  document.getElementById('tango').innerHTML
        = "tango!" ;
  if(data.baseFrame === "AREA_DESCRIPTION") {
    // localized against the loaded area description
  } else if(data.baseFrame === "START_OF_SERVICE") {
    // localized against where the tango was when the service started
  }
  console.log(data.rotation);
  console.log(data.translation);
}

function recordClick(){

  //TANGO STUFF GOES HERE???? 
    var now = new Date();
    var hrs = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
var thelog = document.getElementById("log");
var newlog = document.createElement("minilog");
newlog.innerHTML = hrs + ":" + min + ":" + sec + " - ";
  thelog.appendChild(newlog.firstChild);
document.getElementById("record").innerHTML = "Recorded!";
 setTimeout('resetButton()', 1500);
}

function resetButton(){
  document.getElementById("record").innerHTML = "Record this pose";
}