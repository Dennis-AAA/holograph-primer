export function RTSurfaceDiagram() {
  return (
    <figure className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
      <svg
        viewBox="0 0 640 300"
        role="img"
        className="h-auto w-full"
        aria-label="Ryu-Takayanagi 公式：边界区域的纠缠熵等于体内极小曲面的面积"
      >
        <path
          d="M80 70 Q 320 30, 560 70 L 560 250 Q 320 210, 80 250 Z"
          fill="oklch(0.22 0.04 258)"
          stroke="oklch(0.8 0.11 185 / 0.5)"
        />
        <path
          d="M80 70 Q 320 30, 560 70"
          fill="none"
          stroke="oklch(0.8 0.11 185)"
          strokeWidth="3"
        />
        <path
          d="M210 68 Q 320 168, 430 68"
          fill="none"
          stroke="oklch(0.84 0.12 82)"
          strokeWidth="3"
        />
        <line x1="210" y1="68" x2="430" y2="68" stroke="oklch(0.8 0.11 185)" strokeWidth="6" />
        <text x="320" y="58" textAnchor="middle" fill="oklch(0.8 0.11 185)" fontSize="14" fontFamily="sans-serif">
          边界区域 A
        </text>
        <text x="320" y="150" textAnchor="middle" fill="oklch(0.84 0.12 82)" fontSize="14" fontFamily="sans-serif">
          极小曲面 γ_A
        </text>
        <text x="320" y="280" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="13" fontFamily="sans-serif">
          S_A ≈ Area(γ_A) / 4Gℏ —— 纠缠的多少，写成几何的面积
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        量子信息里的“牵绊”，在引力语言里变成一张拉得最紧的膜。
      </figcaption>
    </figure>
  );
}
