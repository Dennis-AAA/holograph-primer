const rows = [
  ["体内几何", "边界场论"],
  ["引力子 / 度规的形状", "能动量张量"],
  ["体内的一个场", "局域算符及其关联"],
  ["AdS 黑洞", "有限温度热态"],
  ["霍金温度", "场论温度"],
  ["径向坐标（往里走）", "从紫外到红外的能标"],
  ["极小曲面的面积", "区域纠缠熵"],
];

export function DictionaryPoster() {
  return (
    <div className="bg-[#071018] px-4 py-5">
      <p className="mb-3 text-center font-heading text-lg text-gold">全息字典 · 双向翻译</p>
      <div className="overflow-hidden rounded-xl ring-1 ring-primary/25">
        <table className="w-full border-collapse font-sans text-sm">
          <thead>
            <tr className="bg-primary/15">
              <th className="px-3 py-2 text-left font-medium text-gold">体内（引力）</th>
              <th className="w-16 px-2 text-center text-primary">↔</th>
              <th className="px-3 py-2 text-left font-medium text-primary">边界（场论）</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((r) => (
              <tr key={r[0]} className="odd:bg-white/2 even:bg-primary/5">
                <td className="px-3 py-2.5 text-foreground/90">{r[0]}</td>
                <td className="px-2 text-center text-gold">↔</td>
                <td className="px-3 py-2.5 text-foreground/90">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center font-sans text-xs text-muted-foreground">
        箭头全部双向：不是谁派生谁，是同一套账的两种写法。
      </p>
    </div>
  );
}
