// Option 1: Import the entire three.js core library.
// import * as THREE from 'three';

// const scene = new THREE.Scene();


// Option 2: Import just the parts you need.
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Color, FogExp2, CylinderGeometry, MeshPhongMaterial, SceneUtils, MeshToonMaterial, PlaneGeometry, ConeGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from "three/build/three.module"

import conifer_gltf from "../conifer.json"

const scene = new Scene()
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var replication_factor = 40
var density_factor = 100
var offset = Math.sqrt(replication_factor * density_factor)

Math.random
Array(replication_factor).fill().forEach((element) => {
    
    const cone_geometry = new ConeGeometry(0.5, 3, 4)
    const cone_material  = new MeshToonMaterial( { color: 0x006600})
    const cone = new Mesh(cone_geometry, cone_material)
    cone.position.x = ((Math.random() * offset) - (offset * 0.5) )
    cone.position.z = ((Math.random() * offset) - (offset * 0.5) )    
    // cone.position = (Math.random(), 0, Math.random())
    scene.add(cone)
});
scene.background = new Color( 0xcccccc );
scene.fog = new FogExp2( 0xcccccc, 0.06 );

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = false;

camera.position.z = 5;

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(10,10,10)
scene.add(light)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();