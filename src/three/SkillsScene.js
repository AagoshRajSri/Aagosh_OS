import * as THREE from 'three';

let renderer, scene, camera, mesh, animId;
let orbitNodes = [];

export function initSkillsScene(container) {
  if (renderer) destroySkillsScene();
  const W = container.clientWidth, H = container.clientHeight || 280;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.id = 'skills-canvas';
  container.appendChild(renderer.domElement);

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.set(0, 0, 4.5);

  // Wireframe icosahedron
  const geo = new THREE.IcosahedronGeometry(1.4, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, opacity: 0.55, transparent: true });
  mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Inner sphere
  const sGeo = new THREE.SphereGeometry(0.5, 16, 16);
  const sMat = new THREE.MeshBasicMaterial({ color: 0xff6ec7, wireframe: true, opacity: 0.4, transparent: true });
  scene.add(new THREE.Mesh(sGeo, sMat));

  // Orbiting nodes
  const colors = [0x7fffd4, 0xffe066, 0xff6ec7, 0x8b5cf6, 0x39ff82, 0x00e5c8];
  orbitNodes = colors.map((color, i) => {
    const n = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshBasicMaterial({ color })
    );
    n._phase = i * (Math.PI * 2 / colors.length);
    n._yBase = (Math.random() - 0.5) * 1.5;
    scene.add(n);
    return n;
  });

  const onResize = () => {
    if (!renderer) return;
    const w = container.clientWidth, h = container.clientHeight || 280;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  const tick = () => {
    animId = requestAnimationFrame(tick);
    const t = Date.now() * 0.001;
    mesh.rotation.x += 0.004;
    mesh.rotation.y += 0.006;
    orbitNodes.forEach(n => {
      n.position.x = Math.cos(t * 0.4 + n._phase) * 2.2;
      n.position.z = Math.sin(t * 0.4 + n._phase) * 2.2;
      n.position.y = n._yBase + Math.sin(t + n._phase) * 0.3;
    });
    renderer.render(scene, camera);
  };
  tick();
}

export function destroySkillsScene() {
  if (animId) cancelAnimationFrame(animId);
  if (renderer) { renderer.dispose(); renderer.domElement?.remove(); renderer = null; }
  scene = camera = mesh = null;
  orbitNodes = [];
}
