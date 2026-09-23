export const G = 1;

export type Body3 = {
  name: string;
  m: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  drawR: number;
};

export type Vec3 = { x: number; y: number; z: number };

export function cloneBodies3(bodies: readonly Body3[]): Body3[] {
  return bodies.map((body) => ({ ...body }));
}

export function accelerations3(bodies: readonly Body3[], g = G): Vec3[] {
  const n = bodies.length;
  const a: Vec3[] = Array.from({ length: n }, () => ({ x: 0, y: 0, z: 0 }));
  for (let i = 0; i < n; i++) {
    const bi = bodies[i];
    for (let j = i + 1; j < n; j++) {
      const bj = bodies[j];
      const dx = bj.x - bi.x;
      const dy = bj.y - bi.y;
      const dz = bj.z - bi.z;
      const r2 = dx * dx + dy * dy + dz * dz;
      const invR3 = g / (r2 * Math.sqrt(r2));
      const ax = dx * invR3;
      const ay = dy * invR3;
      const az = dz * invR3;
      a[i].x += bj.m * ax;
      a[i].y += bj.m * ay;
      a[i].z += bj.m * az;
      a[j].x -= bi.m * ax;
      a[j].y -= bi.m * ay;
      a[j].z -= bi.m * az;
    }
  }
  return a;
}

function kick(bodies: Body3[], a: readonly Vec3[], dt: number) {
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].vx += a[i].x * dt;
    bodies[i].vy += a[i].y * dt;
    bodies[i].vz += a[i].z * dt;
  }
}

function drift(bodies: Body3[], dt: number) {
  for (const body of bodies) {
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    body.z += body.vz * dt;
  }
}

export function verlet3(bodies: Body3[], dt: number) {
  const a0 = accelerations3(bodies);
  kick(bodies, a0, dt / 2);
  drift(bodies, dt);
  kick(bodies, accelerations3(bodies), dt / 2);
}

const CBRT2 = Math.pow(2, 1 / 3);
const W1 = 1 / (2 - CBRT2);
const W0 = -CBRT2 / (2 - CBRT2);

export function yoshida3(bodies: Body3[], dt: number) {
  verlet3(bodies, W1 * dt);
  verlet3(bodies, W0 * dt);
  verlet3(bodies, W1 * dt);
}

export function rk4Step3(bodies: Body3[], dt: number) {
  const n = bodies.length;
  const s0 = bodies.map((b) => ({ ...b }));
  const stage = (dx: number[], dy: number[], dz: number[], dvx: number[], dvy: number[], dvz: number[]) => {
    for (let i = 0; i < n; i++) {
      bodies[i].x = s0[i].x + dx[i];
      bodies[i].y = s0[i].y + dy[i];
      bodies[i].z = s0[i].z + dz[i];
      bodies[i].vx = s0[i].vx + dvx[i];
      bodies[i].vy = s0[i].vy + dvy[i];
      bodies[i].vz = s0[i].vz + dvz[i];
    }
    return accelerations3(bodies);
  };

  const k1a = accelerations3(bodies);
  const k1x = s0.map((b) => b.vx);
  const k1y = s0.map((b) => b.vy);
  const k1z = s0.map((b) => b.vz);
  const half = dt / 2;
  const k2a = stage(
    k1x.map((v) => v * half),
    k1y.map((v) => v * half),
    k1z.map((v) => v * half),
    k1a.map((a) => a.x * half),
    k1a.map((a) => a.y * half),
    k1a.map((a) => a.z * half),
  );
  const k2x = bodies.map((b) => b.vx);
  const k2y = bodies.map((b) => b.vy);
  const k2z = bodies.map((b) => b.vz);
  const k3a = stage(
    k2x.map((v) => v * half),
    k2y.map((v) => v * half),
    k2z.map((v) => v * half),
    k2a.map((a) => a.x * half),
    k2a.map((a) => a.y * half),
    k2a.map((a) => a.z * half),
  );
  const k3x = bodies.map((b) => b.vx);
  const k3y = bodies.map((b) => b.vy);
  const k3z = bodies.map((b) => b.vz);
  const k4a = stage(
    k3x.map((v) => v * dt),
    k3y.map((v) => v * dt),
    k3z.map((v) => v * dt),
    k3a.map((a) => a.x * dt),
    k3a.map((a) => a.y * dt),
    k3a.map((a) => a.z * dt),
  );
  const k4x = bodies.map((b) => b.vx);
  const k4y = bodies.map((b) => b.vy);
  const k4z = bodies.map((b) => b.vz);
  for (let i = 0; i < n; i++) {
    bodies[i].x = s0[i].x + (dt / 6) * (k1x[i] + 2 * k2x[i] + 2 * k3x[i] + k4x[i]);
    bodies[i].y = s0[i].y + (dt / 6) * (k1y[i] + 2 * k2y[i] + 2 * k3y[i] + k4y[i]);
    bodies[i].z = s0[i].z + (dt / 6) * (k1z[i] + 2 * k2z[i] + 2 * k3z[i] + k4z[i]);
    bodies[i].vx = s0[i].vx + (dt / 6) * (k1a[i].x + 2 * k2a[i].x + 2 * k3a[i].x + k4a[i].x);
    bodies[i].vy = s0[i].vy + (dt / 6) * (k1a[i].y + 2 * k2a[i].y + 2 * k3a[i].y + k4a[i].y);
    bodies[i].vz = s0[i].vz + (dt / 6) * (k1a[i].z + 2 * k2a[i].z + 2 * k3a[i].z + k4a[i].z);
  }
}

export type Integrator3 = "verlet" | "yoshida" | "rk4";

export function step3(bodies: Body3[], dt: number, method: Integrator3) {
  if (method === "verlet") verlet3(bodies, dt);
  else if (method === "yoshida") yoshida3(bodies, dt);
  else rk4Step3(bodies, dt);
}

export function energy3(bodies: readonly Body3[], g = G) {
  let kinetic = 0;
  let potential = 0;
  for (let i = 0; i < bodies.length; i++) {
    const bi = bodies[i];
    kinetic += 0.5 * bi.m * (bi.vx * bi.vx + bi.vy * bi.vy + bi.vz * bi.vz);
    for (let j = i + 1; j < bodies.length; j++) {
      const bj = bodies[j];
      const d = Math.hypot(bj.x - bi.x, bj.y - bi.y, bj.z - bi.z);
      potential -= (g * bi.m * bj.m) / d;
    }
  }
  return kinetic + potential;
}

export function minSeparation3(bodies: readonly Body3[]) {
  let min = Infinity;
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      min = Math.min(
        min,
        Math.hypot(
          bodies[j].x - bodies[i].x,
          bodies[j].y - bodies[i].y,
          bodies[j].z - bodies[i].z,
        ),
      );
    }
  }
  return min;
}

export function shiftToBarycenter3(bodies: Body3[]) {
  let mass = 0;
  let cx = 0;
  let cy = 0;
  let cz = 0;
  let px = 0;
  let py = 0;
  let pz = 0;
  for (const body of bodies) {
    mass += body.m;
    cx += body.m * body.x;
    cy += body.m * body.y;
    cz += body.m * body.z;
    px += body.m * body.vx;
    py += body.m * body.vy;
    pz += body.m * body.vz;
  }
  cx /= mass;
  cy /= mass;
  cz /= mass;
  px /= mass;
  py /= mass;
  pz /= mass;
  for (const body of bodies) {
    body.x -= cx;
    body.y -= cy;
    body.z -= cz;
    body.vx -= px;
    body.vy -= py;
    body.vz -= pz;
  }
}

const COLORS = ["#f6d56a", "#79b8ff", "#8ee0d6", "#e07a4c", "#d7b6ea", "#9ad67a", "#ffd0e0", "#c5ccd6"];

export function liao3(options: {
  m3: number;
  z0: number;
  vx: number;
  vy: number;
  vz: number;
  names?: [string, string, string];
}): Body3[] {
  const { m3, z0, vx, vy, vz } = options;
  const names = options.names ?? ["甲", "乙", "丙"];
  const bodies: Body3[] = [
    {
      name: names[0],
      m: 1,
      x: -1,
      y: 0,
      z: 0,
      vx,
      vy,
      vz,
      color: COLORS[0],
      drawR: 7,
    },
    {
      name: names[1],
      m: 1,
      x: 1,
      y: 0,
      z: 0,
      vx,
      vy,
      vz: -vz,
      color: COLORS[1],
      drawR: 7,
    },
    {
      name: names[2],
      m: m3,
      x: 0,
      y: 0,
      z: z0,
      vx: (-2 * vx) / m3,
      vy: (-2 * vy) / m3,
      vz: 0,
      color: COLORS[2],
      drawR: 7,
    },
  ];
  shiftToBarycenter3(bodies);
  return bodies;
}

export function hiphop4(tangential = 0.695, vertical = 0.655): Body3[] {
  return hiphopEven(4, tangential, vertical);
}

export function hiphopEven(count: number, tangential: number, vertical: number): Body3[] {
  const names = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"];
  return Array.from({ length: count }, (_, k) => {
    const theta = (2 * Math.PI * k) / count;
    return {
      name: names[k] ?? String(k + 1),
      m: 1,
      x: Math.cos(theta),
      y: Math.sin(theta),
      z: 0,
      vx: -tangential * Math.sin(theta),
      vy: tangential * Math.cos(theta),
      vz: k % 2 === 0 ? vertical : -vertical,
      color: COLORS[k % COLORS.length],
      drawR: count > 12 ? 5 : 6.5,
    };
  });
}

export function braidedRing(nSat: number, mass: number, inclination: number, vScale: number): Body3[] {
  const speed = Math.sqrt(mass) * vScale;
  const horizontal = speed * Math.cos(inclination);
  const vertical = speed * Math.sin(inclination);
  const satellites = Array.from({ length: nSat }, (_, k) => {
    const theta = (2 * Math.PI * k) / nSat;
    return {
      name: String(k + 1),
      m: 1,
      x: Math.cos(theta),
      y: Math.sin(theta),
      z: 0,
      vx: -horizontal * Math.sin(theta),
      vy: horizontal * Math.cos(theta),
      vz: k % 2 === 0 ? vertical : -vertical,
      color: COLORS[(k + 1) % COLORS.length],
      drawR: nSat > 12 ? 4.5 : 5.5,
    };
  });
  satellites.push({
    name: "心",
    m: mass,
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    color: COLORS[0],
    drawR: 9,
  });
  return satellites;
}

export function hiphop(count: number, radius: number, vz: number): Body3[] {
  const bodies: Body3[] = [];
  for (let k = 0; k < count; k++) {
    const theta = (2 * Math.PI * k) / count;
    bodies.push({
      name: `${k + 1}`,
      m: 1,
      x: radius * Math.cos(theta),
      y: radius * Math.sin(theta),
      z: 0,
      vx: 0,
      vy: 0,
      vz: k % 2 === 0 ? vz : -vz,
      color: COLORS[k % COLORS.length],
      drawR: 6,
    });
  }
  return bodies;
}
