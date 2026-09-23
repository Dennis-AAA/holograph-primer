import { stepBodies, type IntegratorId } from "@/lib/nbody/integrators";
import {
  angularMomentum,
  cloneBodies,
  energy,
  minSeparation,
  type Body,
} from "@/lib/nbody/physics";
import { PRESETS, type PresetId } from "@/lib/nbody/presets";

function run(
  bodies: Body[],
  dt: number,
  steps: number,
  method: IntegratorId,
) {
  const e0 = energy(bodies);
  const l0 = angularMomentum(bodies);
  let minSep = Infinity;
  for (let i = 0; i < steps; i++) {
    stepBodies(bodies, dt, method);
    if (i % 20 === 0) minSep = Math.min(minSep, minSeparation(bodies));
  }
  const e = energy(bodies);
  const l = angularMomentum(bodies);
  return {
    eRel: Math.abs(e - e0) / Math.abs(e0),
    lRel: Math.abs(l0) > 1e-12 ? Math.abs(l - l0) / Math.abs(l0) : Math.abs(l - l0),
    minSep,
  };
}

function posError(a: Body[], b: Body[]) {
  let max = 0;
  for (let i = 0; i < a.length; i++) {
    max = Math.max(max, Math.hypot(a[i].x - b[i].x, a[i].y - b[i].y));
    max = Math.max(max, Math.hypot(a[i].vx - b[i].vx, a[i].vy - b[i].vy));
  }
  return max;
}

function radiusSpread(bodies: Body[], start: number) {
  const rs = bodies.slice(start).map((b) => Math.hypot(b.x, b.y));
  const mean = rs.reduce((s, r) => s + r, 0) / rs.length;
  const maxDev = Math.max(...rs.map((r) => Math.abs(r - mean)));
  return { mean, maxDev };
}

function reportClosure(id: PresetId, period: number, method: IntegratorId, dt: number) {
  const preset = PRESETS.find((item) => item.id === id)!;
  const initial = preset.create({ perturbation: 0, massScale: 1 });
  const bodies = cloneBodies(initial);
  const steps = Math.round(period / dt);
  const stats = run(bodies, dt, steps, method);
  const err = posError(initial, bodies);
  console.log(
    `${id} ${method} dt=${dt} steps=${steps} return=${err.toExponential(3)} dE=${stats.eRel.toExponential(3)} dL=${stats.lRel.toExponential(3)}`,
  );
  return err;
}

function reportSpread(
  id: PresetId,
  periods: number,
  period: number,
  perturbation: number,
  massScale = 1,
) {
  const preset = PRESETS.find((item) => item.id === id)!;
  const bodies = preset.create({ perturbation, massScale });
  const dt = 0.0005;
  const stepsPer = Math.round(period / dt);
  const start = bodies.some((b) => b.name === "太阳" || b.name === "中心") ? 1 : 0;
  const r0 = bodies.map((b) => Math.hypot(b.x, b.y));
  console.log(`-- ${id} pert=${perturbation} massScale=${massScale} T=${period.toFixed(4)}`);
  for (let p = 1; p <= periods; p++) {
    run(bodies, dt, stepsPer, "yoshida");
    let maxFrac = 0;
    for (let i = start; i < bodies.length; i++) {
      const r = Math.hypot(bodies[i].x, bodies[i].y);
      maxFrac = Math.max(maxFrac, Math.abs(r - r0[i]) / Math.max(r0[i], 1e-8));
    }
    const spread = radiusSpread(bodies, start);
    const sep = minSeparation(bodies);
    if (p % 5 === 0 || p === 1) {
      console.log(
        `  period ${p}: maxFrac=${maxFrac.toExponential(3)} ringDev=${spread.maxDev.toExponential(3)} minSep=${sep.toExponential(3)}`,
      );
    }
  }
}

const figure8Period = 6.32591398;
reportClosure("figure8", figure8Period, "yoshida", 1e-4);
reportClosure("figure8", figure8Period, "verlet", 1e-3);
reportClosure("figure8", figure8Period, "rk4", 1e-3);
reportClosure("figure8", figure8Period, "rk4", 0.02);

const side = 1;
const lagrangePeriod = (masses: number[]) =>
  (2 * Math.PI) / Math.sqrt(masses.reduce((s, m) => s + m, 0) / side ** 3);
reportClosure("lagrange", lagrangePeriod([1, 0.02, 0.001]), "yoshida", 2e-4);
reportClosure("lagrange-equal", lagrangePeriod([1, 1, 1]), "yoshida", 2e-4);

function ringPeriod(n: number, radius: number, mass: number, central: number) {
  let sum = 0;
  for (let k = 1; k < n; k++) sum += 1 / Math.sin((Math.PI * k) / n);
  const omega = Math.sqrt(central / radius ** 3 + (mass * sum) / (4 * radius ** 3));
  return (2 * Math.PI) / omega;
}

reportClosure("maxwell", ringPeriod(8, 1, 1, 400), "yoshida", 2e-4);
reportClosure("polygon9", ringPeriod(9, 1, 1, 0), "yoshida", 2e-4);
reportClosure("chain4", 2 * Math.PI, "yoshida", 1e-4);

reportSpread("maxwell", 20, ringPeriod(8, 1, 1, 400), 0.002);
reportSpread("polygon9", 15, ringPeriod(9, 1, 1, 0), 0.002);
reportSpread("lagrange", 12, lagrangePeriod([1, 0.02, 0.001]), 0.004);
reportSpread("lagrange-equal", 8, lagrangePeriod([1, 1, 1]), 0.004);
reportSpread("solar", 8, 2 * Math.PI * Math.sqrt(0.46 ** 3), 0);
reportSpread("solar", 4, 2 * Math.PI * Math.sqrt(0.46 ** 3), 0, 800);

const rk = PRESETS[3].create({ perturbation: 0, massScale: 1 });
const vl = cloneBodies(rk);
const longSteps = Math.round((figure8Period * 30) / 0.02);
const rkStats = run(rk, 0.02, longSteps, "rk4");
const vlStats = run(vl, 0.02, longSteps, "verlet");
console.log(
  `figure8 x30 T dt=0.02  RK4 dE=${rkStats.eRel.toExponential(3)} Verlet dE=${vlStats.eRel.toExponential(3)}`,
);
