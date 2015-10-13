// index.js
//
// contains basic setup code

var container;
var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = 10;
var windowHalfY = 10;

var windowCenterX = 0;
var windowCenterY = 0;


$(function() {
  init();
  animate();
});

function init() {

  var vp = $("#viewport");
  windowHalfX = $("#viewport").width() / 2;
  windowHalfY = $("#viewport").height() / 2;

  windowCenterX = $("#viewport").offset().left + windowHalfX;
  windowCenterY = $("#viewport").offset().top + windowHalfY;

  camera = new THREE.PerspectiveCamera( 70, vp.width() / vp.height(), 0.01, 20 );
  camera.position.z = 2; 

  // scene
  scene = new THREE.Scene();

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( vp.width(), vp.height() );
  vp[0].appendChild( renderer.domElement );

  // portrait setup (this function is defined by portrait.js)
  initPortrait(scene, renderer);
  
  // event listeners
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  windowHalfX = $("#viewport").width() / 2;
  windowHalfY = $("#viewport").height() / 2;

  windowCenterX = $("#viewport").offset().left + windowHalfX;
  windowCenterY = $("#viewport").offset().top + windowHalfY;

  camera.aspect = windowHalfX / windowHalfY;
  camera.updateProjectionMatrix();

  renderer.setSize( windowHalfX*2, windowHalfY*2 );
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowCenterX;
  mouseY = event.clientY - windowCenterY;
}

function animate() {
  requestAnimationFrame( animate );

  // portrait update (defined in portrait.js)
  animatePortrait(1.0/60.0, mouseX, mouseY);

  render();
}

function render() {
  renderer.render( scene, camera );
}