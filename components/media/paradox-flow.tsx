"use client";

import { Playable } from "@/components/media/playable";

export function ParadoxFlow() {
  return (
    <Playable>
      <svg viewBox="0 0 720 280" className="h-auto w-full" aria-label="黑洞信息悖论流程图">
        <rect width="720" height="280" fill="#071018" />
        {[
          { x: 70, t: "1. 有信息的物质", s: "日记掉进去" },
          { x: 275, t: "2. 霍金辐射", s: "看起来是热的" },
          { x: 480, t: "3. 黑洞蒸发完", s: "账还能对上吗？" },
        ].map((b) => (
          <g key={b.x}>
            <rect
              x={b.x}
              y="88"
              width="170"
              height="86"
              rx="12"
              fill="#122033"
              stroke="#7ee7d1"
              className="media-anim paradox-box"
            />
            <text x={b.x + 85} y="124" textAnchor="middle" fill="#f4efe4" fontSize="14" fontFamily="sans-serif">
              {b.t}
            </text>
            <text x={b.x + 85} y="148" textAnchor="middle" fill="#e8c36a" fontSize="12" fontFamily="sans-serif">
              {b.s}
            </text>
          </g>
        ))}
        <path d="M240 131 H 275" stroke="#e8c36a" strokeWidth="2" markerEnd="url(#arr)" />
        <path d="M445 131 H 480" stroke="#e8c36a" strokeWidth="2" />
        <path
          d="M155 174 C 155 230, 565 230, 565 174"
          fill="none"
          stroke="#7ee7d1"
          strokeDasharray="6 5"
          className="media-anim paradox-holo"
        />
        <text x="360" y="252" textAnchor="middle" fill="#7ee7d1" fontSize="12" fontFamily="sans-serif">
          全息线索：信息也许一开始就写在视界上
        </text>
      </svg>
    </Playable>
  );
}
