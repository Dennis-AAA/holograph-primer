"use client";

import { Playable } from "@/components/media/playable";

export function HawkingRadiationAnim() {
  return (
    <Playable>
      <svg viewBox="0 0 720 380" className="h-auto w-full" aria-label="霍金辐射粒子对动画">
        <defs>
          <radialGradient id="bhFill" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1a0a10" />
            <stop offset="100%" stopColor="#05070c" />
          </radialGradient>
        </defs>
        <rect width="720" height="380" fill="#071018" />
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx={40 + ((i * 97) % 680)}
            cy={30 + ((i * 53) % 320)}
            r={i % 3 === 0 ? 1.2 : 0.7}
            fill="white"
            opacity={0.25}
          />
        ))}
        <circle cx="250" cy="190" r="78" fill="url(#bhFill)" />
        <circle
          cx="250"
          cy="190"
          r="82"
          fill="none"
          stroke="#e8c36a"
          strokeWidth="3"
          className="media-anim hawking-ring"
        />
        <circle cx="338" cy="160" r="7" fill="#7ee7d1" className="media-anim hawking-out" />
        <circle cx="338" cy="160" r="7" fill="#f0d48a" className="media-anim hawking-in" />
        <path
          d="M430 120 q 18 -16 36 0 t 36 0 t 36 0 t 36 0"
          fill="none"
          stroke="#7ee7d1"
          strokeWidth="2.4"
          className="media-anim hawking-photon"
        />
        <text x="250" y="300" textAnchor="middle" fill="#e8c36a" fontSize="13" fontFamily="sans-serif">
          视界
        </text>
        <text x="540" y="86" fill="#7ee7d1" fontSize="13" fontFamily="sans-serif">
          逃出的那一半 → 热辐射
        </text>
        <text x="360" y="250" fill="#c9d4e5" fontSize="12" fontFamily="sans-serif">
          掉进去的那一半
        </text>
      </svg>
    </Playable>
  );
}
