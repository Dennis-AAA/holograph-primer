import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { TeachTip } from "@/components/lesson/callouts";

const objectives = [
  "能用一张信用卡全息图、一盘影碟或一座城市的城墙，向非专业听众说明“全息原理”在说什么、不在说什么。",
  "能按时间线讲清：黑洞热力学 → 贝肯斯坦-霍金熵 → 信息悖论 → 面积定律如何把人逼向“信息写在边界上”。",
  "能对比 't Hooft 与 Susskind 的核心观点：自由度可以降维，世界可以看作全息图。",
  "能用“同一出戏、两套剧本”说明 AdS/CFT：体内引力理论与边界共形场论是对偶，而不是谁派生谁的粗糙模型。",
  "能口述全息字典里最常用的几条（算符/场、温度/黑洞、纠缠/面积、能标/径向），并解释强弱对偶为什么有用。",
  "能各举一例，说明全息思想如何进入凝聚态、量子信息与量子引力，并说出它的适用范围与局限。",
];

const hours = [
  { t: "课前 15 分钟", d: "用一张全息贴纸或一段舞台全息投影视频把问题抛出来：立体世界能不能写在一张皮上？" },
  { t: "第一讲 50 分钟", d: "黑洞、视界、熵、霍金辐射、信息悖论。目标是让学生感到“面积定律”真正刺耳。" },
  { t: "第二讲 40 分钟", d: "'t Hooft 与 Susskind。把口号变成可抓住的图像：降维、全息图、信息容量上限。" },
  { t: "第三讲 60 分钟", d: "AdS 是什么、CFT 是什么、Maldacena 对偶的物理含义。这是概念密度最高的一段。" },
  { t: "第四讲 45 分钟", d: "字典、强弱对偶、径向=能标、Ryu-Takayanagi。可穿插互动滑块。" },
  { t: "第五讲 + 讨论 40 分钟", d: "应用速写、讨论题、总结。宁可少讲公式，也要让学生带走一张自己的“地图”。" },
];

const keys = [
  {
    k: "重点",
    items: [
      "熵按面积而非体积计数，这是全息思想的第一粒种子。",
      "全息原理：一个区域里的量子引力，其自由度不超过边界面积能写下的信息。",
      "AdS/CFT 是全息原理目前最精确、可计算的实现，是一种等价对偶。",
      "强弱对偶让“算不动的场论”变成“好算的经典引力”，这是它在其他学科走红的原因。",
    ],
  },
  {
    k: "难点",
    items: [
      "“对偶”容易被听成“近似”或“类比”。要反复强调：两边算的是同一套物理量。",
      "AdS 的边界在无穷远，不是一堵可以敲门的墙；学生常把它想成房间的水泥墙。",
      "我们的宇宙更接近德西特（正宇宙学常数），不是反德西特。教案必须把“模型宇宙”和“可观测宇宙”分开。",
      "信息悖论至今没有课堂里能拍板的终极答案；要教的是问题结构，不是江湖传说。",
    ],
  },
];

export function ChapterPrep() {
  return (
    <>
      <LessonSection
        id="guide"
        eyebrow="课前"
        title="如何使用这份教案"
        subtitle="这不是一篇论文综述，而是一堂可以真正讲出去的课。建议教师按“图像 → 物理事实 → 一句话结论”的节奏推进。"
      >
        <Prose>
          <p>
            全息原理听起来像科幻：三维的世界，信息却写在二维表面上。更刺激的版本会说“我们生活在全息图里”。课堂里最危险的，不是学生听不懂，而是听懂了一个走样的版本——以为物理学家已经证明宇宙是电脑模拟，或者以为反德西特空间就是我们每晚抬头看见的夜空。
          </p>
          <p>
            所以这份教案有意走“粗浅但家常”的路线：每个抽象概念都先落地到一件日常事物上，再告诉你物理学家真正改了哪句话。公式会给，但公式是路标，不是门槛。没有学过广义相对论、量子场论的读者，应当仍能跟上主线；学过的人则能在小字和教师备忘里看见更精确的指向。
          </p>
          <p>
            建议把板书（或幻灯）分成三栏：<strong>日常图像</strong>、<strong>物理事实</strong>、<strong>一句话结论</strong>。学生合上电脑后，至少要能用自己的话说出这三栏。
          </p>
        </Prose>
        <TeachTip>
          开场不要先写 AdS/CFT。先问：“把一间教室里所有家具、灰尘、空气分子的全部细节记下来，你需要一本多厚的书？如果答案居然取决于墙壁的面积，而不是房间的体积，你信吗？”让房间先安静三秒。
        </TeachTip>
      </LessonSection>

      <LessonSection
        id="objectives"
        eyebrow="课前"
        title="教学目标与学时安排"
        subtitle="学完以后，学生应能把一条思想史讲圆，而不是背下一串缩写。"
      >
        <Subhead>教学目标</Subhead>
        <ol className="space-y-3 font-sans text-sm leading-relaxed text-muted-foreground">
          {objectives.map((o) => (
            <li key={o} className="rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10">
              {o}
            </li>
          ))}
        </ol>
        <Subhead>建议学时（可拆成两到三次课）</Subhead>
        <div className="grid gap-3 md:grid-cols-2">
          {hours.map((h) => (
            <Card key={h.t} size="sm">
              <CardHeader>
                <CardTitle className="text-gold">{h.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{h.d}</CardContent>
            </Card>
          ))}
        </div>
        <Prose>
          <p>
            若只有一次 90 分钟的通识讲座：压缩第二讲与第五讲，把时间押在“面积熵为什么奇怪”和“AdS/CFT 是双语词典”两处。若给物理系高年级：第三、四讲可以加半小时，把 N=4 超杨-米尔斯与 Ryu-Takayanagi 的适用条件讲完整。
          </p>
        </Prose>
      </LessonSection>

      <LessonSection
        id="keypoints"
        eyebrow="课前"
        title="重点与难点"
        subtitle="教师心里要有一张“必须讲清楚 / 千万别讲滑”的清单。"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {keys.map((block) => (
            <Card key={block.k}>
              <CardHeader>
                <CardTitle>{block.k}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 font-sans text-sm leading-relaxed text-muted-foreground">
                  {block.items.map((item) => (
                    <li key={item} className="border-l-2 border-primary/40 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </LessonSection>
    </>
  );
}
