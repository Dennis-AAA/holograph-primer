"use client";

import { Playable } from "@/components/media/playable";

export function RgFlowAnim() {
  const layers = [
    { y: 36, cells: 22, label: "边界 · UV · 细看", color: "#7ee7d1" },
    { y: 92, cells: 14, label: "", color: "#8fd4c4" },
    { y: 148, cells: 9, label: "", color: "#c9b07a" },
    { y: 210, cells: 5, label: "深处 · IR · 粗看", color: "#e8c36a" },
  ];
  return (
    <Playable>
      <svg viewBox="0 0 720 320" className="h-auto w-full" aria-label="重整化能标对应径向方向">
        <rect width="720" height="320" fill="#071018" />
        {layers.map((layer) => (
          <g key={layer.y}>
            {Array.from({ length: layer.cells }).map((_, i) => (
              <rect
                key={i}
                x={70 + i * ((580) / layer.cells)}
                y={layer.y}
                width={580 / layer.cells - 4}
                height="40"
                rx="4"
                fill={layer.color}
                opacity={0.35 + i * 0.01}
                className="media-anim rg-cell"
                style={{ animationDelay: `${i * 90 + layer.y}ms` }}
              />
            ))}
            {layer.label ? (
              <text
                x="360"
                y={layer.y + 26}
                textAnchor="middle"
                fill="#071018"
                fontSize="13"
                fontFamily="sans-serif"
                fontWeight="700"
              >
                {layer.label}
              </text>
            ) : null}
          </g>
        ))}
        <rect
          x="40"
          y="20"
          width="640"
          height="54"
          fill="none"
          stroke="#7ee7d1"
          strokeWidth="2"
          className="media-anim rg-window"
        />
        <text x="360" y="300" textAnchor="middle" fill="#c9d4e5" fontSize="12" fontFamily="sans-serif">
          往下走 = 把显微镜倍率调低
        </text>
      </svg>
    </Playable>
  );
}
