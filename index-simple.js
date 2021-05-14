import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { OrbitControls } from './js/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff);
light.position.set(0, 20, 100);
light.castShadow = true;
camera.add(light)

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

scene.add(camera);

loader.load('', function (gltf) {

    scene.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});

camera.position.set(0, 20, 100);
controls.update();

const animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};

animate();