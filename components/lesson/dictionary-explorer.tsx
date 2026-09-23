"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const entries = [
  {
    id: "operator",
    term: "算符 ↔ 场",
    bulk: "体内的一个场（比如标量场、引力子）",
    boundary: "边界上的一个局域算符",
    talk: "体内丢进一块小石头，水面（边界）就起一圈涟漪。石头是场，涟漪是算符的关联函数。",
  },
  {
    id: "stress",
    term: "能动量 ↔ 度规",
    bulk: "时空的形状（度规、引力子）",
    boundary: "能量与动量如何分布（能动量张量）",
    talk: "边界上物质挤在一起，体内的空间就会凹下去。质量告诉空间怎么弯，空间告诉质量怎么走，只是现在这句话有了“边界版”。",
  },
  {
    id: "temp",
    term: "温度 ↔ 黑洞",
    bulk: "AdS 里出现一个黑洞",
    boundary: "场论处在有限温度的热态",
    talk: "体内点着一只看不见的炉子（黑洞），边界上的量子系统就开始“发烧”。霍金温度对上了场论温度。",
  },
  {
    id: "entropy",
    term: "纠缠 ↔ 面积",
    bulk: "伸进体内的极小曲面面积",
    boundary: "某块区域与外界的纠缠熵",
    talk: "两个人牵手牵得有多紧，不必问他们心里怎么想，去量那张隔开他们的膜有多大就行。",
  },
  {
    id: "rg",
    term: "能标 ↔ 径向",
    bulk: "从边界走向中心的径向坐标",
    boundary: "从高能（紫外）流向低能（红外）",
    talk: "走进罐头深处，等于把显微镜倍率调低。近处看纹理，远处看轮廓。",
  },
];

export function DictionaryExplorer() {
  return (
    <Tabs defaultValue="operator">
      <TabsList variant="line" className="mb-4 flex w-full flex-wrap justify-start gap-1">
        {entries.map((e) => (
          <TabsTrigger key={e.id} value={e.id} className="px-3">
            {e.term}
          </TabsTrigger>
        ))}
      </TabsList>
      {entries.map((e) => (
        <TabsContent key={e.id} value={e.id} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-sans text-xs tracking-wide text-gold">体内（引力）</p>
              <p className="mt-1 font-heading text-lg">{e.bulk}</p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-wide text-primary">边界（场论）</p>
              <p className="mt-1 font-heading text-lg">{e.boundary}</p>
            </div>
          </div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
            {e.talk}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
