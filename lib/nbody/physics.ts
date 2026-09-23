export const G = 1;

export type Body = {
  name: string;
  m: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  drawR: number;
};

export type Vec = { x: number; y: number };

export function cloneBodies(bodies: Body[]): Body[] {
  return bodies.map((body) => ({ ...body }));
}

export function accelerations(bodies: readonly Body[], g = G): Vec[] {
  const n = bodies.length;
  const a: Vec[] = Array.from({ length: n }, () => ({ x: 0, y: 0 }));
  for (let i = 0; i < n; i++) {
    const bi = bodies[i];
    for (let j = i + 1; j < n; j++) {
      const bj = bodies[j];
      const dx = bj.x - bi.x;
      const dy = bj.y - bi.y;
      const r2 = dx * dx + dy * dy;
      const invR3 = g / (r2 * Math.sqrt(r2));
      const ax = dx * invR3;
      const ay = dy * invR3;
      a[i].x += bj.m * ax;
      a[i].y += bj.m * ay;
      a[j].x -= bi.m * ax;
      a[j].y -= bi.m * ay;
    }
  }
  return a;
}

export function energy(bodies: readonly Body[], g = G): number {
  let kinetic = 0;
  let potential = 0;
  for (let i = 0; i < bodies.length; i++) {
    const bi = bodies[i];
    kinetic += 0.5 * bi.m * (bi.vx * bi.vx + bi.vy * bi.vy);
    for (let j = i + 1; j < bodies.length; j++) {
      const bj = bodies[j];
      const dx = bj.x - bi.x;
      const dy = bj.y - bi.y;
      potential -= (g * bi.m * bj.m) / Math.hypot(dx, dy);
    }
  }
  return kinetic + potential;
}

export function angularMomentum(bodies: readonly Body[]): number {
  let l = 0;
  for (const body of bodies) {
    l += body.m * (body.x * body.vy - body.y * body.vx);
  }
  return l;
}

export function minSeparation(bodies: readonly Body[]): number {
  let min = Infinity;
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const d = Math.hypot(dx, dy);
      if (d < min) min = d;
    }
  }
  return min;
}

export function shiftToBarycenter(bodies: Body[]) {
  let mass = 0;
  let cx = 0;
  let cy = 0;
  let px = 0;
  let py = 0;
  for (const body of bodies) {
    mass += body.m;
    cx += body.m * body.x;
    cy += body.m * body.y;
    px += body.m * body.vx;
    py += body.m * body.vy;
  }
  cx /= mass;
  cy /= mass;
  px /= mass;
  py /= mass;
  for (const body of bodies) {
    body.x -= cx;
    body.y -= cy;
    body.vx -= px;
    body.vy -= py;
  }
}

export function perturbVelocity(bodies: Body[], index: number, fraction: number) {
  if (fraction === 0) return;
  const body = bodies[index];
  const speed = Math.hypot(body.vx, body.vy);
  if (speed === 0) {
    body.vx += fraction;
    return;
  }
  body.vx += fraction * speed;
}
