"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const frames = [
  {
    src: "/media/eht-m87.jpg",
    k: "面积",
    t: "视界把账写在表面上",
    w: 1280,
    h: 746,
  },
  {
    src: "/media/optical-hologram-lab.jpg",
    k: "边界",
    t: "体积里的故事可以印在一张皮上",
    w: 1280,
    h: 720,
  },
  {
    src: "/media/ads-chalkboard.jpg",
    k: "词典",
    t: "体内几何 ↔ 边界量子场",
    w: 1280,
    h: 720,
  },
  {
    src: "/media/rhic-star-collision.jpg",
    k: "实验室",
    t: "强耦合流体真的滑得像全息算出来的那样",
    w: 1226,
    h: 946,
  },
];

export function FinaleReel() {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % frames.length), 3200);
    return () => window.clearInterval(id);
  }, [on]);

  const frame = frames[i];

  return (
    <div className="relative bg-black">
      <Image
        src={frame.src}
        alt={frame.t}
        width={frame.w}
        height={frame.h}
        className="aspect-video h-auto w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="font-heading text-2xl text-gold">{frame.k}</p>
        <p className="font-sans text-sm text-white/90">{frame.t}</p>
        <div className="mt-3 flex gap-1.5">
          {frames.map((f, idx) => (
            <button
              key={f.k}
              type="button"
              aria-label={f.k}
              onClick={() => setI(idx)}
              className={`h-1.5 flex-1 rounded-full ${idx === i ? "bg-primary" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <Button type="button" size="sm" variant="secondary" onClick={() => setOn((v) => !v)}>
          {on ? <Pause /> : <Play />}
          {on ? "暂停" : "播放"}
        </Button>
      </div>
    </div>
  );
}
