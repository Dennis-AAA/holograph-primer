import { Badge } from "@/components/ui/badge";
import { HologramDiagram } from "@/components/diagrams/hologram-diagram";

export function LessonHero() {
  return (
    <div id="top" className="grid items-center gap-10 pb-6 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pt-14">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className="bg-primary/15 text-primary">大学通识 / 物理选讲</Badge>
          <Badge variant="outline">不需要广义相对论先行课</Badge>
        </div>
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.28em] text-gold uppercase">
          Holographic Principle · AdS/CFT
        </p>
        <h1 className="holo-text font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          宇宙也许是一张全息图
        </h1>
        <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground">
          一份由浅入深的教学教案：从黑洞的“面积熵”讲到
          AdS/CFT 这本引力与量子场论的双语词典。尽量用日常类比，让没有深厚物理背景的读者也能跟上思路。
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
          <div>
            <dt className="font-sans text-xs text-muted-foreground">建议学时</dt>
            <dd className="font-heading text-2xl text-gold">4</dd>
          </div>
          <div>
            <dt className="font-sans text-xs text-muted-foreground">核心章节</dt>
            <dd className="font-heading text-2xl text-gold">5</dd>
          </div>
          <div>
            <dt className="font-sans text-xs text-muted-foreground">讨论题</dt>
            <dd className="font-heading text-2xl text-gold">12</dd>
          </div>
        </dl>
      </div>
      <HologramDiagram />
    </div>
  );
}
