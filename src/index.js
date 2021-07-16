// Option 1: Import the entire three.js core library.
// import * as THREE from 'three';

// const scene = new THREE.Scene();


// Option 2: Import just the parts you need.
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Color, FogExp2, CylinderGeometry, MeshPhongMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { THREE } from "../node_modules/three/build/three.min.js"
const scene = new Scene()
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// console.log(THREE)
const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new Mesh( geometry, material );
scene.add( cube );
scene.background = new Color( 0xcccccc );
scene.fog = new FogExp2( 0xcccccc, 0.002 );

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = false;

var other_geometry = new CylinderGeometry( 0, 10, 30, 4, 1 );
var other_material = new MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

				for ( let i = 0; i < 500; i ++ ) {

					const mesh = new Mesh( other_geometry, other_material );
					mesh.position.x = Math.random() * 1600 - 800;
					mesh.position.y = 0;
					mesh.position.z = Math.random() * 1600 - 800;
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = false;
					scene.add( mesh );

				}


camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();