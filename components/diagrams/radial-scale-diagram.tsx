export function RadialScaleDiagram() {
  return (
    <figure className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
      <svg
        viewBox="0 0 640 280"
        role="img"
        className="h-auto w-full"
        aria-label="径向方向对应能量尺度：边界是紫外，深处是红外"
      >
        <rect x="40" y="70" width="560" height="110" rx="16" fill="oklch(0.22 0.03 258)" stroke="oklch(0.8 0.11 185 / 0.4)" />
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="oklch(0.8 0.11 185 / 0.85)" />
            <stop offset="1" stopColor="oklch(0.84 0.12 82 / 0.2)" />
          </linearGradient>
        </defs>
        <rect x="56" y="92" width="528" height="66" rx="10" fill="url(#rg)" />
        <text x="90" y="132" fill="oklch(0.2 0.04 250)" fontSize="14" fontFamily="sans-serif" fontWeight="700">
          边界 · UV · 高能、短距离
        </text>
        <text x="430" y="132" fill="oklch(0.9 0.02 90)" fontSize="14" fontFamily="sans-serif">
          深处 · IR · 低能、长距离
        </text>
        <text x="90" y="220" fill="oklch(0.8 0.11 185)" fontSize="13" fontFamily="sans-serif">
          像把显微镜调到最细
        </text>
        <text x="430" y="220" fill="oklch(0.84 0.12 82)" fontSize="13" fontFamily="sans-serif">
          像后退一步看整体
        </text>
        <text x="320" y="40" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="13" fontFamily="sans-serif">
          AdS 多出来的那一维，常常就是“看问题的放大倍率”
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        从边界走进体内，相当于从高能物理走到低能有效理论。
      </figcaption>
    </figure>
  );
}
