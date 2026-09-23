"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  INTEGRATORS,
  integratorInfo,
  stepBodies,
  type IntegratorId,
} from "@/lib/nbody/integrators";
import {
  accelerations,
  angularMomentum,
  cloneBodies,
  energy,
  minSeparation,
  type Body,
} from "@/lib/nbody/physics";
import {
  PRESETS,
  presetById,
  type Preset,
  type PresetId,
  type StabilityTag,
} from "@/lib/nbody/presets";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

type Sim = {
  bodies: Body[];
  ghost: Body[];
  trails: Point[][];
  ghostTrails: Point[][];
  t: number;
  steps: number;
  e0: number;
  l0: number;
  hist: number[];
  minSep: number;
  span0: number;
  span: number;
  exploded: boolean;
};

type Hud = {
  t: number;
  steps: number;
  energy: number;
  eRel: number;
  lRel: number;
  minSep: number;
  sampleName: string;
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  formulaLine: number;
  exploded: boolean;
  pairs: number;
};

const TAG_CLASS: Record<StabilityTag, string> = {
  practical: "text-primary",
  "periodic-stable": "text-primary",
  "periodic-unstable": "text-gold",
  chaotic: "text-destructive",
  integrable: "text-muted-foreground",
};

function sceneSpan(bodies: readonly Body[]) {
  let span = 0.35;
  for (const body of bodies) span = Math.max(span, Math.hypot(body.x, body.y));
  return span * 1.28;
}

function createSim(preset: Preset, perturbation: number, massScale: number): Sim {
  const bodies = preset.create({ perturbation, massScale });
  const ghost = cloneBodies(bodies);
  const index = Math.min(preset.perturbIndex, ghost.length - 1);
  ghost[index].x += 0.012;
  const span = sceneSpan(bodies);
  return {
    bodies,
    ghost,
    trails: bodies.map(() => []),
    ghostTrails: ghost.map(() => []),
    t: 0,
    steps: 0,
    e0: energy(bodies),
    l0: angularMomentum(bodies),
    hist: [],
    minSep: minSeparation(bodies),
    span0: span,
    span,
    exploded: false,
  };
}

function readHud(sim: Sim, preset: Preset, formulaLine: number): Hud {
  const index = Math.min(preset.perturbIndex, sim.bodies.length - 1);
  const body = sim.bodies[index];
  const a = sim.exploded ? [{ x: 0, y: 0 }] : accelerations(sim.bodies);
  const acc = a[index] ?? { x: 0, y: 0 };
  const e = sim.exploded ? Number.NaN : energy(sim.bodies);
  const l = sim.exploded ? Number.NaN : angularMomentum(sim.bodies);
  const n = sim.bodies.length;
  return {
    t: sim.t,
    steps: sim.steps,
    energy: e,
    eRel: Math.abs(sim.e0) > 0 ? (e - sim.e0) / Math.abs(sim.e0) : e - sim.e0,
    lRel: Math.abs(sim.l0) > 1e-12 ? (l - sim.l0) / Math.abs(sim.l0) : l - sim.l0,
    minSep: sim.minSep,
    sampleName: body?.name ?? "—",
    rx: body?.x ?? 0,
    ry: body?.y ?? 0,
    vx: body?.vx ?? 0,
    vy: body?.vy ?? 0,
    ax: acc.x,
    ay: acc.y,
    formulaLine,
    exploded: sim.exploded,
    pairs: (n * (n - 1)) / 2,
  };
}

function fmt(value: number, digits = 4) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 1e-3 || abs >= 1e4)) return value.toExponential(3);
  return value.toFixed(digits);
}

function withAlpha(hex: string, alpha: number) {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pushTrail(trail: Point[], x: number, y: number, cap: number) {
  trail.push({ x, y });
  if (trail.length > cap) trail.splice(0, trail.length - cap);
}

function finiteBodies(bodies: readonly Body[]) {
  return bodies.every(
    (body) =>
      Number.isFinite(body.x) &&
      Number.isFinite(body.y) &&
      Number.isFinite(body.vx) &&
      Number.isFinite(body.vy),
  );
}

export function NBodyLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [presetId, setPresetId] = useState<PresetId>("solar");
  const [method, setMethod] = useState<IntegratorId>("verlet");
  const [dt, setDt] = useState(PRESETS[0].dt);
  const [stepsPerFrame, setStepsPerFrame] = useState(PRESETS[0].stepsPerFrame);
  const [perturbation, setPerturbation] = useState(PRESETS[0].defaultPerturbation);
  const [perturbDraft, setPerturbDraft] = useState(PRESETS[0].defaultPerturbation);
  const [massScale, setMassScale] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [showGhost, setShowGhost] = useState(true);
  const [showAccel, setShowAccel] = useState(true);
  const [epoch, setEpoch] = useState(0);
  const [hud, setHud] = useState<Hud>(() =>
    readHud(createSim(PRESETS[0], PRESETS[0].defaultPerturbation, 1), PRESETS[0], 0),
  );

  const simRef = useRef<Sim>(createSim(PRESETS[0], PRESETS[0].defaultPerturbation, 1));
  const presetRef = useRef(PRESETS[0]);
  const lineRef = useRef(0);
  const controls = useRef({
    playing,
    method,
    dt,
    stepsPerFrame,
    showGhost,
    showAccel,
  });

  useEffect(() => {
    controls.current = { playing, method, dt, stepsPerFrame, showGhost, showAccel };
  }, [playing, method, dt, stepsPerFrame, showGhost, showAccel]);

  useEffect(() => {
    const preset = presetById(presetId);
    presetRef.current = preset;
    simRef.current = createSim(preset, perturbation, massScale);
    lineRef.current = 0;
  }, [presetId, perturbation, massScale, method, epoch]);

  useEffect(() => {
    let frame = 0;
    let lastUi = 0;

    const draw = () => {
      const canvas = canvasRef.current;
      const sim = simRef.current;
      if (!canvas || !sim) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#071018";
      ctx.fillRect(0, 0, width, height);
      const uiFont = getComputedStyle(document.body).fontFamily || "sans-serif";

      let maxR = sim.span0 / 1.28;
      for (const body of sim.bodies) maxR = Math.max(maxR, Math.hypot(body.x, body.y));
      const target = Math.max(sim.span0, maxR * 1.35);
      sim.span += (target - sim.span) * 0.05;
      const scale = (0.46 * Math.min(width, height)) / sim.span;
      const cx = width / 2;
      const cy = height / 2;
      const X = (x: number) => cx + x * scale;
      const Y = (y: number) => cy - y * scale;

      ctx.save();
      ctx.strokeStyle = "rgba(126, 231, 209, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * (sim.span0 / 1.28), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const paintTrail = (trails: Point[][], bodies: Body[], alpha: number, widthPx: number) => {
        trails.forEach((trail, index) => {
          if (trail.length < 2) return;
          ctx.beginPath();
          ctx.strokeStyle = withAlpha(bodies[index].color, alpha);
          ctx.lineWidth = widthPx;
          ctx.moveTo(X(trail[0].x), Y(trail[0].y));
          for (let i = 1; i < trail.length; i++) ctx.lineTo(X(trail[i].x), Y(trail[i].y));
          ctx.stroke();
        });
      };

      if (controls.current.showGhost) paintTrail(sim.ghostTrails, sim.ghost, 0.28, 1);
      paintTrail(sim.trails, sim.bodies, 0.8, 1.6);

      if (controls.current.showAccel && !sim.exploded) {
        const acc = accelerations(sim.bodies);
        let maxA = 1e-8;
        for (const a of acc) maxA = Math.max(maxA, Math.hypot(a.x, a.y));
        acc.forEach((a, index) => {
          const body = sim.bodies[index];
          const len = (Math.hypot(a.x, a.y) / maxA) * 42;
          const ang = Math.atan2(-a.y, a.x);
          const x0 = X(body.x);
          const y0 = Y(body.y);
          ctx.strokeStyle = "rgba(246, 213, 106, 0.85)";
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len);
          ctx.stroke();
        });
      }

      const paintBody = (body: Body, open: boolean) => {
        const x = X(body.x);
        const y = Y(body.y);
        const heavy = body.m > 0.2;
        if (!open && heavy) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, body.drawR * 3.2);
          glow.addColorStop(0, withAlpha(body.color, 0.9));
          glow.addColorStop(1, withAlpha(body.color, 0));
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, body.drawR * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, open ? body.drawR * 0.7 : body.drawR, 0, Math.PI * 2);
        if (open) {
          ctx.strokeStyle = withAlpha(body.color, 0.7);
          ctx.lineWidth = 1.25;
          ctx.stroke();
        } else {
          ctx.fillStyle = body.color;
          ctx.fill();
        }
        if (!open) {
          ctx.fillStyle = "rgba(248, 244, 230, 0.88)";
          ctx.font = `12px ${uiFont}`;
          ctx.fillText(body.name, x + body.drawR + 4, y - body.drawR - 2);
        }
      };

      if (controls.current.showGhost) sim.ghost.forEach((body) => paintBody(body, true));
      sim.bodies.forEach((body) => paintBody(body, false));

      const info = integratorInfo(controls.current.method);
      ctx.fillStyle = "rgba(248, 244, 230, 0.9)";
      ctx.font = `13px ${uiFont}`;
      ctx.fillText(`${info.name} · ${info.order}`, 16, 24);
      ctx.fillStyle = info.symplectic ? "rgba(126, 231, 209, 0.95)" : "rgba(240, 160, 122, 0.95)";
      ctx.fillText(info.symplectic ? "辛格式" : "非辛格式", 16, 42);
      ctx.fillStyle = "rgba(201, 212, 229, 0.8)";
      ctx.font = `12px ${uiFont}`;
      ctx.fillText(
        `步 ${sim.steps}    t = ${fmt(sim.t)}    Δt = ${fmt(controls.current.dt)}`,
        16,
        height - 16,
      );
    };

    const drawChart = () => {
      const canvas = chartRef.current;
      const sim = simRef.current;
      if (!canvas || !sim) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(201, 212, 229, 0.25)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      const hist = sim.hist;
      if (hist.length < 2) return;
      let peak = 1e-8;
      for (const value of hist) peak = Math.max(peak, Math.abs(value));
      ctx.beginPath();
      ctx.strokeStyle = "#7ee7d1";
      ctx.lineWidth = 1.5;
      hist.forEach((value, index) => {
        const x = (index / (hist.length - 1)) * width;
        const y = height / 2 - (value / (peak * 1.15)) * (height / 2);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    const loop = (now: number) => {
      const sim = simRef.current;
      const preset = presetRef.current;
      if (sim && controls.current.playing && !sim.exploded) {
        const substeps = controls.current.stepsPerFrame;
        const h = controls.current.dt;
        const methodId = controls.current.method;
        const cap = Math.min(4000, Math.max(900, Math.round(10 / Math.max(h, 1e-6))));
        for (let i = 0; i < substeps; i++) {
          stepBodies(sim.bodies, h, methodId);
          stepBodies(sim.ghost, h, methodId);
          sim.t += h;
          sim.steps += 1;
          if (sim.steps % 2 === 0) {
            sim.bodies.forEach((body, index) => pushTrail(sim.trails[index], body.x, body.y, cap));
            sim.ghost.forEach((body, index) =>
              pushTrail(sim.ghostTrails[index], body.x, body.y, cap),
            );
          }
          if (!finiteBodies(sim.bodies)) {
            sim.exploded = true;
            break;
          }
        }
        if (!sim.exploded) {
          const e = energy(sim.bodies);
          sim.hist.push((e - sim.e0) / Math.max(Math.abs(sim.e0), 1e-12));
          if (sim.hist.length > 280) sim.hist.shift();
          sim.minSep = minSeparation(sim.bodies);
        }
        lineRef.current = (lineRef.current + 1) % integratorInfo(methodId).lines.length;
      }
      draw();
      drawChart();
      if (now - lastUi > 140 && sim) {
        lastUi = now;
        setHud(readHud(sim, preset, lineRef.current));
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const preset = presetById(presetId);
  const info = integratorInfo(method);

  const selectPreset = (id: PresetId) => {
    const next = presetById(id);
    setPresetId(id);
    setDt(next.dt);
    setStepsPerFrame(next.stepsPerFrame);
    setPerturbation(next.defaultPerturbation);
    setPerturbDraft(next.defaultPerturbation);
    setMassScale(1);
    setPlaying(true);
  };

  const singleStep = () => {
    controls.current.playing = false;
    setPlaying(false);
    const sim = simRef.current;
    if (!sim || sim.exploded) return;
    stepBodies(sim.bodies, controls.current.dt, controls.current.method);
    stepBodies(sim.ghost, controls.current.dt, controls.current.method);
    sim.t += controls.current.dt;
    sim.steps += 1;
    sim.bodies.forEach((body, index) => pushTrail(sim.trails[index], body.x, body.y, 4000));
    if (!finiteBodies(sim.bodies)) sim.exploded = true;
    else {
      const e = energy(sim.bodies);
      sim.hist.push((e - sim.e0) / Math.max(Math.abs(sim.e0), 1e-12));
      sim.minSep = minSeparation(sim.bodies);
    }
    lineRef.current = (lineRef.current + 1) % info.lines.length;
    setHud(readHud(sim, presetRef.current, lineRef.current));
  };

  const coarse = Math.abs(dt - preset.coarseDt) < preset.coarseDt * 0.05;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-3">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-[#071018]">
          <canvas
            ref={canvasRef}
            className="h-[440px] w-full sm:h-[560px]"
            aria-label="N 体轨道动画，显示当前积分器"
          />
        </div>
        <div className="rounded-xl border border-border/80 bg-card/70 px-4 py-3">
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-heading text-lg font-semibold">{preset.title}</h3>
            <span className={cn("font-sans text-xs font-medium", TAG_CLASS[preset.tag])}>
              {preset.tagLabel}
            </span>
            <span className="font-sans text-xs text-muted-foreground">{preset.countLabel}</span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">{preset.caption}</p>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-xl border border-border/80 bg-card/80 p-3">
          <p className="mb-2 font-sans text-xs tracking-wide text-muted-foreground">轨道</p>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESETS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPreset(item.id)}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-left font-sans text-xs leading-tight transition-colors",
                  item.id === presetId
                    ? "border-primary/70 bg-primary/15 text-foreground"
                    : "border-border/80 text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="block font-medium text-foreground">{item.title}</span>
                <span className={TAG_CLASS[item.tag]}>{item.tagLabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3">
          <p className="mb-2 font-sans text-xs tracking-wide text-muted-foreground">积分器</p>
          <div className="grid grid-cols-2 gap-1.5">
            {INTEGRATORS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMethod(item.id);
                  setPlaying(true);
                }}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-left font-sans text-xs",
                  item.id === method
                    ? "border-primary/70 bg-primary/15"
                    : "border-border/80 text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="block font-medium text-foreground">{item.name}</span>
                <span>
                  {item.order} · {item.symplectic ? "辛" : "非辛"}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground">{info.summary}</p>
          <ol className="mt-2 space-y-1 rounded-lg bg-[#071018] p-2 font-mono text-[11px] leading-relaxed text-[#d5efe8]">
            {info.lines.map((line, index) => (
              <li
                key={`${index}-${line}`}
                className={cn(
                  "rounded px-1.5 py-0.5",
                  hud.formulaLine === index && playing ? "bg-primary/20 text-primary" : "",
                )}
              >
                {index + 1}. {line}
              </li>
            ))}
          </ol>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
            抽样 {hud.sampleName}
            <br />
            r = ({fmt(hud.rx)}, {fmt(hud.ry)})
            <br />
            v = ({fmt(hud.vx)}, {fmt(hud.vy)})
            <br />a = ({fmt(hud.ax)}, {fmt(hud.ay)})
            <br />
            本步牛顿求和 {hud.pairs} 对
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3 font-mono text-[11px] leading-relaxed">
          <div className="flex items-end justify-between gap-2">
            <span className="font-sans text-xs text-muted-foreground">ΔE / |E₀|</span>
            <span className={cn(Math.abs(hud.eRel) > 1e-2 ? "text-gold" : "text-primary")}>
              {fmt(hud.eRel, 3)}
            </span>
          </div>
          <canvas ref={chartRef} className="mt-1 h-16 w-full" aria-label="相对能量误差曲线" />
          <p className="mt-1 text-muted-foreground">
            E = {fmt(hud.energy)} · ΔL/|L₀| = {fmt(hud.lRel, 3)}
            <br />
            最近距离 {fmt(hud.minSep)} · t = {fmt(hud.t)}
          </p>
          {hud.exploded ? (
            <p className="mt-1 text-destructive">步长把轨道积炸了。重置，或把 Δt 调小。</p>
          ) : Math.abs(hud.eRel) > 0.05 ? (
            <p className="mt-1 text-gold">
              能量误差已经不小。近距交会或粗步长都会让固定步长失真。
            </p>
          ) : null}
        </div>

        <div className="space-y-2 rounded-xl border border-border/80 bg-card/80 p-3">
          <div className="flex flex-wrap gap-1.5">
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const next = !controls.current.playing;
                controls.current.playing = next;
                setPlaying(next);
              }}
            >
              {playing ? <Pause /> : <Play />}
              {playing ? "暂停" : "播放"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                controls.current.playing = true;
                setPlaying(true);
                setPerturbation(perturbDraft);
                setEpoch((value) => value + 1);
              }}
            >
              <RotateCcw />
              重置
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={singleStep}>
              <StepForward />
              单步
            </Button>
          </div>
          <label className="block font-sans text-xs text-muted-foreground">
            步长 Δt = {fmt(dt)}
            <input
              className="mt-1 w-full accent-primary"
              type="range"
              min={-4}
              max={-0.52}
              step={0.01}
              value={Math.min(-0.52, Math.max(-4, Math.log10(dt)))}
              onChange={(event) => setDt(10 ** Number(event.target.value))}
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            <Button
              type="button"
              size="sm"
              variant={coarse ? "default" : "outline"}
              onClick={() => setDt(preset.coarseDt)}
            >
              粗步长 {fmt(preset.coarseDt)}
            </Button>
            {[1, 8, 24, 80].map((count) => (
              <Button
                key={count}
                type="button"
                size="sm"
                variant={stepsPerFrame === count ? "default" : "outline"}
                onClick={() => setStepsPerFrame(count)}
              >
                {count === 1 ? "慢放" : `×${count}`}
              </Button>
            ))}
          </div>
          <label className="block font-sans text-xs text-muted-foreground">
            速度扰动 {(perturbDraft * 100).toFixed(1)}%
            <input
              className="mt-1 w-full accent-primary"
              type="range"
              min={0}
              max={0.02}
              step={0.001}
              value={perturbDraft}
              onChange={(event) => setPerturbDraft(Number(event.target.value))}
              onPointerUp={(event) => setPerturbation(Number(event.currentTarget.value))}
            />
          </label>
          {preset.supportsMassScale ? (
            <div className="flex flex-wrap gap-1.5">
              {[1, 5, 20].map((scale) => (
                <Button
                  key={scale}
                  type="button"
                  size="sm"
                  variant={massScale === scale ? "default" : "outline"}
                  onClick={() => setMassScale(scale)}
                >
                  行星质量 ×{scale}
                </Button>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-1.5">
            <Button
              type="button"
              size="sm"
              variant={showAccel ? "default" : "outline"}
              onClick={() => setShowAccel((value) => !value)}
            >
              加速度
            </Button>
            <Button
              type="button"
              size="sm"
              variant={showGhost ? "default" : "outline"}
              onClick={() => setShowGhost((value) => !value)}
            >
              邻近轨道
            </Button>
          </div>
          <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
            浅色空心点是把一颗星的位置挪开 0.012 的邻近轨道。切换积分器会从同一初值重开。金色短线是当前加速度。
          </p>
        </div>
      </aside>
    </div>
  );
}
