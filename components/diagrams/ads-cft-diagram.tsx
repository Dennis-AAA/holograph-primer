export function AdSCFTDiagram() {
  return (
    <figure className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
      <svg
        viewBox="0 0 640 360"
        role="img"
        className="h-auto w-full"
        aria-label="反德西特时空圆柱：内部是引力，圆柱壁上是共形场论"
      >
        <defs>
          <linearGradient id="cyl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.32 0.06 250 / 0.3)" />
            <stop offset="1" stopColor="oklch(0.28 0.05 185 / 0.15)" />
          </linearGradient>
        </defs>
        <text x="320" y="28" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="13" fontFamily="sans-serif">
          AdS 像一座有“边”的时空罐头，时间朝上走
        </text>
        <ellipse cx="320" cy="68" rx="150" ry="36" fill="none" stroke="oklch(0.8 0.11 185)" strokeWidth="2" />
        <ellipse cx="320" cy="300" rx="150" ry="36" fill="oklch(0.22 0.03 258)" stroke="oklch(0.8 0.11 185)" strokeWidth="2" />
        <line x1="170" y1="68" x2="170" y2="300" stroke="oklch(0.8 0.11 185)" strokeWidth="2" />
        <line x1="470" y1="68" x2="470" y2="300" stroke="oklch(0.8 0.11 185)" strokeWidth="2" />
        <path d="M170 68 C 250 110, 390 30, 470 68 L 470 300 C 390 262, 250 342, 170 300 Z" fill="url(#cyl)" />
        <ellipse cx="320" cy="184" rx="78" ry="20" fill="none" stroke="oklch(0.84 0.12 82 / 0.7)" strokeDasharray="6 4" />
        <circle cx="300" cy="176" r="8" fill="oklch(0.84 0.12 82)" />
        <path d="M308 176 C 360 150, 420 160, 468 168" fill="none" stroke="oklch(0.84 0.12 82)" strokeDasharray="4 3" />
        <circle cx="468" cy="168" r="6" fill="oklch(0.8 0.11 185)" />
        <text x="128" y="190" textAnchor="end" fill="oklch(0.8 0.11 185)" fontSize="13" fontFamily="sans-serif">
          边界 CFT
        </text>
        <text x="320" y="188" textAnchor="middle" fill="oklch(0.84 0.12 82)" fontSize="12" fontFamily="sans-serif">
          体内引力
        </text>
        <text x="508" y="160" fill="oklch(0.84 0.12 82)" fontSize="12" fontFamily="sans-serif">
          体内的一颗星
        </text>
        <text x="508" y="178" fill="oklch(0.8 0.11 185)" fontSize="12" fontFamily="sans-serif">
          ↔ 边界上的一串涟漪
        </text>
        <text x="500" y="86" fill="oklch(0.78 0.02 250)" fontSize="12" fontFamily="sans-serif">
          时间 →
        </text>
        <path d="M488 96 L488 132" stroke="oklch(0.78 0.02 250)" markerEnd="none" />
        <polygon points="484,128 488,138 492,128" fill="oklch(0.78 0.02 250)" />
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        体内发生的引力事件，都可以翻译成边界量子场论里的一句话。
      </figcaption>
    </figure>
  );
}
