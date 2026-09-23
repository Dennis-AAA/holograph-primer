"use client";

import { useState } from "react";

export function WormholeAnim() {
  const [ent, setEnt] = useState(78);
  const connected = ent > 42;
  const waist = 18 + (ent / 100) * 42;

  return (
    <div className="bg-[#071018] px-3 pt-3 pb-4">
      <svg viewBox="0 0 720 300" className="h-auto w-full" aria-label="纠缠强弱对应虫洞是否连通">
        <rect width="720" height="300" fill="#071018" />
        <circle cx="150" cy="150" r="70" fill="#102033" stroke="#7ee7d1" strokeWidth="3" />
        <circle cx="570" cy="150" r="70" fill="#102033" stroke="#7ee7d1" strokeWidth="3" />
        <text x="150" y="154" textAnchor="middle" fill="#7ee7d1" fontSize="14" fontFamily="sans-serif">
          CFT A
        </text>
        <text x="570" y="154" textAnchor="middle" fill="#7ee7d1" fontSize="14" fontFamily="sans-serif">
          CFT B
        </text>
        <path
          d={`M220 150 C 300 ${150 - waist}, 420 ${150 - waist}, 500 150 C 420 ${150 + waist}, 300 ${150 + waist}, 220 150`}
          fill={connected ? "#e8c36a22" : "transparent"}
          stroke={connected ? "#e8c36a" : "#667085"}
          strokeWidth="3"
          strokeDasharray={connected ? "0" : "7 6"}
        />
        <text x="360" y="36" textAnchor="middle" fill="#c9d4e5" fontSize="13" fontFamily="sans-serif">
          {connected ? "纠缠够强：体内连通（虫洞）" : "纠缠太弱：空间在细腰处断开"}
        </text>
      </svg>
      <label className="mt-1 block px-2 font-sans text-xs text-gold">
        两边的纠缠强度
        <input
          type="range"
          min={8}
          max={96}
          value={ent}
          onChange={(e) => setEnt(Number(e.target.value))}
          className="mt-2 w-full accent-teal-300"
        />
      </label>
    </div>
  );
}
