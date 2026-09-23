import {
  perturbVelocity,
  shiftToBarycenter,
  type Body,
} from "@/lib/nbody/physics";

export type PresetId =
  | "solar"
  | "maxwell"
  | "polygon9"
  | "figure8"
  | "lagrange"
  | "lagrange-equal"
  | "chain4"
  | "pythagorean"
  | "kepler";

export type StabilityTag =
  | "practical"
  | "periodic-stable"
  | "periodic-unstable"
  | "chaotic"
  | "integrable";

export type Preset = {
  id: PresetId;
  title: string;
  countLabel: string;
  tag: StabilityTag;
  tagLabel: string;
  caption: string;
  dt: number;
  stepsPerFrame: number;
  defaultPerturbation: number;
  perturbIndex: number;
  supportsMassScale: boolean;
  coarseDt: number;
  create: (options: { perturbation: number; massScale: number }) => Body[];
};

const PLANETS: { name: string; m: number; r: number; color: string }[] = [
  { name: "水星", m: 1.660114e-7, r: 0.46, color: "#c5ccd6" },
  { name: "金星", m: 2.447838e-6, r: 0.64, color: "#e6c36a" },
  { name: "地球", m: 3.00349e-6, r: 0.84, color: "#79b8ff" },
  { name: "火星", m: 3.22715e-7, r: 1.06, color: "#e07a4c" },
  { name: "木星", m: 9.54791e-4, r: 1.48, color: "#d4a574" },
  { name: "土星", m: 2.858e-4, r: 1.96, color: "#ead7a8" },
  { name: "天王星", m: 4.36624e-5, r: 2.48, color: "#8ee0d6" },
  { name: "海王星", m: 5.15139e-5, r: 3.02, color: "#6d8cff" },
  { name: "冥王星", m: 6.55e-9, r: 3.52, color: "#d7b6ea" },
];

function ringSum(n: number) {
  let sum = 0;
  for (let k = 1; k < n; k++) sum += 1 / Math.sin((Math.PI * k) / n);
  return sum;
}

function makeRing(options: {
  n: number;
  radius: number;
  mass: number;
  centralMass: number;
  centralName: string;
  satellite: (index: number) => { name: string; color: string; drawR: number };
}): Body[] {
  const { n, radius, mass, centralMass } = options;
  const omega = Math.sqrt(
    centralMass / radius ** 3 + (mass * ringSum(n)) / (4 * radius ** 3),
  );
  const bodies: Body[] = [];
  if (centralMass > 0) {
    bodies.push({
      name: options.centralName,
      m: centralMass,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      color: "#f6d56a",
      drawR: 11,
    });
  }
  for (let k = 0; k < n; k++) {
    const theta = (2 * Math.PI * k) / n - Math.PI / 2;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const look = options.satellite(k);
    bodies.push({
      name: look.name,
      m: mass,
      x,
      y,
      vx: -omega * y,
      vy: omega * x,
      color: look.color,
      drawR: look.drawR,
    });
  }
  return bodies;
}

function lagrange(masses: [number, number, number], side: number): Body[] {
  const raw = [
    { x: 0, y: 0 },
    { x: side, y: 0 },
    { x: side / 2, y: (side * Math.sqrt(3)) / 2 },
  ];
  const names = ["甲", "乙", "丙"];
  const colors = ["#f6d56a", "#79b8ff", "#8ee0d6"];
  const total = masses[0] + masses[1] + masses[2];
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < 3; i++) {
    cx += masses[i] * raw[i].x;
    cy += masses[i] * raw[i].y;
  }
  cx /= total;
  cy /= total;
  const omega = Math.sqrt(total / side ** 3);
  return masses.map((m, i) => {
    const x = raw[i].x - cx;
    const y = raw[i].y - cy;
    return {
      name: names[i],
      m,
      x,
      y,
      vx: -omega * y,
      vy: omega * x,
      color: colors[i],
      drawR: m > 0.2 ? 10 : 6,
    };
  });
}

function solarSystem(massScale: number): Body[] {
  const bodies: Body[] = [
    {
      name: "太阳",
      m: 1,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      color: "#f6d56a",
      drawR: 12,
    },
  ];
  PLANETS.forEach((planet, index) => {
    const theta = index * 0.78 + 0.4;
    const x = planet.r * Math.cos(theta);
    const y = planet.r * Math.sin(theta);
    const speed = Math.sqrt(1 / planet.r);
    bodies.push({
      name: planet.name,
      m: planet.m * massScale,
      x,
      y,
      vx: -speed * Math.sin(theta),
      vy: speed * Math.cos(theta),
      color: planet.color,
      drawR: planet.name === "木星" || planet.name === "土星" ? 6.5 : 4.5,
    });
  });
  shiftToBarycenter(bodies);
  return bodies;
}

export const PRESETS: Preset[] = [
  {
    id: "solar",
    title: "九大行星",
    countLabel: "太阳 + 9 颗行星",
    tag: "practical",
    tagLabel: "实际稳定",
    caption:
      "太阳质量占绝对优势，九颗行星走近似圆轨道且彼此分开。间距经过压缩，好让外行星也在屏幕上走动；质量比用的是真实量级。这不是严格周期解，是叠在开普勒椭圆上的弱扰动。",
    dt: 0.002,
    stepsPerFrame: 24,
    defaultPerturbation: 0,
    perturbIndex: 3,
    supportsMassScale: true,
    coarseDt: 0.02,
    create: ({ perturbation, massScale }) => {
      const bodies = solarSystem(massScale);
      perturbVelocity(bodies, 3, perturbation);
      return bodies;
    },
  },
  {
    id: "maxwell",
    title: "麦克斯韦环",
    countLabel: "九体 · 严格周期",
    tag: "periodic-stable",
    tagLabel: "周期且稳定",
    caption:
      "一颗中心质量 400，八颗质量为 1 的卫星排成正八边形，以同一角速度转动。互相距离不变，所以是九体问题的严格周期解。中心质量足够大时，小扰动只让半径轻微呼吸。",
    dt: 0.002,
    stepsPerFrame: 8,
    defaultPerturbation: 0.002,
    perturbIndex: 1,
    supportsMassScale: false,
    coarseDt: 0.008,
    create: ({ perturbation }) => {
      const bodies = makeRing({
        n: 8,
        radius: 1,
        mass: 1,
        centralMass: 400,
        centralName: "中心",
        satellite: (k) => ({
          name: `S${k + 1}`,
          color: ["#79b8ff", "#8ee0d6", "#e07a4c", "#d7b6ea", "#9ad67a", "#ffd0e0", "#c5ccd6", "#f6d56a"][k],
          drawR: 5,
        }),
      });
      perturbVelocity(bodies, 1, perturbation);
      return bodies;
    },
  },
  {
    id: "polygon9",
    title: "等质量九边形",
    countLabel: "九体 · 严格周期",
    tag: "periodic-unstable",
    tagLabel: "周期但不稳定",
    caption:
      "九颗质量相等的质点放在正九边形上，角速度取得刚好让它们刚体式旋转。这同样是严格周期解。线性不稳定：0.2% 的速度扰动会在一圈左右把多边形撕开。",
    dt: 0.001,
    stepsPerFrame: 12,
    defaultPerturbation: 0.002,
    perturbIndex: 0,
    supportsMassScale: false,
    coarseDt: 0.02,
    create: ({ perturbation }) => {
      const bodies = makeRing({
        n: 9,
        radius: 1,
        mass: 1,
        centralMass: 0,
        centralName: "",
        satellite: (k) => ({
          name: `${k + 1}`,
          color: ["#f6d56a", "#79b8ff", "#8ee0d6", "#e07a4c", "#d7b6ea", "#9ad67a", "#ffd0e0", "#c5ccd6", "#f2f2f2"][k],
          drawR: 5.5,
        }),
      });
      perturbVelocity(bodies, 0, perturbation);
      return bodies;
    },
  },
  {
    id: "figure8",
    title: "三体八字舞",
    countLabel: "三体 · 严格周期",
    tag: "periodic-stable",
    tagLabel: "周期且稳定",
    caption:
      "三颗等质量质点沿同一条 8 字形曲线追逐，周期约 6.326（G = 1）。Moore 在 1993 年找到它，Chenciner 与 Montgomery 在 2000 年证明存在，Kapela 与 Simó 证明它线性稳定。这是目前唯一被证明稳定的等质量编舞。",
    dt: 0.002,
    stepsPerFrame: 20,
    defaultPerturbation: 0,
    perturbIndex: 2,
    supportsMassScale: false,
    coarseDt: 0.08,
    create: ({ perturbation }) => {
      const bodies: Body[] = [
        {
          name: "甲",
          m: 1,
          x: -0.97000436,
          y: 0.24308753,
          vx: 0.466203685,
          vy: 0.43236573,
          color: "#f6d56a",
          drawR: 6,
        },
        {
          name: "乙",
          m: 1,
          x: 0.97000436,
          y: -0.24308753,
          vx: 0.466203685,
          vy: 0.43236573,
          color: "#79b8ff",
          drawR: 6,
        },
        {
          name: "丙",
          m: 1,
          x: 0,
          y: 0,
          vx: -0.93240737,
          vy: -0.86473146,
          color: "#8ee0d6",
          drawR: 6,
        },
      ];
      perturbVelocity(bodies, 2, perturbation);
      return bodies;
    },
  },
  {
    id: "lagrange",
    title: "拉格朗日 · 质量占优",
    countLabel: "三体 · 严格周期",
    tag: "periodic-stable",
    tagLabel: "周期且稳定",
    caption:
      "三体始终组成等边三角形并整体旋转。质量取 1、0.02、0.001，满足 Routh 判据，所以线性稳定。太阳、木星和特洛伊小行星就是这个解的天文学版本。",
    dt: 0.004,
    stepsPerFrame: 12,
    defaultPerturbation: 0.004,
    perturbIndex: 2,
    supportsMassScale: false,
    coarseDt: 0.05,
    create: ({ perturbation }) => {
      const bodies = lagrange([1, 0.02, 0.001], 1);
      perturbVelocity(bodies, 2, perturbation);
      return bodies;
    },
  },
  {
    id: "lagrange-equal",
    title: "拉格朗日 · 三等质量",
    countLabel: "三体 · 严格周期",
    tag: "periodic-unstable",
    tagLabel: "周期但不稳定",
    caption:
      "同样的等边三角形，三颗质量都是 1。它仍是精确的周期解，但通不过 Routh 判据。很小的扰动就会让三角形解体。",
    dt: 0.002,
    stepsPerFrame: 10,
    defaultPerturbation: 0.004,
    perturbIndex: 2,
    supportsMassScale: false,
    coarseDt: 0.05,
    create: ({ perturbation }) => {
      const bodies = lagrange([1, 1, 1], 1);
      perturbVelocity(bodies, 2, perturbation);
      return bodies;
    },
  },
  {
    id: "chain4",
    title: "四体链编舞",
    countLabel: "四体 · 数值周期",
    tag: "periodic-unstable",
    tagLabel: "周期，已知不稳定",
    caption:
      "Simó 表 1 里的四体链：四颗等质量质点沿同一条三环曲线依次走过，周期取 2π。初值公开到大约 6 位有效数字。积分一个周期，位置能回到 10⁻⁴ 量级；再往后不稳定把截断误差放大，轨道离开曲线。它说明四体存在非多边形的周期解，这类高阶编舞目前没有被证明稳定的例子。",
    dt: 0.001,
    stepsPerFrame: 16,
    defaultPerturbation: 0,
    perturbIndex: 1,
    supportsMassScale: false,
    coarseDt: 0.05,
    create: ({ perturbation }) => {
      const bodies: Body[] = [
        {
          name: "甲",
          m: 1,
          x: 1.382857,
          y: 0,
          vx: 0,
          vy: 0.584873,
          color: "#f6d56a",
          drawR: 6,
        },
        {
          name: "乙",
          m: 1,
          x: 0,
          y: 0.15703,
          vx: 1.871935,
          vy: 0,
          color: "#79b8ff",
          drawR: 6,
        },
        {
          name: "丙",
          m: 1,
          x: -1.382857,
          y: 0,
          vx: 0,
          vy: -0.584873,
          color: "#8ee0d6",
          drawR: 6,
        },
        {
          name: "丁",
          m: 1,
          x: 0,
          y: -0.15703,
          vx: -1.871935,
          vy: 0,
          color: "#e07a4c",
          drawR: 6,
        },
      ];
      perturbVelocity(bodies, 1, perturbation);
      return bodies;
    },
  },
  {
    id: "pythagorean",
    title: "毕达哥拉斯三体",
    countLabel: "三体 · 混沌",
    tag: "chaotic",
    tagLabel: "混沌",
    caption:
      "质量 3、4、5 从静止出发，初始位置构成直角三角形。没有简单的周期，近距交会之后通常有一颗被抛出。步长要小，否则你看到的是积分器失真，不是天体力学。",
    dt: 0.0002,
    stepsPerFrame: 40,
    defaultPerturbation: 0,
    perturbIndex: 0,
    supportsMassScale: false,
    coarseDt: 0.002,
    create: ({ perturbation }) => {
      const bodies: Body[] = [
        {
          name: "3",
          m: 3,
          x: 1,
          y: 3,
          vx: 0,
          vy: 0,
          color: "#f6d56a",
          drawR: 7,
        },
        {
          name: "4",
          m: 4,
          x: -2,
          y: -1,
          vx: 0,
          vy: 0,
          color: "#79b8ff",
          drawR: 8,
        },
        {
          name: "5",
          m: 5,
          x: 1,
          y: -1,
          vx: 0,
          vy: 0,
          color: "#e07a4c",
          drawR: 9,
        },
      ];
      shiftToBarycenter(bodies);
      perturbVelocity(bodies, 0, perturbation);
      return bodies;
    },
  },
  {
    id: "kepler",
    title: "开普勒椭圆",
    countLabel: "二体 · 可积",
    tag: "integrable",
    tagLabel: "可积参照",
    caption:
      "二体问题有通解，椭圆应当闭合。把步长加到 0.22：速度 Verlet 的能量误差停在一条带子里，经典 RK4 的能量误差随圈数爬升。这里比的是积分器，不是新的轨道族。",
    dt: 0.02,
    stepsPerFrame: 8,
    defaultPerturbation: 0,
    perturbIndex: 1,
    supportsMassScale: false,
    coarseDt: 0.22,
    create: ({ perturbation }) => {
      const eccentricity = 0.45;
      const radius = 1 - eccentricity;
      const mu = 1 + 1e-6;
      const speed = Math.sqrt((mu * (1 + eccentricity)) / radius);
      const bodies: Body[] = [
        {
          name: "太阳",
          m: 1,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          color: "#f6d56a",
          drawR: 11,
        },
        {
          name: "行星",
          m: 1e-6,
          x: radius,
          y: 0,
          vx: 0,
          vy: speed,
          color: "#79b8ff",
          drawR: 5.5,
        },
      ];
      shiftToBarycenter(bodies);
      perturbVelocity(bodies, 1, perturbation);
      return bodies;
    },
  },
];

export function presetById(id: PresetId): Preset {
  return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}
