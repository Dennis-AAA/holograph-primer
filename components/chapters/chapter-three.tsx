import { AdSCFTDiagram } from "@/components/diagrams/ads-cft-diagram";
import { AnalogyBox } from "@/components/lesson/analogy-box";
import { Misconception, TeachTip } from "@/components/lesson/callouts";
import { LessonImage, MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { AdsLightAnim } from "@/components/media/ads-light";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChapterThree() {
  return (
    <LessonSection
      id="ch3"
      eyebrow="第三讲"
      title="AdS/CFT：同一出戏，两套剧本"
      subtitle="反德西特时空里的引力，等价于它边界上的共形场论。这是全息原理目前最清晰、最可计算的实现。"
    >
      <div className="space-y-4">
        <Subhead>3.1 先别怕缩写，拆开两个角色</Subhead>
        <Prose>
          <p>
            AdS/CFT 看起来像车牌号。拆开就不可怕：
          </p>
          <p>
            <strong>AdS</strong> = Anti-de Sitter space，反德西特时空。它是广义相对论里一种特殊的“空舞台”：宇宙学常数为负，空间往外会自己往回弯，像一只无限深的碗，或一座有自然边界的罐头。
          </p>
          <p>
            <strong>CFT</strong> = Conformal Field Theory，共形场论。它是一种特别对称的量子场论：没有内建的尺子。你把系统均匀放大、缩小，物理定律看起来一样。它<strong>通常没有引力</strong>，生活在更低的维度里。
          </p>
          <p>
            斜杠表示一种惊人的等价：舞台内部的引力剧，和边界上的无引力场论，是同一出戏。
          </p>
        </Prose>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>体内 · AdS 引力</CardTitle>
            </CardHeader>
            <CardContent className="font-sans text-sm leading-relaxed text-muted-foreground">
              维度更高（常见课堂例子是五维 AdS 再乘一个五维球面）。有弯曲时空、黑洞、弦。经典极限下就是爱因斯坦的几何语言。
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>边界 · CFT</CardTitle>
            </CardHeader>
            <CardContent className="font-sans text-sm leading-relaxed text-muted-foreground">
              维度低一维（例如四维）。没有动力学引力。有强相互作用的量子场、规范对称性、共形对称性。看起来更像粒子物理或凝聚态里的量子多体系统。
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Subhead>3.2 反德西特：一座有“边”的宇宙碗</Subhead>
        <AdSCFTDiagram />
        <Prose>
          <p>
            我们日常的直觉来自平坦空间，或来自正在加速膨胀的宇宙（那更接近正宇宙学常数的德西特）。AdS 相反：负宇宙学常数像一种温和的引力弹簧，把东西往回拉。光线在有限时间里就能“走到边界”——更精确地说，边界在空间上位于无穷远，但因为钟走得特别，从里面看它并不那么遥不可及。
          </p>
          <p>
            课堂里最有用的图像是一根<strong>圆柱</strong>：竖直方向是时间，圆盘的半径是空间的径向，圆柱的侧壁就是边界。物理过程在罐头内部发生，但所有可观测量，最终都能在侧壁上读到。侧壁上住着 CFT。
          </p>
        </Prose>
        <AnalogyBox title="金鱼缸与缸壁上的纹路">
          <p>
            金鱼在缸里游，水面和玻璃上会有光斑、波纹、倒影。全息对偶把这句话做到极端：缸里每一条鱼的游法，都等价于玻璃上纹路的某种舞蹈；而且两边都完整。你不是在用倒影“猜测”鱼，你是在读另一份完整的剧本。缸壁不是普通的房间墙，它更像无穷远处的一张屏幕。
          </p>
        </AnalogyBox>
        <MediaStage
          kind="animation"
          title="光在 AdS 碗里的来回"
          purpose="有边界的时空不是科幻盒子：几何自己把光线弯回屏幕。点播放看光子跑一圈。"
        >
          <AdsLightAnim />
        </MediaStage>
        <Misconception
          wrong="AdS 就是我们宇宙的形状，所以全息原理已经直接适用于地球和银河。"
          right="AdS/CFT 是一个控制得很好的模型宇宙。我们的观测宇宙带正宇宙学常数，更像德西特。把这里的课当“精确玩具”和“思想实验室”，而不是已量过的宇宙说明书。"
        />
      </div>

      <div className="space-y-4">
        <Subhead>3.3 共形场论：一把没有刻度的尺子</Subhead>
        <Prose>
          <p>
            “共形”听着玄，生活里倒有亲戚：地图上的某些投影保持角度，雪花在不同倍率下有相似的枝桠，海岸线在一定范围内怎么放大都还是弯弯曲曲。CFT 是把“放大以后长得像自己”做成对称性的量子场论。它没有一个内禀的千克或米来当绝对标尺——标尺是你自己选的观察窗口。
          </p>
          <p>
            为什么边界上常常是 CFT？因为 AdS 的几何在靠近边界时有很强的缩放对称：你把边界附近的东西放大，看起来像沿着径向做了一次平移。体内的这种对称，翻译到边界上，就是共形对称。所以不是有人偏爱 CFT 这个缩写，而是 AdS 的形状把它叫来的。
          </p>
        </Prose>
        <AnalogyBox title="无穷可缩放的城市地图">
          <p>
            普通地图有比例尺：1 厘米 = 1 千米。共形的“地图”更像一张可以捏着无限放大的矢量图，街区的交角保持不变，却找不到“这就是一米”的绝对标记。你仍能比较形状、角度、相对大小，只是世界不提供一把外带的铁尺。
          </p>
        </AnalogyBox>
      </div>

      <div className="space-y-4">
        <Subhead>3.4 Maldacena 1997：最著名的那一对</Subhead>
        <Prose>
          <p>
            Maldacena 给出的原型例子，课堂里可以只记轮廓：
          </p>
          <p>
            一边是 IIB 型超弦理论，活在 <strong>AdS₅ × S⁵</strong> 上——五维反德西特再乘一个五维球面，总共十维，正是超弦喜欢的舞台。另一边是四维的 <strong>N=4 超杨-米尔斯理论</strong>，一种高度对称的规范场论，常被叫作“最简的非平凡四维 CFT”。
          </p>
          <p>
            两边由几个参数锁在一起：场论的颜色数 N 很大时，体内的空间弯曲半径远大于弦的长度，几何变得平滑；场论的耦合很强时，体内的弦涨落很小，经典引力够用。于是出现后面要细讲的强弱对偶。
          </p>
          <p>
            维滕（Witten）以及古布瑟、克莱巴诺夫、波利亚科夫等人很快补上了计算规则：边界上的关联函数，等于体内某种引力场在边界附近按规定方式涨落时的配分函数。从此，全息从格言变成了可做作业的题目。
          </p>
        </Prose>
        <MediaStage
          kind="diagram"
          title={"AdS₅ × S⁵ 与边界场论"}
          purpose="中间是双向箭头：不是引力派生出场论，也不是反过来。"
        >
          <LessonImage
            src="/media/ads5-s5-duality.jpg"
            alt="左侧青色 AdS 柱面旁有金色小球，中间双向金箭，右侧是波动的场论网格"
            width={1280}
            height={720}
          />
        </MediaStage>
        <TeachTip>
          通识课不必解释超对称有几个 N。只要说：这是一个被对称性保护得很好、因而算得特别干净的玩具模型。像物理学里的圆球和无摩擦斜面。
        </TeachTip>
      </div>

      <div className="space-y-4">
        <Subhead>3.5 对偶意味着什么，不意味着什么</Subhead>
        <Prose>
          <p>
            <strong>意味着：</strong>每一个体内的物理过程，都对应边界上的某个过程；每一个边界上的可观测量，都对应体内的某个几何或场的量。两边的希尔伯特空间（量子态的总账）在对偶成立时应能对上。不是“有点像”，是“算出来应相同”。
          </p>
          <p>
            <strong>不意味着：</strong>边界上的人能用手摸摸体内的黑洞。两种描述不要叠罗汉。也不意味着我们已经有了真实宇宙的全息对偶。更不意味着时空是假的、粒子是真的，或反过来——对偶是民主的。
          </p>
        </Prose>
        <AnalogyBox title="双语小说，不是缩写本">
          <p>
            把《红楼梦》译成一部忠实的英文小说。中文里的一句诗，英文里有对应的一句；不是英文只保留情节大纲。AdS/CFT 自称是这种级别的忠实，而不是“用引力来模拟场论的动画片”。当然，现实中我们常用经典引力去<strong>近似</strong>强耦合场论——那是因为强弱对偶让这一侧突然好算，并不改变“对偶在理想情况下是等价”这句话。
          </p>
        </AnalogyBox>
        <MediaStage
          kind="image"
          title="板书上的圆柱与边界"
          purpose="给学生一个历史锚点：全息从原理变成可画在黑板上的对应。"
        >
          <LessonImage
            src="/media/ads-chalkboard.jpg"
            alt="绿色粉笔黑板：左侧弯曲柱面里有一颗星，双向箭头连到右侧方格平面"
            width={1280}
            height={720}
          />
        </MediaStage>
      </div>
    </LessonSection>
  );
}
