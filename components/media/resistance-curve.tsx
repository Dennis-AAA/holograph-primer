export function ResistanceCurve() {
  return (
    <svg viewBox="0 0 720 220" className="h-auto w-full bg-[#071018]" aria-label="超导体电阻随温度陡降的示意曲线">
      <text x="360" y="28" textAnchor="middle" fill="#c9d4e5" fontSize="13" fontFamily="sans-serif">
        对照：普通超导体电阻陡降（示意，不是某一块样品的拟合）
      </text>
      <line x1="70" y1="170" x2="670" y2="170" stroke="#667085" />
      <line x1="70" y1="40" x2="70" y2="170" stroke="#667085" />
      <text x="370" y="198" textAnchor="middle" fill="#c9d4e5" fontSize="12" fontFamily="sans-serif">
        温度 T
      </text>
      <text x="28" y="110" fill="#c9d4e5" fontSize="12" fontFamily="sans-serif">
        R
      </text>
      <path
        d="M70 58 H 390 C 410 58, 418 58, 430 150 H 670"
        fill="none"
        stroke="#7ee7d1"
        strokeWidth="3"
      />
      <circle cx="420" cy="100" r="5" fill="#e8c36a" />
      <text x="436" y="90" fill="#e8c36a" fontSize="12" fontFamily="sans-serif">
        Tc 附近
      </text>
    </svg>
  );
}
