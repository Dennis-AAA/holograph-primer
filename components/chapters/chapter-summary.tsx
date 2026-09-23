import { MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { FinaleReel } from "@/components/media/finale-reel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recap = [
  {
    t: "种子",
    d: "黑洞有温度、有熵，熵写在视界面积上。任何区域的信息都有面积上限。热辐射与幺正性打架，逼我们重新想信息住在哪。",
  },
  {
    t: "口号",
    d: "'t Hooft 说降维：独立自由度是边界上的像素。Susskind 说全息：体积世界是边界信息的重建，两种呈现不要重复记账。",
  },
  {
    t: "实现",
    d: "AdS/CFT：体内的引力弦论与边界上的共形场论对偶。最著名的一对是 AdS₅ × S⁵ 与 N=4 超杨-米尔斯。",
  },
  {
    t: "用法",
    d: "字典翻译场与算符、黑洞与温度、径向与能标、面积与纠缠。强弱对偶让难算的场论变成好算的几何。",
  },
  {
    t: "出走",
    d: "凝聚态借它做强耦合风洞，重离子碰撞靠近 η/s = 1/4π，量子信息把时空看成编码与纠缠的产物。局限也必须一起记住。",
  },
];

const readings = [
  {
    t: "入门可读",
    items: [
      "Susskind，《黑洞战争》中与全息、互补有关的章节（叙事性强，注意与论文区分）。",
      "公开课：Susskind 在 Stanford 的理论最低限度 / 专题讲座中关于黑洞与全息的几讲。",
      "中文通识：李淼等学者的科普文章与讲座，用来对照课堂比喻是否走样。",
    ],
  },
  {
    t: "想认真往下",
    items: [
      "Maldacena, “The Large N Limit of Superconformal Field Theories and Supergravity” (1997)。",
      "Witten, “Anti de Sitter Space and Holography” (1998)；GKP 同期论文。",
      "Natsuume 或 Ammon-Erdmenger 的 AdS/CFT 讲义，适合开始做题。",
      "Ryu & Takayanagi (2006)；Hartnoll, Herzog, Horowitz 关于全息超导体的综述。",
    ],
  },
];

export function ChapterSummary() {
  return (
    <LessonSection
      id="summary"
      eyebrow="收束"
      title="总结回顾与延伸阅读"
      subtitle="把整堂课收成五句话。若学生只能带走这些，也够用了。"
    >
      <div className="grid gap-3">
        {recap.map((r, i) => (
          <Card key={r.t}>
            <CardHeader className="flex-row items-baseline gap-3">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <CardTitle>{r.t}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {r.d}
            </CardContent>
          </Card>
        ))}
      </div>
      <Prose>
        <p>
          最后再听一遍主旋律：<strong>体积里的引力世界，可以是边界上量子系统的全息再现。</strong>
          黑洞先用面积熵把这条路点亮，{"'t Hooft"} 与 Susskind 把它写成原理，Maldacena 把它做成可计算的对应。词典还在增页，宇宙也未必是 AdS，但我们第一次拥有一种语言，能让几何、信息和强耦合物质互相翻译。
        </p>
      </Prose>
      <Subhead>延伸阅读（分层）</Subhead>
      <div className="grid gap-4 md:grid-cols-2">
        {readings.map((b) => (
          <Card key={b.t}>
            <CardHeader>
              <CardTitle className="text-base">{b.t}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-sans text-sm leading-relaxed text-muted-foreground">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <MediaStage
        kind="video"
        title="四帧收束：面积、边界、词典、实验室"
        purpose="用四帧把五讲钉成一条线。点进度条可跳转，便于一周后还记得。"
        credit="黑洞影像：ESO/EHT Collaboration，CC BY 4.0。碰撞影像：Brookhaven National Laboratory / STAR，CC BY 2.0。其余为本课绘制。"
      >
        <FinaleReel />
      </MediaStage>
      <Subhead>给下一堂课的钩子</Subhead>
      <Prose>
        <p>
          可以预告却不必展开的题目：德西特空间的全息、岛公式与信息悖论的新进展、张量网络如何画出 RT 曲面、以及“复杂度”会不会成为字典里的下一个大词。让课程停在仍想往下翻的地方，而不是停在句号上。
        </p>
      </Prose>
    </LessonSection>
  );
}
