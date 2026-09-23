"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DualitySlider() {
  const [value, setValue] = useState(78);
  const strong = value / 100;
  const qftHard = strong > 0.45;
  const gravityEasy = strong > 0.45;

  return (
    <Card>
      <CardContent className="space-y-5">
        <div>
          <p className="font-sans text-sm font-medium text-foreground">
            互动演示：拖动“耦合强度”
          </p>
          <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
            强弱对偶像一架跷跷板。场论这边越难算，引力那边往往越简单；反过来也一样。
          </p>
        </div>
        <label className="block font-sans text-xs tracking-wide text-gold">
          边界场论的耦合 λ（越大越“黏糊”）
          <input
            type="range"
            min={4}
            max={96}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="mt-3 w-full accent-teal-300"
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={value}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={value < 45 ? "default" : "outline"}
            onClick={() => setValue(12)}
          >
            清汤：弱耦合
          </Button>
          <Button
            type="button"
            size="sm"
            variant={value >= 45 ? "default" : "outline"}
            onClick={() => setValue(86)}
          >
            糖浆：强耦合
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Side
            title="边界：量子场论"
            easy={!qftHard}
            easyText="耦合很弱。粒子几乎各过各的，微扰论（一圈一圈加修正）好用，像清汤里的几粒胡椒。"
            hardText="耦合很强。大家都缠在一起，微扰论失效，像熬到快干的糖浆，勺子都搅不动。"
          />
          <Side
            title="体内：引力 / 弦论"
            easy={gravityEasy}
            easyText="对应经典引力。时空弯曲得平滑，爱因斯坦方程就够用，像用地图看山脉，不必数每一粒土。"
            hardText="对应量子引力涨落很大。时空本身在抖动，经典几何不够用，像大雾里看山。"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Side({
  title,
  easy,
  easyText,
  hardText,
}: {
  title: string;
  easy: boolean;
  easyText: string;
  hardText: string;
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-4">
      <p className="font-sans text-sm font-medium">{title}</p>
      <p className={`mt-1 font-heading text-lg ${easy ? "text-primary" : "text-gold"}`}>
        {easy ? "好算" : "难算"}
      </p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
        {easy ? easyText : hardText}
      </p>
    </div>
  );
}
