import * as THREE from 'three';

let renderer, scene, camera, mesh, animId;
let nodes = [], lines = [];

export function initSkillsThree(container) {
  if (renderer) destroySkillsThree();

  const W = container.clientWidth;
  const H = container.clientHeight || 280;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.set(0, 0, 4);

  // Icosahedron wireframe
  const geo = new THREE.IcosahedronGeometry(1.4, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, opacity: 0.6, transparent: true });
  mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Inner sphere
  const innerGeo = new THREE.SphereGeometry(0.5, 16, 16);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xff6ec7, wireframe: true, opacity: 0.4, transparent: true });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  scene.add(inner);

  // Orbiting nodes
  const nodePositions = [
    [2, 0.5, 0], [-2, -0.3, 0.5], [0, 2, 0.5], [0, -2, -0.3],
    [1.5, 1.5, 0.5], [-1.5, 1.5, -0.5],
  ];
  nodes = nodePositions.map((pos, i) => {
    const ng = new THREE.SphereGeometry(0.08, 8, 8);
    const nm = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x7fffd4 : 0xffe066 });
    const n = new THREE.Mesh(ng, nm);
    n.position.set(...pos);
    n._basePos = [...pos];
    n._phase = i * (Math.PI * 2 / nodePositions.length);
    scene.add(n);
    return n;
  });

  // Ambient light
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  animate();

  window.addEventListener('resize', () => onResize(container));
}

function animate() {
  animId = requestAnimationFrame(animate);
  const t = Date.now() * 0.001;

  if (mesh) {
    mesh.rotation.x += 0.004;
    mesh.rotation.y += 0.006;
  }

  nodes.forEach((n, i) => {
    const r = 2.2;
    n.position.x = Math.cos(t * 0.4 + n._phase) * r;
    n.position.z = Math.sin(t * 0.4 + n._phase) * r;
    n.position.y = n._basePos[1] + Math.sin(t + i) * 0.3;
  });

  renderer.render(scene, camera);
}

function onResize(container) {
  if (!renderer) return;
  const W = container.clientWidth;
  const H = container.clientHeight || 280;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
}

export function destroySkillsThree() {
  if (animId) cancelAnimationFrame(animId);
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }
  scene = camera = mesh = null;
  nodes = []; lines = [];
}
