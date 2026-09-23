import { accelerations, type Body, type Vec } from "@/lib/nbody/physics";

export type IntegratorId = "euler" | "verlet" | "rk4" | "yoshida";

export type IntegratorInfo = {
  id: IntegratorId;
  name: string;
  order: string;
  symplectic: boolean;
  summary: string;
  lines: string[];
};

export const INTEGRATORS: IntegratorInfo[] = [
  {
    id: "euler",
    name: "辛 Euler",
    order: "1 阶",
    symplectic: true,
    summary: "先用当前加速度更新速度，再用新速度更新位置。格式简单，能长期守住轨道的拓扑，但能量误差比 Verlet 大。",
    lines: [
      "a ← Σ_{j≠i} G m_j (r_j − r_i) / |r_j − r_i|³",
      "v ← v + a Δt",
      "r ← r + v Δt",
    ],
  },
  {
    id: "verlet",
    name: "速度 Verlet",
    order: "2 阶",
    symplectic: true,
    summary: "半步速度、整步位置、再半步速度。太阳系长时积分的直接版常用这类辛格式：能量误差来回振荡，不随时间线性累积。",
    lines: [
      "a ← Σ_{j≠i} G m_j (r_j − r_i) / |r_j − r_i|³",
      "v ← v + a Δt / 2",
      "r ← r + v Δt",
      "a ← Σ_{j≠i} G m_j (r_j − r_i) / |r_j − r_i|³",
      "v ← v + a Δt / 2",
    ],
  },
  {
    id: "yoshida",
    name: "Yoshida 4",
    order: "4 阶",
    symplectic: true,
    summary: "把三步 Verlet 按 Yoshida 系数 w₁, w₀, w₁ 合成。仍是辛格式，局部误差更高阶，适合把周期轨道积得很贴。",
    lines: [
      "w₁ = 1 / (2 − 2^{1/3})",
      "w₀ = −2^{1/3} / (2 − 2^{1/3})",
      "Verlet(w₁ Δt)",
      "Verlet(w₀ Δt)",
      "Verlet(w₁ Δt)",
    ],
  },
  {
    id: "rk4",
    name: "经典 RK4",
    order: "4 阶",
    symplectic: false,
    summary: "四次斜率取加权平均。短时间很准，但不是辛格式。步长一大，能量会朝一个方向漂，周期轨道慢慢变胖或散掉。",
    lines: [
      "k1 = f(r, v)",
      "k2 = f(r + k1 Δt/2, …)",
      "k3 = f(r + k2 Δt/2, …)",
      "k4 = f(r + k3 Δt, …)",
      "(r, v) ← (r, v) + (k1 + 2k2 + 2k3 + k4) Δt / 6",
    ],
  },
];

export function integratorInfo(id: IntegratorId): IntegratorInfo {
  return INTEGRATORS.find((item) => item.id === id) ?? INTEGRATORS[1];
}

const CBRT2 = Math.pow(2, 1 / 3);
const YOSHIDA_W1 = 1 / (2 - CBRT2);
const YOSHIDA_W0 = -CBRT2 / (2 - CBRT2);

function kick(bodies: Body[], a: readonly Vec[], dt: number) {
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].vx += a[i].x * dt;
    bodies[i].vy += a[i].y * dt;
  }
}

function drift(bodies: Body[], dt: number) {
  for (const body of bodies) {
    body.x += body.vx * dt;
    body.y += body.vy * dt;
  }
}

export function symplecticEuler(bodies: Body[], dt: number) {
  kick(bodies, accelerations(bodies), dt);
  drift(bodies, dt);
}

export function velocityVerlet(bodies: Body[], dt: number) {
  const a0 = accelerations(bodies);
  kick(bodies, a0, dt / 2);
  drift(bodies, dt);
  kick(bodies, accelerations(bodies), dt / 2);
}

export function yoshida4(bodies: Body[], dt: number) {
  velocityVerlet(bodies, YOSHIDA_W1 * dt);
  velocityVerlet(bodies, YOSHIDA_W0 * dt);
  velocityVerlet(bodies, YOSHIDA_W1 * dt);
}

function rk4(bodies: Body[], dt: number) {
  const n = bodies.length;
  const x0 = bodies.map((b) => b.x);
  const y0 = bodies.map((b) => b.y);
  const vx0 = bodies.map((b) => b.vx);
  const vy0 = bodies.map((b) => b.vy);

  const sample = (fx: number, fy: number) => {
    for (let i = 0; i < n; i++) {
      bodies[i].x = x0[i] + fx;
      bodies[i].y = y0[i] + fy;
    }
  };

  const k1a = accelerations(bodies);
  const k1vx = vx0.slice();
  const k1vy = vy0.slice();

  for (let i = 0; i < n; i++) {
    bodies[i].vx = vx0[i] + k1a[i].x * (dt / 2);
    bodies[i].vy = vy0[i] + k1a[i].y * (dt / 2);
  }
  sample(0, 0);
  for (let i = 0; i < n; i++) {
    bodies[i].x = x0[i] + k1vx[i] * (dt / 2);
    bodies[i].y = y0[i] + k1vy[i] * (dt / 2);
  }
  const k2a = accelerations(bodies);
  const k2vx = bodies.map((b) => b.vx);
  const k2vy = bodies.map((b) => b.vy);

  for (let i = 0; i < n; i++) {
    bodies[i].vx = vx0[i] + k2a[i].x * (dt / 2);
    bodies[i].vy = vy0[i] + k2a[i].y * (dt / 2);
    bodies[i].x = x0[i] + k2vx[i] * (dt / 2);
    bodies[i].y = y0[i] + k2vy[i] * (dt / 2);
  }
  const k3a = accelerations(bodies);
  const k3vx = bodies.map((b) => b.vx);
  const k3vy = bodies.map((b) => b.vy);

  for (let i = 0; i < n; i++) {
    bodies[i].vx = vx0[i] + k3a[i].x * dt;
    bodies[i].vy = vy0[i] + k3a[i].y * dt;
    bodies[i].x = x0[i] + k3vx[i] * dt;
    bodies[i].y = y0[i] + k3vy[i] * dt;
  }
  const k4a = accelerations(bodies);
  const k4vx = bodies.map((b) => b.vx);
  const k4vy = bodies.map((b) => b.vy);

  for (let i = 0; i < n; i++) {
    bodies[i].x =
      x0[i] + (dt / 6) * (k1vx[i] + 2 * k2vx[i] + 2 * k3vx[i] + k4vx[i]);
    bodies[i].y =
      y0[i] + (dt / 6) * (k1vy[i] + 2 * k2vy[i] + 2 * k3vy[i] + k4vy[i]);
    bodies[i].vx =
      vx0[i] + (dt / 6) * (k1a[i].x + 2 * k2a[i].x + 2 * k3a[i].x + k4a[i].x);
    bodies[i].vy =
      vy0[i] + (dt / 6) * (k1a[i].y + 2 * k2a[i].y + 2 * k3a[i].y + k4a[i].y);
  }
}

export function stepBodies(bodies: Body[], dt: number, method: IntegratorId) {
  switch (method) {
    case "euler":
      symplecticEuler(bodies, dt);
      return;
    case "verlet":
      velocityVerlet(bodies, dt);
      return;
    case "yoshida":
      yoshida4(bodies, dt);
      return;
    case "rk4":
      rk4(bodies, dt);
      return;
  }
}
