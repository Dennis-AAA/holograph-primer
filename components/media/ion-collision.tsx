"use client";

import { Playable } from "@/components/media/playable";

const sparks = Array.from({ length: 22 }).map((_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * (70 + (i % 5) * 16)),
    y: Math.round(Math.sin(angle) * (42 + (i % 4) * 12)),
    delay: Number((i * 0.08).toFixed(2)),
  };
});

export function IonCollisionAnim() {
  return (
    <Playable>
      <svg viewBox="0 0 720 340" className="h-auto w-full" aria-label="重离子碰撞产生火球">
        <rect width="720" height="340" fill="#071018" />
        <ellipse
          cx="180"
          cy="170"
          rx="54"
          ry="18"
          fill="#e8c36a"
          className="media-anim ion-left"
        />
        <ellipse
          cx="540"
          cy="170"
          rx="54"
          ry="18"
          fill="#7ee7d1"
          className="media-anim ion-right"
        />
        <ellipse
          cx="360"
          cy="170"
          rx="88"
          ry="36"
          fill="#ff7a59"
          opacity="0.0"
          className="media-anim ion-fireball"
        />
        {sparks.map((s) => (
          <circle
            key={`${s.x}-${s.y}`}
            cx={360}
            cy={170}
            r="3"
            fill="#f8e7b0"
            className="media-anim ion-spark"
            style={{
              ["--tx" as string]: `${s.x}px`,
              ["--ty" as string]: `${s.y}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <text x="180" y="214" textAnchor="middle" fill="#e8c36a" fontSize="12" fontFamily="sans-serif">
          金核
        </text>
        <text x="540" y="214" textAnchor="middle" fill="#7ee7d1" fontSize="12" fontFamily="sans-serif">
          金核
        </text>
        <text x="360" y="300" textAnchor="middle" fill="#c9d4e5" fontSize="12" fontFamily="sans-serif">
          撞上之后：椭圆火球向外喷粒子
        </text>
      </svg>
    </Playable>
  );
}
