"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  accelerations3,
  energy3,
  minSeparation3,
  step3,
  type Body3,
  type Integrator3,
} from "@/lib/nbody/spatial";
import {
  ORBIT_FAMILIES,
  presetsInFamily,
  spatialPresetById,
  type OrbitFamilyId,
  type SpatialPreset,
} from "@/lib/nbody/spatial-presets";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number; z: number };

type Sim = {
  bodies: Body3[];
  trails: Point[][];
  t: number;
  steps: number;
  e0: number;
  hist: number[];
  span: number;
  exploded: boolean;
};

const METHODS: { id: Integrator3; name: string; note: string }[] = [
  { id: "verlet", name: "速度 Verlet", note: "2 阶辛格式" },
  { id: "yoshida", name: "Yoshida 4", note: "4 阶辛格式" },
  { id: "rk4", name: "经典 RK4", note: "4 阶，非辛" },
];

function createSim(preset: SpatialPreset): Sim {
  const bodies = preset.create();
  let span = 0.8;
  for (const body of bodies) span = Math.max(span, Math.hypot(body.x, body.y, body.z));
  return {
    bodies,
    trails: bodies.map((body) => [{ x: body.x, y: body.y, z: body.z }]),
    t: 0,
    steps: 0,
    e0: energy3(bodies),
    hist: [],
    span: span * 1.35,
    exploded: false,
  };
}

function fmt(value: number) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 1e-3 || abs >= 1e4)) return value.toExponential(2);
  return value.toFixed(4);
}

function withAlpha(hex: string, alpha: number) {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function finite(bodies: readonly Body3[]) {
  return bodies.every((body) =>
    [body.x, body.y, body.z, body.vx, body.vy, body.vz].every(Number.isFinite),
  );
}

const INITIAL_PRESET = presetsInFamily("hiphop")[0];

export function SpatialLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [family, setFamily] = useState<OrbitFamilyId>("hiphop");
  const [presetId, setPresetId] = useState(INITIAL_PRESET.id);
  const [method, setMethod] = useState<Integrator3>("yoshida");
  const [playing, setPlaying] = useState(true);
  const [dt, setDt] = useState(INITIAL_PRESET.dt);
  const [stepsPerFrame, setStepsPerFrame] = useState(INITIAL_PRESET.stepsPerFrame);
  const [epoch, setEpoch] = useState(0);
  const [hud, setHud] = useState({
    t: 0,
    steps: 0,
    eRel: 0,
    maxZ: 0,
    sep: 1,
    name: "1",
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    ax: 0,
    ay: 0,
    az: 0,
  });

  const simRef = useRef<Sim>(createSim(INITIAL_PRESET));
  const controls = useRef({
    playing,
    method,
    dt,
    stepsPerFrame,
  });
  const camera = useRef({ yaw: 0.5, pitch: 0.62, zoom: 1 });
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  useEffect(() => {
    controls.current = { playing, method, dt, stepsPerFrame };
  }, [playing, method, dt, stepsPerFrame]);

  useEffect(() => {
    simRef.current = createSim(spatialPresetById(presetId));
  }, [presetId, method, epoch]);

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

      let reach = 0.6;
      for (const body of sim.bodies) reach = Math.max(reach, Math.hypot(body.x, body.y, body.z));
      sim.span += (Math.max(sim.span * 0.35, reach * 1.45) - sim.span) * 0.04;

      if (!drag.current) camera.current.yaw += 0.004;
      const { yaw, pitch, zoom } = camera.current;
      const dist = (sim.span * 3.3) / zoom;
      const focal = Math.min(width, height) * 0.92;

      const project = (x: number, y: number, z: number) => {
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);
        const x1 = cy * x + sy * y;
        const y1 = -sy * x + cy * y;
        const y2 = cp * y1 - sp * z;
        const z2 = sp * y1 + cp * z;
        const depth = dist - z2;
        return {
          sx: width / 2 + (x1 * focal) / depth,
          sy: height / 2 - (y2 * focal) / depth,
          depth,
        };
      };

      ctx.strokeStyle = "rgba(126, 231, 209, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        const p = project(Math.cos(theta) * sim.span * 0.72, Math.sin(theta) * sim.span * 0.72, 0);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();

      const origin = project(0, 0, 0);
      const top = project(0, 0, sim.span * 0.85);
      ctx.strokeStyle = "rgba(246, 213, 106, 0.7)";
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(top.sx, top.sy);
      ctx.stroke();
      ctx.fillStyle = "rgba(246, 213, 106, 0.85)";
      ctx.font = "12px sans-serif";
      ctx.fillText("z", top.sx + 6, top.sy);

      const paintTrail = (trail: Point[], color: string) => {
        if (trail.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = withAlpha(color, 0.8);
        ctx.lineWidth = 1.5;
        trail.forEach((point, index) => {
          const p = project(point.x, point.y, point.z);
          if (index === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.stroke();
      };
      sim.trails.forEach((trail, index) => paintTrail(trail, sim.bodies[index].color));

      const order = sim.bodies.map((body, index) => ({ body, index, depth: project(body.x, body.y, body.z).depth }));
      order.sort((a, b) => b.depth - a.depth);
      for (const item of order) {
        const p = project(item.body.x, item.body.y, item.body.z);
        const radius = item.body.drawR * (focal / p.depth) * 0.018;
        ctx.beginPath();
        ctx.fillStyle = item.body.color;
        ctx.arc(p.sx, p.sy, Math.max(3, radius), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(248, 244, 230, 0.9)";
        ctx.fillText(item.body.name, p.sx + radius + 4, p.sy - radius);
      }

      const info = METHODS.find((item) => item.id === controls.current.method) ?? METHODS[1];
      ctx.fillStyle = "rgba(248, 244, 230, 0.92)";
      ctx.font = "13px sans-serif";
      ctx.fillText(`${info.name} · ${info.note}`, 16, 24);
      ctx.fillStyle = "rgba(201, 212, 229, 0.8)";
      ctx.font = "12px sans-serif";
      ctx.fillText(`步 ${sim.steps}    t = ${fmt(sim.t)}    Δt = ${fmt(controls.current.dt)}`, 16, height - 16);
    };

    const loop = (now: number) => {
      const sim = simRef.current;
      if (sim && controls.current.playing && !sim.exploded) {
        const cap = 1800;
        for (let i = 0; i < controls.current.stepsPerFrame; i++) {
          step3(sim.bodies, controls.current.dt, controls.current.method);
          sim.t += controls.current.dt;
          sim.steps += 1;
          if (sim.steps % 2 === 0) {
            sim.bodies.forEach((body, index) => {
              const trail = sim.trails[index];
              trail.push({ x: body.x, y: body.y, z: body.z });
              if (trail.length > cap) trail.splice(0, trail.length - cap);
            });
          }
          if (!finite(sim.bodies)) {
            sim.exploded = true;
            break;
          }
        }
        if (!sim.exploded) {
          const e = energy3(sim.bodies);
          sim.hist.push((e - sim.e0) / Math.max(Math.abs(sim.e0), 1e-12));
          if (sim.hist.length > 240) sim.hist.shift();
        }
      }
      draw();
      if (now - lastUi > 140 && sim) {
        lastUi = now;
        let maxZ = 0;
        for (const body of sim.bodies) maxZ = Math.max(maxZ, Math.abs(body.z));
        const e = sim.exploded ? Number.NaN : energy3(sim.bodies);
        const sample = sim.bodies[0];
        const acc = sim.exploded ? undefined : accelerations3(sim.bodies)[0];
        setHud({
          t: sim.t,
          steps: sim.steps,
          eRel: (e - sim.e0) / Math.max(Math.abs(sim.e0), 1e-12),
          maxZ,
          sep: sim.exploded ? Number.NaN : minSeparation3(sim.bodies),
          name: sample?.name ?? "",
          z: sample?.z ?? 0,
          vx: sample?.vx ?? 0,
          vy: sample?.vy ?? 0,
          vz: sample?.vz ?? 0,
          ax: acc?.x ?? 0,
          ay: acc?.y ?? 0,
          az: acc?.z ?? 0,
        });
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const preset = spatialPresetById(presetId);

  const selectPreset = (id: string) => {
    const next = spatialPresetById(id);
    setFamily(next.family);
    setPresetId(id);
    setDt(next.dt);
    setStepsPerFrame(next.stepsPerFrame);
    controls.current.playing = true;
    setPlaying(true);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-3">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-[#071018]">
          <canvas
            ref={canvasRef}
            className="h-[440px] w-full touch-none sm:h-[560px]"
            aria-label="三维 N 体周期轨道，可拖拽旋转"
            onPointerDown={(event) => {
              drag.current = {
                x: event.clientX,
                y: event.clientY,
                yaw: camera.current.yaw,
                pitch: camera.current.pitch,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!drag.current) return;
              camera.current.yaw = drag.current.yaw + (event.clientX - drag.current.x) * 0.008;
              const pitch = drag.current.pitch + (event.clientY - drag.current.y) * 0.006;
              camera.current.pitch = Math.max(-1.15, Math.min(1.15, pitch));
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onWheel={(event) => {
              camera.current.zoom = Math.max(0.45, Math.min(2.6, camera.current.zoom * (event.deltaY > 0 ? 0.92 : 1.08)));
            }}
          />
        </div>
        <div className="rounded-xl border border-border/80 bg-card/70 px-4 py-3">
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-heading text-lg font-semibold">{preset.title}</h3>
            <span className="font-sans text-xs font-medium text-primary">{preset.tag}</span>
            <span className="font-sans text-xs text-muted-foreground">周期约 {preset.period.toFixed(2)}</span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">{preset.caption}</p>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-xl border border-border/80 bg-card/80 p-3">
          <p className="mb-2 font-sans text-xs tracking-wide text-muted-foreground">轨道族</p>
          <div className="mb-2 grid grid-cols-3 gap-1">
            {ORBIT_FAMILIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPreset(presetsInFamily(item.id)[0].id)}
                className={cn(
                  "rounded-lg border px-1.5 py-1.5 text-left font-sans text-[11px]",
                  item.id === family
                    ? "border-primary/70 bg-primary/15"
                    : "border-border/80 text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="block font-medium text-foreground">{item.title}</span>
                <span>{item.note}</span>
              </button>
            ))}
          </div>
          <div className="grid max-h-72 gap-1.5 overflow-y-auto pr-1">
            {presetsInFamily(family).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPreset(item.id)}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-left font-sans text-xs",
                  item.id === presetId
                    ? "border-primary/70 bg-primary/15"
                    : "border-border/80 text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="block font-medium text-foreground">{item.title}</span>
                <span>{item.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3">
          <p className="mb-2 font-sans text-xs tracking-wide text-muted-foreground">积分器</p>
          <div className="grid gap-1.5">
            {METHODS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMethod(item.id);
                  controls.current.playing = true;
                  setPlaying(true);
                }}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-left font-sans text-xs",
                  item.id === method
                    ? "border-primary/70 bg-primary/15"
                    : "border-border/80 text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="font-medium text-foreground">{item.name}</span>
                <span> · {item.note}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
            aᵢ = Σⱼ G mⱼ (rⱼ − rᵢ) / |rⱼ − rᵢ|³
            <br />
            抽样 {hud.name} · z = {fmt(hud.z)}
            <br />
            v = ({fmt(hud.vx)}, {fmt(hud.vy)}, {fmt(hud.vz)})
            <br />
            a = ({fmt(hud.ax)}, {fmt(hud.ay)}, {fmt(hud.az)})
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/80 p-3 font-mono text-[11px] leading-relaxed">
          <p>
            ΔE/|E₀| = {fmt(hud.eRel)}
            <br />
            最高 |z| = {fmt(hud.maxZ)} · 最近距离 {fmt(hud.sep)}
            <br />t = {fmt(hud.t)}
          </p>
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
                setEpoch((value) => value + 1);
              }}
            >
              <RotateCcw />
              重置
            </Button>
          </div>
          <label className="block font-sans text-xs text-muted-foreground">
            步长 Δt = {fmt(dt)}
            <input
              className="mt-1 w-full accent-primary"
              type="range"
              min={-4}
              max={-1.3}
              step={0.01}
              value={Math.min(-1.3, Math.max(-4, Math.log10(dt)))}
              onChange={(event) => setDt(10 ** Number(event.target.value))}
            />
          </label>
          <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
            拖动画布可以转视角，滚轮缩放。金色线段是 z 轴。画面在自动绕 z 轴转，方便看出轨道不在一个平面里。
          </p>
        </div>
      </aside>
    </div>
  );
}
