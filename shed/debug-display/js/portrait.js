// portrait.js
//
// contains the code to set up and animate your 3d portrait

// keep some globals around for convenience
// (e.g., so you can open the web console and tweak stuff)
var thePortrait = null;
var rotatorNode = null;

var directionalLight = null;
var directionalLight2 = null;

var color1 = null; 
var color2 = null; 


// this function sets up the portrait: edit it to load your portrait and
// position it so it is visible to the camera
function initPortrait(scene, renderer) {

  // first, set up some lights

  color1 = new THREE.Color(0x00FFCC);
  color2 = new THREE.Color(0xCCCCFF);//0xFFCC00);
  var ambient = new THREE.AmbientLight( 0x202020);// 0x303030 );
  scene.add( ambient );

  directionalLight = new THREE.DirectionalLight(color1,0.5);// 0x606040 );
  directionalLight.position.set( 0, 0.5, 1 );
  scene.add( directionalLight );

  directionalLight2 = new THREE.DirectionalLight( color2,0.5);//0x404060 );
  directionalLight2.position.set( 0, -0.5, 1 );
  scene.add( directionalLight2 );

  // create an empty node that we can rotate according to the mouse position
  rotatorNode = new THREE.Object3D();
  scene.add( rotatorNode );

  // create a loading manager and have it print out whenever it loads an item
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };

  var onProgress = function ( xhr ) {
    // don't do anything with progress reports
  };

  var onError = function ( xhr ) {
    console.log("Loading error: " + xhr);
  };

  // load a texture
  var texture = new THREE.Texture();

  var texloader = new THREE.ImageLoader( manager );
  texloader.load( 'textures/checkerboard.png', function ( image ) {
    //note: texture doesn't actually show up, but that's okay
    texture.image = image;
    texture.needsUpdate = true;
  } );

  // create a basic lambertian material with our texture
  var material = new THREE.MeshLambertMaterial({map: texture});

  // load obj model
  var objloader = new THREE.OBJLoader( manager );
 // objloader.load( 'meshes/placeholder_person.obj', material, function ( object ) {
objloader.load( 'meshes/small-me-tidy.obj', material, function ( object ) {
    // this is a good spot to apply what transforms you need to the model
    object.rotation.set(-1.3, 0.0, -1.0, 'YXZ');
    //object.scale.set(1.2, 1.2, 1.2);
     object.scale.set(0.3, 0.3, 0.3);
    //object.position.set(0.0, -0.5, 0.0);
   // object.position.set(0.0,0.0,-2.0);
    object.position.set(2.35,-3.5,-3);

    // make sure to actually add it to the scene or it won't show up!
    rotatorNode.add( object );

    // set the global se we can easily access the portrait from the console
    thePortrait = object;

  }, onProgress, onError );
}


// this function will get called every frame, with dt being how much
// time (in s) has passed since the last frame
// cursorX and cursorY indicate the relative position of the mouse cursor
// to the viewing window (so you can make the portrait look at the mouse)
  function animatePortrait(dt, cursorX, cursorY) {

    // make the portrait tilt towards the mouse cursor
    // (feel free to replace this with something else!)
   var x = Math.max(-2.0, Math.min(2.0, pixelToRadians(cursorX)));
    var y = Math.max(-2.0, Math.min(2.0, pixelToRadians(cursorY)));
  
 // var x = rotatorNode.rotation.x+0.01;
 // var y = rotatorNode.rotation.y+0.01;

   rotatorNode.rotation.set(y, x, 0, 'YXZ');

   color1.offsetHSL(0.0008,0,0);
   directionalLight.color = color1;
   color2.offsetHSL(-0.0008,0,0);
   directionalLight2.color = color2;

  }

// helper function to non-linearly map an offset in pixels into radians
function pixelToRadians(pixval) {
  var scalefactor = 0.005;
  return Math.tanh(pixval * scalefactor);
}

