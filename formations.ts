import * as THREE from 'three';

export type Formation = {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
};

function makeArrays(count: number) {
  return {
    positions: new Float32Array(count * 3),
    colors: new Float32Array(count * 3),
    sizes: new Float32Array(count),
  };
}

/** Spiral galaxy disk — used for the Hero. Warm void-adjacent center fading to cool edges. */
export function buildGalaxy(count: number): Formation {
  const { positions, colors, sizes } = makeArrays(count);
  const cInner = new THREE.Color('#F97316');
  const cMid = new THREE.Color('#EC4899');
  const cOuter = new THREE.Color('#06B6D4');
  const cFar = new THREE.Color('#4F46E5');

  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const radius = 0.9 + Math.pow(t, 0.55) * 4.4;
    const spinAngle = radius * 2.1;
    const branchAngle = ((i % 4) / 4) * Math.PI * 2;
    const rand = 0.35;
    const rx = (Math.random() - 0.5) * rand * radius * 0.4;
    const ry = (Math.random() - 0.5) * rand * 0.5;
    const rz = (Math.random() - 0.5) * rand * radius * 0.4;
    const angle = branchAngle + spinAngle;

    const x = Math.cos(angle) * radius + rx;
    const y = ry * 0.6;
    const z = Math.sin(angle) * radius + rz;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const rNorm = (radius - 0.9) / 4.4;
    let mixed: THREE.Color;
    if (rNorm < 0.33) mixed = cInner.clone().lerp(cMid, rNorm / 0.33);
    else if (rNorm < 0.66) mixed = cMid.clone().lerp(cOuter, (rNorm - 0.33) / 0.33);
    else mixed = cOuter.clone().lerp(cFar, (rNorm - 0.66) / 0.34);

    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
    sizes[i] = Math.random() * 6 + 2;
  }
  return { positions, colors, sizes };
}

/** Double helix — used behind How It Works / Eligibility Checker. */
export function buildHelix(count: number): Formation {
  const { positions, colors, sizes } = makeArrays(count);
  const cA = new THREE.Color('#7C3AED');
  const cB = new THREE.Color('#06B6D4');
  const height = 6.5;
  const radius = 1.6;

  for (let i = 0; i < count; i++) {
    const strand = i % 2;
    const p = i / count;
    const turns = 3.2;
    const angle = p * Math.PI * 2 * turns + strand * Math.PI;
    const y = (p - 0.5) * height;
    const jitter = (Math.random() - 0.5) * 0.18;

    positions[i * 3] = Math.cos(angle) * (radius + jitter);
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * (radius + jitter);

    const mixed = cA.clone().lerp(cB, p);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
    sizes[i] = Math.random() * 4 + 2;
  }
  return { positions, colors, sizes };
}

/** Rolling wave grid — used behind Why Choose / Map / Features. */
export function buildWave(count: number): Formation {
  const { positions, colors, sizes } = makeArrays(count);
  const cLow = new THREE.Color('#4F46E5');
  const cHigh = new THREE.Color('#06B6D4');
  const cols = Math.ceil(Math.sqrt(count));
  const spacing = 7.5 / cols;

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col - cols / 2) * spacing;
    const z = (row - cols / 2) * spacing;
    const dist = Math.sqrt(x * x + z * z);
    const y = Math.sin(dist * 0.9) * 1.1 - 1.2;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const norm = (y + 2.3) / 2.4;
    const mixed = cLow.clone().lerp(cHigh, Math.min(1, Math.max(0, norm)));
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
    sizes[i] = Math.random() * 4 + 1.5;
  }
  return { positions, colors, sizes };
}

/** Fibonacci sphere — used behind Showcase / Testimonials / FAQ / Contact / Footer. */
export function buildSphere(count: number): Formation {
  const { positions, colors, sizes } = makeArrays(count);
  const cTop = new THREE.Color('#818CF8');
  const cBottom = new THREE.Color('#06B6D4');
  const radius = 2.7;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;

    const mixed = cTop.clone().lerp(cBottom, (y + 1) / 2);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
    sizes[i] = Math.random() * 3.5 + 1.5;
  }
  return { positions, colors, sizes };
}

export function buildAllFormations(count: number) {
  return {
    galaxy: buildGalaxy(count),
    helix: buildHelix(count),
    wave: buildWave(count),
    sphere: buildSphere(count),
  };
}
