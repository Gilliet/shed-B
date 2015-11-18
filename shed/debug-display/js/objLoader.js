
	var container;

	var camera, scene, renderer;

	var mouseX = 0;
	var mouseXOnMouseDown = 0;

	var mouseY = 0;
	var mouseYOnMouseDown = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var targetRotationX = 0;
	var targetRotationOnMouseDownX = 0;

	var targetRotationY = 0;
	var targetRotationOnMouseDownY = 0;

	init();
	animate();


	function init() {
		console.log('init...')
		container = document.createElement( 'div' );
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 100;

		// scene

		scene = new THREE.Scene();

		var ambient = new THREE.AmbientLight( 0x101030 );
		scene.add( ambient );

		var directionalLight = new THREE.DirectionalLight( 0xffeedd );
		directionalLight.position.set( 0, 0, 1 );
		scene.add( directionalLight );

		// texture

		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {

			console.log( item, loaded, total );

		};

		var texture = new THREE.Texture();

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};

		var onLoad = function(xhr) {
			var o = scene.getObjectById(6,true);
			console.log(o);
		}


		var loader = new THREE.ImageLoader( manager );
		// loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {
		//
		// 	texture.image = image;
		// 	texture.needsUpdate = true;
		//
		// } );

		// model
		var myLambert = new THREE.MeshLambertMaterial();
		var loader = new THREE.OBJLoader( manager );
		
		loader.load( "small-me-tidy.obj", function ( object, myLambert ) {


			object.children[0].material.transparent = true;
			object.children[0].material.opacity = 0.5;
			object.rotateZ(-Math.PI/2.0);
			object.rotateY(-Math.PI/2.0);
			//object.rotateX();
			object.scale.set(0.35,0.35,0.35);
			object.name= meshes[count];
			count++;
			console.log(count);
		//	object.position.y = - 80;
			scene.add( object );

		}, onProgress, onError, onLoad );



		//

		renderer = new THREE.WebGLRenderer({alpha: true});
		renderer.setClearColor( 0xffffff, 1);
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		//
		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}


	function animate() {

		requestAnimationFrame( animate );
		render();

	}
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function render() {

		//camera.position.x += ( mouseX - camera.position.x ) * .05;
		//camera.position.y += ( - mouseY - camera.position.y ) * .05;

		camera.lookAt( scene.position );

		renderer.render( scene, camera );

	}

