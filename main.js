import "./style.css";
import * as T from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { arraySlice } from "three/src/animation/AnimationUtils";

const scene = new T.Scene();

const camera = new T.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, // View Frustrum
  1000 // to control which objects are visible
);

const renderer = new T.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// TORUS
const geometry = new T.TorusGeometry(10, 3, 16, 100);
const material = new T.MeshStandardMaterial({
  // color: 0xff6347,
  color: 0x444444,
});
const torus = new T.Mesh(geometry, material);

scene.add(torus);

// LIGHT
const pointLight = new T.PointLight(0xffffff);
pointLight.position.set(5, 5, 15);

const ambientLight = new T.AmbientLight(0xffffff);
scene.add(
  //
  pointLight
  // ambientLight
);

const lightHelper = new T.PointLightHelper(pointLight);
const gridHelper = new T.GridHelper(200, 50);
scene
  .add
  //
  // lightHelper
  // gridHelper
  ();

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new T.SphereGeometry(0.25, 24, 24);
  const material = new T.MeshStandardMaterial({ color: 0xffffff });
  const star = new T.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => T.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  scene.add(star);
}
Array(200).fill().forEach(addStar);

// ANIMATE START
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  camera.position.x += 0.01;
  camera.position.y += 0.01;
  camera.position.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
