import { braidedRing, hiphopEven, liao3, type Body3 } from "@/lib/nbody/spatial";

export type OrbitFamilyId = "liao" | "hiphop" | "ring";

export type SpatialPreset = {
  id: string;
  family: OrbitFamilyId;
  title: string;
  tag: string;
  period: number;
  dt: number;
  stepsPerFrame: number;
  caption: string;
  create: () => Body3[];
};

export const ORBIT_FAMILIES: { id: OrbitFamilyId; title: string; note: string }[] = [
  { id: "hiphop", title: "Hip-hop", note: "10 条" },
  { id: "ring", title: "编织环", note: "10 条" },
  { id: "liao", title: "三体空间", note: "李–廖" },
];

export const SPATIAL_PRESETS: SpatialPreset[] = [
  {
    id: "o3",
    family: "liao",
    title: "三体 O₃(1)",
    tag: "线性稳定",
    period: 6.831622036284445,
    dt: 0.002,
    stepsPerFrame: 18,
    caption:
      "李晓明、廖世俊 2025 年给出的等质量三维周期轨道，周期约 6.832。三颗质量都是 1。屏幕上的步长是 0.002，用四阶辛格式积一个周期，位置误差约 4×10⁻⁴；步长收到 10⁻⁴ 时约 10⁻⁵。他们用 Floquet 理论判断它线性稳定。轨迹明显离开初始平面。",
    create: () =>
      liao3({
        m3: 1,
        z0: 0.47687826428031155,
        vx: 0.40213691007472375,
        vy: 0.18035695128625866,
        vz: 0.21044512813787312,
      }),
  },
  {
    id: "o2",
    family: "liao",
    title: "三体 O₂(1.2)",
    tag: "起伏更大",
    period: 6.9057763983,
    dt: 0.002,
    stepsPerFrame: 18,
    caption:
      "同一篇表里的 O₂(1.2)：第三颗质量是 1.2，初始高度已经和水平间距相当。周期约 6.906。屏幕步长 0.002 时，一个周期的位置误差约 2×10⁻⁴。论文把它标成线性不稳定，所以多转几圈之后邻近误差会被放大。",
    create: () =>
      liao3({
        m3: 1.2,
        z0: 1.0220057827,
        vx: -0.27260000746,
        vy: -0.43209371195,
        vz: 0.62947340717,
      }),
  },
  {
    id: "choreo",
    family: "liao",
    title: "三体空间编舞",
    tag: "线性稳定 · 共轨",
    period: 82.638396171,
    dt: 0.001,
    stepsPerFrame: 80,
    caption:
      "O₂₃₁(1)：三颗等质量质点沿同一条空间闭曲线追逐，是三维编舞。周期约 82.64，论文标为线性稳定。屏幕步长 0.001 时，一圈的位置误差约 5×10⁻⁴；步长收到 2×10⁻⁴ 时约 10⁻⁶。它比平面八字舞长得多，拖慢一点才能看清整圈。",
    create: () =>
      liao3({
        m3: 1,
        z0: 0.13449345804,
        vx: 0.33746407711,
        vy: 0.53495391505,
        vz: 0.0017586983,
      }),
  },
  {
    id: "piano",
    family: "liao",
    title: "钢琴三重奏",
    tag: "两轨",
    period: 7.97434884,
    dt: 0.0005,
    stepsPerFrame: 72,
    caption:
      "O₆(0.6)：两颗质量为 1 的星走同一条空间曲线，质量 0.6 的第三颗走另一条。李和廖把这类轨道叫做钢琴三重奏。周期约 7.97。最近距离大约 0.035，步长太大就会在交会处偏掉。屏幕步长 5×10⁻⁴ 时，一个周期的位置误差约 3×10⁻⁴。论文把它标成线性不稳定。",
    create: () =>
      liao3({
        m3: 0.6,
        z0: 0.61460435884,
        vx: 0.10381048232,
        vy: 0.07249463323,
        vz: 0.058966905104,
        names: ["甲", "乙", "丙"],
      }),
  },
];

function pace(period: number, dt: number) {
  const frames = 140;
  return { dt, stepsPerFrame: Math.max(1, Math.round(period / frames / dt)) };
}

const HIPHOP_CASES: SpatialPreset[] = [
  hip(4, 0.695, 0.655, 5.82, "0.8%", "四体 · 较扁"),
  hip(4, 0.8030883079132425, 0.7445, 9.706, "0.6%", "四体 · 更高"),
  hip(6, 1.0344002578598739, 1.066, 6.194, "1.0%", "六体"),
  hip(8, 1.551786969300826, 0.6325, 11.243, "1.1%", "八体"),
  hip(10, 1.8387804887425911, 0.6035, 3.054, "0.3%", "十体"),
  hip(12, 2.0631764660371896, 1.024, 3.074, "0.2%", "十二体"),
  hip(14, 3.133096764150113, 0.238, 10.119, "0.3%", "十四体"),
  hip(16, 2.9187257212490834, 0.5825, 3.229, "0.6%", "十六体"),
  hip(18, 2.790296660774993, 0.9635, 2.159, "0.2%", "十八体"),
  hip(20, 2.692254690847117, 1.204, 1.665, "2.9%", "二十体"),
];

function hip(count: number, vt: number, vz: number, period: number, closure: string, tag: string): SpatialPreset {
  const timing = pace(period, count >= 16 ? 8e-4 : 1e-3);
  return {
    id: `hip-${count}-${vz.toFixed(3)}`,
    family: "hiphop",
    title: `${count} 体 hip-hop`,
    tag,
    period,
    ...timing,
    caption: `等质量 ${count} 体，排成正 ${count} 边形，相邻质点的垂直速度相反，切向速度 ${vt.toFixed(3)}。这是 Chenciner–Venturelli / Terracini–Venturelli 的 hip-hop 对称性：形状在扁平多边形和反棱柱之间起伏。Yoshida 4 积一个周期（约 ${period.toFixed(2)}），位置和速度一起量的误差约 ${closure}。${closure.startsWith("2") ? "这条误差更大，多转几圈会漂。" : "多转几圈仍会慢慢离开，文献里这族解通常不稳定。"}`,
    create: () => hiphopEven(count, vt, vz),
  };
}

const RING_CASES: SpatialPreset[] = [
  ring(4, 72, 0.2, 1.012, 0.7476, "0.3%"),
  ring(4, 72, 0.4, 1.004, 0.7297, "0.5%"),
  ring(6, 162, 0.22, 1.02, 0.5127, "0.8%"),
  ring(6, 162, 0.42, 0.98, 0.4559, "0.9%"),
  ring(8, 288, 0.24, 1.02, 0.3858, "1.1%"),
  ring(8, 288, 0.42, 1.028, 0.3956, "1.3%"),
  ring(10, 2000, 0.22, 0.996, 0.1383, "0.5%"),
  ring(12, 2800, 0.22, 1.026, 0.12828, "0.3%"),
  ring(14, 3600, 0.2, 0.996, 0.10312, "0.4%"),
  ring(16, 4000, 0.2, 1.005, 0.10047, "0.4%"),
];

function ring(
  nSat: number,
  mass: number,
  inclination: number,
  vScale: number,
  period: number,
  closure: string,
): SpatialPreset {
  const timing = pace(period, Math.min(2.5e-4, period / 1800));
  return {
    id: `ring-${nSat}-${inclination.toFixed(2)}`,
    family: "ring",
    title: `${nSat + 1} 体编织环`,
    tag: `${nSat} 颗卫星`,
    period,
    ...timing,
    caption: `中心质量 ${mass}，${nSat} 颗质量为 1 的卫星在单位圆上，相邻卫星的倾角相反（约 ${((inclination * 180) / Math.PI).toFixed(0)}°）。这是 Meyer–Schmidt 的交错环：中心很重时，卫星各自接近开普勒圆，上下错开。速度是开普勒圆速度的 ${vScale.toFixed(3)} 倍。一个周期约 ${period.toFixed(3)}，Yoshida 4 的状态误差约 ${closure}。`,
    create: () => braidedRing(nSat, mass, inclination, vScale),
  };
}

SPATIAL_PRESETS.push(...HIPHOP_CASES, ...RING_CASES);

export function spatialPresetById(id: string) {
  return SPATIAL_PRESETS.find((preset) => preset.id === id) ?? SPATIAL_PRESETS[0];
}

export function presetsInFamily(family: OrbitFamilyId) {
  return SPATIAL_PRESETS.filter((preset) => preset.family === family);
}
