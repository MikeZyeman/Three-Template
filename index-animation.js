
import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { OrbitControls } from './js/OrbitControls.js';

var x = 0,
    y = 20,
    z = 100;

var scene,
    camera,
    clock,
    renderer,
    light,
    controls,
    loader,
    mixer;


const init = function () {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    light = new THREE.PointLight(0xffffff);
    light.position.set(x, y, z);
    light.castShadow = true;
    camera.add(light);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    loader = new GLTFLoader()

    scene.add(camera);

    loader.load('', function (gltf) {
        scene.add(gltf.scene);

        mixer = new THREE.AnimationMixer(gltf.scene);

        gltf.animations.forEach((clip) => {

            mixer.clipAction(clip).play();

        });
    });


    camera.position.set(x, y, z);
    controls.update();
}


const onWindowResize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

const animate = function () {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
};

init();
animate();
window.addEventListener('resize', onWindowResize, false);


