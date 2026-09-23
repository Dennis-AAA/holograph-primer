export function BlackHoleAreaDiagram() {
  return (
    <figure className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
      <svg
        viewBox="0 0 640 300"
        role="img"
        className="h-auto w-full"
        aria-label="普通物体的信息量随体积增长，黑洞的信息量只随视界面积增长"
      >
        <text x="150" y="28" textAnchor="middle" fill="oklch(0.84 0.12 82)" fontSize="14" fontFamily="sans-serif">
          普通房间：信息跟体积走
        </text>
        {[0, 1, 2].map((z) =>
          [0, 1, 2].map((y) =>
            [0, 1, 2].map((x) => (
              <rect
                key={`${z}${y}${x}`}
                x={70 + x * 28 + z * 10}
                y={70 + y * 28 - z * 10}
                width="24"
                height="24"
                fill="oklch(0.32 0.04 258)"
                stroke="oklch(0.8 0.11 185 / 0.7)"
              />
            )),
          ),
        )}
        <text x="150" y="272" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="12" fontFamily="sans-serif">
          积木越多，能存放的故事越多
        </text>
        <text x="470" y="28" textAnchor="middle" fill="oklch(0.84 0.12 82)" fontSize="14" fontFamily="sans-serif">
          黑洞：信息跟面积走
        </text>
        <circle cx="470" cy="150" r="78" fill="oklch(0.12 0.02 258)" stroke="oklch(0.84 0.12 82)" strokeWidth="3" />
        <circle cx="470" cy="150" r="62" fill="oklch(0.08 0.02 258)" />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={470 + Math.cos(a) * 78}
              cy={150 + Math.sin(a) * 78}
              r="4"
              fill="oklch(0.8 0.11 185)"
            />
          );
        })}
        <text x="470" y="272" textAnchor="middle" fill="oklch(0.78 0.02 250)" fontSize="12" fontFamily="sans-serif">
          故事只写在视界这层“皮肤”上
        </text>
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        左边像塞满积木的房间，右边像只在球面贴满便签的黑洞。
      </figcaption>
    </figure>
  );
}
