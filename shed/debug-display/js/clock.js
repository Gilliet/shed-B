/* clock.js: (bad) javascript code for displaying current tango pose 
 *           and (temporarily) logging poses. 
 * author: Gillie Rosen, gtr@andrew.cmu.edu
*/

//window.onload = initClock;
$(function(){
  setTimeout(initClock, 1000);
});

 
function initClock() {

  
// setTimeout(initClock, 500);
  

document.getElementById("record").onclick = function() {recordClick()};

 document.getElementById('tango').innerHTML= "tango...." ;

/* TANGO STUFF */ 

// simplest way to start motion tracking on an ADF with one call
var adfName = ""; //note: you use the *name* and not the *uuid*
                         //leave adfName as null or "" to not load an adf

Tangova.start(tangoCallback, tangoCallback, adfName);

// to stop the motion tracking
// note: these callbacks won't be called at the moment (but the function does work)
//Tangova.stopTango(successCallback, errorCallback);

// to set the maximum pose update rate (starts at 30hz)
Tangova.setMaxUpdateRate(15.5); // 15.5 hz

}





function tangoCallback(data) {
  document.getElementById('tango').innerHTML= "tango!" ;
  if(data.baseFrame === "AREA_DESCRIPTION") {
    // localized against the loaded area description
  } else if(data.baseFrame === "START_OF_SERVICE") {
    // localized against where the tango was when the service started
  }
  // console.log(data.rotation);
  // console.log(data.translation);

  document.getElementById('posDisplay').innerHTML = "Pos:" 
          + (data.translation[0]).toFixed(4) + ", "
          + (data.translation[1]).toFixed(4) + ", "
          + (data.translation[2]).toFixed(4) ;

  document.getElementById('oriDisplay').innerHTML = "Ori:" 
          + (data.rotation[0]).toFixed(4) + ", "
          + (data.rotation[1]).toFixed(4) + ", "
          + (data.rotation[2]).toFixed(4) + ", "
          + (data.rotation[3]).toFixed(4);
}

function recordClick(){

var thelog = document.getElementById("log");
var newlog = document.createElement("minilog");
newlog.innerHTML = document.getElementById('posDisplay').innerHTML + " "
        + document.getElementById('oriDisplay').innerHTML + " - ";
  thelog.appendChild(newlog.firstChild);
document.getElementById("record").innerHTML = "Recorded!";
 setTimeout(resetButton, 1500);

}

function resetButton(){
  document.getElementById("record").innerHTML = "Record this pose";
}