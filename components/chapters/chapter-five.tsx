import { AnalogyBox } from "@/components/lesson/analogy-box";
import { Misconception, TeachTip } from "@/components/lesson/callouts";
import { FormulaCard } from "@/components/lesson/formula-card";
import { LessonImage, MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { IonCollisionAnim } from "@/components/media/ion-collision";
import { ResistanceCurve } from "@/components/media/resistance-curve";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const apps = [
  {
    title: "凝聚态与“全息物质”",
    body: "高温超导体、奇异金属这类系统，电子之间缠得太紧，传统微扰论常常空手而归。人们构造“全息超导体”“全息奇异金属”：在 AdS 里放带电黑洞、标量毛发、晶格，再读边界上的电导率、谱函数。它不是某种真实材料的精确分子模型，而更像一座风洞——用来看强耦合量子物质可能长出哪些普适行为。",
  },
  {
    title: "夸克胶子等离子体",
    body: "重离子碰撞制造出的夸克胶子等离子体黏得惊人。Kovtun、Son、Starinets 从全息算出一类强耦合流体的剪切粘度与熵密度之比 η/s = 1/4π。实验测到的值靠近这条线。这是全息走出纯理论、碰到实验室数据的名场面之一。它没有“证明 QCD 等于某种弦论”，但展示了强耦合流体可能普遍很接近这个下限。",
  },
  {
    title: "量子信息",
    body: "纠缠熵、量子纠错、复杂度，被一批接一批地写进字典。ER=EPR 猜想把虫洞与纠缠配对；“复杂度=体积/作用量”试图解释黑洞视界后面为什么还在增长。全息让量子信息不再只是量子计算机的语言，也成了谈论时空结构的语言。",
  },
  {
    title: "量子引力本身",
    body: "AdS/CFT 是目前少数把量子引力定义得比较清楚的地方：边界 CFT 是普通的量子理论，体内引力是它的另一种说法。黑洞信息问题在这个框架里被重新表述为：热辐射的精细关联如何重建内部。近年的岛公式、可复现性讨论，都站在这片土壤上。",
  },
];

export function ChapterFive() {
  return (
    <LessonSection
      id="ch5"
      eyebrow="第五讲"
      title="全息思想走进其他学科"
      subtitle="一本好用的双语词典，会从引力所借到固体物理实验室，再借到量子信息的黑板。"
    >
      <div className="space-y-4">
        <Subhead>5.1 它改变了什么问题会被问</Subhead>
        <Prose>
          <p>
            全息原理最深刻的影响，不一定是某条公式，而是它允许物理学家换舌头说话。以前“强耦合量子多体”和“弯曲时空里的黑洞”是两个社区；现在他们可以共用一张草稿纸。以前“空间从哪来”像形而上学；现在可以问“如果我把纠缠切断，几何的细腰会不会勒断”。
          </p>
        </Prose>
        <div className="grid gap-4 md:grid-cols-2">
          {apps.map((a) => (
            <Card key={a.title}>
              <CardHeader>
                <CardTitle className="text-base">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                {a.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Subhead>5.2 凝聚态：把固体放进一座引力风洞</Subhead>
        <Prose>
          <p>
            课堂里可以用更土的话说：固体物理学家有时面对一锅怎么搅都搅不清的电子汤。全息给他们一扇后门——去一座设计好的 AdS 城市里，看黑洞周围的电磁场如何响应，再把结果当作“强耦合电子汤可能的行为”。全息超导体里，体内标量场在低温下“长毛”，边界上出现类似库珀对的凝聚；电导率出现一朵 delta 函数。这些不是铜氧化物晶格的第一性原理计算，它们是玩具，但玩具可以很严肃：用来隔离哪些现象来自“强耦合 + 有限密度”这种粗条件，而不是来自某种精细的化学细节。
          </p>
        </Prose>
        <AnalogyBox title="飞机模型与风洞">
          <p>
            工程师不会把风洞里的塑料飞机当成真客机，但会认真对待风洞里的气流分离。全息凝聚态也是：模型材料不是实验室里的那块样品，模型揭示的流动模式却可能在真样品里露面。
          </p>
        </AnalogyBox>
        <MediaStage
          kind="image"
          title="全息超导体的“长毛”"
          purpose="左边热、光秃；右边冷、长出标量毛发。这是玩具风洞，不是某块铜氧化物的化学计算。"
        >
          <LessonImage
            src="/media/hairy-blackhole-superconductor.jpg"
            alt="左：炽热光秃的黑洞；右：较冷的黑洞周围环绕金色发丝状场线"
            width={1280}
            height={720}
          />
          <ResistanceCurve />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>5.3 一个能写上黑板的应用结果</Subhead>
        <FormulaCard
          name="KSS 粘度比（一类全息流体）"
          formula={"η / s = ℏ / (4π k_B)"}
          meaning="剪切粘度比上熵密度。强耦合、强经典引力极限下得到 1/4π。夸克胶子等离子体的实验推断值与它同量级，且偏低——说明那锅夸克汤更像完美流体，而不是稀薄气体。"
        />
        <Prose>
          <p>
            教师可以补一句历史感：在这以前，人们更习惯从弱耦合气体出发去想粘度，结果往往太大。全息从相反的极限给出一个很小的数，实验站在这一边。这不是说全息“赢了 QCD”，而是说<strong>强耦合才是对的门槛</strong>。
          </p>
        </Prose>
        <MediaStage
          kind="animation"
          title="两核相撞，喷出火球"
          purpose="把 η/s 连到一次实验图像：椭圆火球很滑，粒子带着集体流飞出去。点播放。"
        >
          <IonCollisionAnim />
        </MediaStage>
        <MediaStage
          kind="image"
          title="RHIC 上一次真实的金核碰撞"
          purpose="STAR 探测器拍到的径迹。全息算的是“有多滑”，不是这一张图里的每一条线。"
          credit="Brookhaven National Laboratory / STAR Collaboration，CC BY 2.0。Wikimedia Commons：View of gold ions collision。"
        >
          <LessonImage
            src="/media/rhic-star-collision.jpg"
            alt="STAR 探测器中金离子对撞产生的大量带电粒子径迹"
            width={1226}
            height={946}
          />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>5.4 量子信息：纠错码与虫洞</Subhead>
        <Prose>
          <p>
            全息还有一副更现代的面孔：边界像一个量子纠错码，体内的局域物理是编进去的逻辑信息。边界上撕掉一小块（对应体内靠近边界的扰动）仍可能恢复；撕得太大（对应深体内或黑洞内部）就会失败。这解释了为什么体内看起来有局域性，而信息又写在表面上——这正是好的纠错码干的事。
          </p>
          <p>
            Maldacena 与 Susskind 的 ER=EPR 则说：纠缠（EPR 对）与虫洞（爱因斯坦-罗森桥）也许是同一件事的两副面孔。听起来像科幻，但它是从对偶里长出来的工作假说：高度纠缠的两边，体内往往是连通的。
          </p>
        </Prose>
        <AnalogyBox title="云盘与纠错">
          <p>
            你把一部电影碎片化存在许多硬盘里，坏掉一两块仍能播。观众看见的“完整电影”像体内局域的时空；那些打散存放的碎片像边界自由度。全息让“空间里的这里”成为一种编码效果，而不一定是最底层的砖块。
          </p>
        </AnalogyBox>
      </div>

      <div className="space-y-4">
        <Subhead>5.5 诚实的边界：它不是万能钥匙</Subhead>
        <Prose>
          <p>
            教案必须把冷水也端上桌。第一，最干净的对偶生活在 AdS，不是我们的加速膨胀宇宙；德西特全息仍是开放题目。第二，最干净的场论带大量超对称，真实材料与真实 QCD 都没有这么多保护。第三，经典引力极限对应大 N，真实世界的颜色数是 3，固体里的能带更不是 SU(N)。第四，全息给出的常常是普适行为与定性机制，不是某一块铜氧化物的化学精度。
          </p>
          <p>
            即便如此，它仍然改变了地图：量子引力第一次有了一个非微扰的定义候选；强耦合多体第一次有了一套几何直觉；信息与几何第一次可以互相翻译。作为通识课，这就足够构成一次世界观级别的更新。
          </p>
        </Prose>
        <Misconception
          wrong="既然全息这么成功，我们应该用它取代量子场论、固体理论或天文观测。"
          right="全息是一种对偶框架和一组可计算的模型宇宙。它补充、启发、在某些极限下精确，但不自动取消其他描述。科学地图上它是一座新大陆，不是唯一的大陆。"
        />
        <TeachTip>
          第五讲收尾建议留一张“能做 / 不能做”对照板。学生若能自己说出两条能做、两条不能做，这堂课就成功了。
        </TeachTip>
      </div>
    </LessonSection>
  );
}
