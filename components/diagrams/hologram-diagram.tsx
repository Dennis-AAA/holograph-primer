export function HologramDiagram() {
  return (
    <figure className="rounded-2xl bg-card/80 p-4 ring-1 ring-foreground/10">
      <svg
        viewBox="0 0 520 340"
        role="img"
        aria-labelledby="hologram-title hologram-desc"
        className="h-auto w-full"
      >
        <title id="hologram-title">全息图类比：二维底片编码三维景象</title>
        <desc id="hologram-desc">
          左侧是一张带干涉条纹的二维底片，一束光照射后，右侧浮现出三维的星体。
        </desc>
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="oklch(0.8 0.11 185 / 0.05)" />
            <stop offset="1" stopColor="oklch(0.8 0.11 185 / 0.35)" />
          </linearGradient>
          <radialGradient id="star" cx="50%" cy="40%" r="50%">
            <stop offset="0" stopColor="oklch(0.92 0.1 82)" />
            <stop offset="1" stopColor="oklch(0.7 0.12 40 / 0.2)" />
          </radialGradient>
        </defs>
        <rect x="28" y="54" width="150" height="220" rx="10" fill="oklch(0.22 0.03 258)" stroke="oklch(0.8 0.11 185 / 0.7)" />
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={i}
            d={`M 40 ${68 + i * 11} C 70 ${58 + i * 11}, 110 ${86 + i * 11}, 164 ${70 + i * 11}`}
            fill="none"
            stroke="oklch(0.8 0.11 185 / 0.55)"
            strokeWidth="1.2"
          />
        ))}
        <text x="103" y="292" textAnchor="middle" fill="oklch(0.84 0.12 82)" fontSize="13" fontFamily="sans-serif">
          二维底片
        </text>
        <polygon points="178,84 178,244 310,210 310,118" fill="url(#beam)" />
        <line x1="178" y1="164" x2="318" y2="164" stroke="oklch(0.8 0.11 185 / 0.8)" strokeDasharray="5 5" />
        <circle cx="392" cy="150" r="54" fill="url(#star)" opacity="0.95" />
        <ellipse cx="392" cy="150" rx="78" ry="22" fill="none" stroke="oklch(0.84 0.12 82 / 0.7)" transform="rotate(-18 392 150)" />
        <ellipse cx="392" cy="150" rx="78" ry="22" fill="none" stroke="oklch(0.8 0.11 185 / 0.45)" transform="rotate(28 392 150)" />
        <circle cx="410" cy="132" r="7" fill="oklch(0.95 0.02 90)" />
        <text x="392" y="248" textAnchor="middle" fill="oklch(0.8 0.11 185)" fontSize="13" fontFamily="sans-serif">
          三维景象
        </text>
        <text x="260" y="40" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="12" fontFamily="sans-serif">
          光照上去，扁平的纹路“长”出立体世界
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        全息图：体积里的故事，写在表面上。
      </figcaption>
    </figure>
  );
}
