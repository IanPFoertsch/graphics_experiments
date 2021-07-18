// Option 1: Import the entire three.js core library.
// import * as THREE from 'three';

// const scene = new THREE.Scene();


// Option 2: Import just the parts you need.
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Color, FogExp2, CylinderGeometry, MeshPhongMaterial, SceneUtils, MeshToonMaterial, PlaneGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three/build/three.module"

import conifer_gltf from "../conifer.json"

const scene = new Scene()
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// console.log(THREE)
const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry();
const material = new MeshToonMaterial( { color: 0x333333 } );
const cube = new Mesh( geometry, material );

const plane_geometry = new PlaneGeometry(100,100)
plane_geometry.rotateX(-Math.PI * 0.5)
plane_geometry.translate(0,-.6,0)
const plane_material = new MeshToonMaterial( { color: 0x006644 } )
const plane = new Mesh(plane_geometry, plane_material)

scene.add(plane)
scene.add( cube );
scene.background = new Color( 0xcccccc );
// scene.fog = new FogExp2( 0xcccccc, 0.002 );

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = false;


const gltf_loader = new GLTFLoader()

var conifer = gltf_loader.parse(
    JSON.stringify(conifer_gltf),
    null,
    (parsed_gltf) => {
        console.log("The parsed object!")
        // parsed_gltf.scene.children.forEach(element => {
        //     console.log(element)
        // });
        // console.log(parsed_gltf.scene)
        console.log(parsed_gltf.scene.children[2])
        scene.add(parsed_gltf.scene.children[2])
    },
    (error) => { console.log("Failed to load object: ", error)}
)


camera.position.z = 5;

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(10,10,10)
scene.add(light)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();