import { BlackHoleAreaDiagram } from "@/components/diagrams/black-hole-area-diagram";
import { AnalogyBox } from "@/components/lesson/analogy-box";
import { Misconception, TeachTip } from "@/components/lesson/callouts";
import { FormulaCard } from "@/components/lesson/formula-card";
import { LessonImage, LessonVideo, MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { HawkingRadiationAnim } from "@/components/media/hawking-radiation";
import { ParadoxFlow } from "@/components/media/paradox-flow";

export function ChapterOne() {
  return (
    <LessonSection
      id="ch1"
      eyebrow="第一讲"
      title="黑洞把物理学家逼到墙角"
      subtitle="全息思想不是某天有人拍脑袋说“宇宙是全息图”。它是被黑洞热力学、面积熵和信息悖论一步步挤出来的。"
    >
      <div className="space-y-4">
        <Subhead>1.1 先把三个词放在桌上：黑洞、视界、信息</Subhead>
        <Prose>
          <p>
            黑洞在流行文化里像一台宇宙吸尘器：什么都吸，什么都不吐。物理课上的说法更克制：它是一块引力强到连光都跑不出来的区域。那条“过了就回不来”的界线，叫<strong>事件视界</strong>。视界不是一堵水泥墙，更像一条单行线的法律边界——你在外面看，光线和信号到此为止；对掉进去的人（如果潮汐力没先把人撕碎），当地暂时未必有特殊的撞击感。
          </p>
          <p>
            信息在这里不是“新闻”，而是更土的意思：把一个系统从其他可能的状态里区分出来，需要多少个是/否问题。一串密码、一本书、一屋子空气分子的位置和速度，都是信息。量子物理有条很硬的规矩：信息可以搅乱、可以藏起来，但不该凭空蒸发。这叫<strong>幺正性</strong>，你可以把它听成“世界的账本必须能对上”。
          </p>
        </Prose>
        <AnalogyBox title="衣柜门，不是房间本身">
          <p>
            想象一间步入式衣帽间。你通常觉得：衣服越多，房间越大，能记住的穿搭方案就越多——信息跟着<strong>体积</strong>走。全息原理后来会说：在极致的引力世界里，真正限制你能装下多少故事的，不是房间多大，而是<strong>门帘和墙壁的面积</strong>。这就像有人告诉你：整座衣帽间的目录，其实都印在门帘上。
          </p>
        </AnalogyBox>
      </div>

      <div className="space-y-4">
        <Subhead>1.2 热力学闯进了引力世界</Subhead>
        <Prose>
          <p>
            1970 年代以前，黑洞在爱因斯坦的广义相对论里是很“冷”的几何对象：给定质量、角动量、电荷，它几乎没有个性。惠勒把这叫“黑洞无毛”——外面的人看不清里面曾经掉进去的是钢琴还是沙发，只看见那几个宏观参数。
          </p>
          <p>
            可热力学是一门关于“乱”的学问。熵，粗浅地说，就是“这个宏观外表背后藏着多少微观故事”。一杯温水和一块冰如果能量相同，温水的微观故事多得多。克劳修斯以来，物理学家相信：一个孤立系统的熵不会自己变少。那如果我把一杯热咖啡倒进黑洞呢？咖啡的熵似乎从宇宙账本上消失了。这让人坐立不安。
          </p>
          <p>
            贝肯斯坦当时还是研究生。他做了一个在当时看来几乎无礼的猜想：黑洞必须自己拥有熵，而且熵要大到足以吞下掉进去的一切，这样热力学第二定律才能保住。更惊人的是，他主张这个熵不跟黑洞的体积成正比，而跟<strong>视界面积</strong>成正比。
          </p>
        </Prose>
        <MediaStage
          kind="image"
          title="贝肯斯坦思想实验"
          purpose="看见冲突：若黑洞没有熵，咖啡的乱度会失踪；若黑洞有熵，它必须写在面积上。"
        >
          <LessonImage
            src="/media/bekenstein-coffee-blackhole.jpg"
            alt="热咖啡的蒸汽指向黑洞，视界金环外还有一圈虚线，表示面积增大"
            width={1280}
            height={720}
          />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>1.3 霍金辐射：黑洞也会“出汗”</Subhead>
        <Prose>
          <p>
            贝肯斯坦的面积熵起初不被看好。霍金本人就很怀疑：熵对应温度，有温度就该发光；黑洞真的会发光吗？1974 年前后，霍金把量子场论放到弯曲时空里算，得出一个让他自己都吃惊的结果：黑洞确实有温度，会向外辐射，今天叫<strong>霍金辐射</strong>。质量越小的黑洞越烫，会蒸发得越快；恒星级黑洞则冷得可怜，比宇宙微波背景还冷，实际上在“吸热”多于“发光”。
          </p>
          <p>
            温度一对上，熵的公式也就定死了。这就是贝肯斯坦-霍金熵。它大概是 20 世纪最漂亮、也最让人睡不着的公式之一：黑洞的熵等于视界面积除以 4 个普朗克面积。普朗克长度大约是 10⁻³⁵ 米，小到不可思议，所以恒星级黑洞的熵极大——一个太阳质量黑洞的熵，远大于同样质量的普通物质。
          </p>
        </Prose>
        <div className="grid gap-3 md:grid-cols-2">
          <FormulaCard
            name="贝肯斯坦-霍金熵"
            formula="S = k_B c³ A / (4 G ℏ)  =  A / (4 ℓ_P²)"
            meaning="A 是视界面积，ℓ_P 是普朗克长度。自然单位制下常写成 S = A/4。每一个普朗克格点大约对应 1/4 个信息单位。"
          />
          <FormulaCard
            name="霍金温度"
            formula="T = ℏ κ / (2π k_B c)"
            meaning="κ 是表面重力，可粗浅地想成“视界附近掉下去的加速度”。黑洞越轻、越小，温度越高。"
          />
        </div>
        <MediaStage
          kind="animation"
          title="视界旁的粒子对"
          purpose="把“黑洞会发光”变成可看见的过程：一半掉进去，逃出的那一半看起来像热噪声。点播放。"
        >
          <HawkingRadiationAnim />
        </MediaStage>
        <TeachTip>
          课堂里把常数念一遍即可，不要卡在单位换算。强调结构：S 正比于 A，分母里出现 G 和 ℏ，说明这是引力与量子第一次正式牵手。
        </TeachTip>
      </div>

      <div className="space-y-4">
        <Subhead>1.4 为什么“面积定律”颠覆常识</Subhead>
        <BlackHoleAreaDiagram />
        <Prose>
          <p>
            统计力学里，熵大体上跟粒子数成正比，粒子数又跟体积成正比。一箱气体，箱子加高一倍，微观状态数指数级膨胀。可黑洞告诉你：把物质不断往一个区域里塞，最终它会塌成黑洞；而黑洞的信息容量只按<strong>边界面积</strong>来算。于是出现一条令人不适的上限：任何区域能装下的信息，不能超过同样面积的黑洞。这就是后来常说的<strong>贝肯斯坦界</strong>一类结果的精神。
          </p>
          <p>
            换个说法：体积里看起来有无数点，但真正独立的自由度，似乎不够填满体积。多出来的那些，要么不独立，要么会被引力“收走”。空间好像没有我们以为的那么丰满。
          </p>
        </Prose>
        <AnalogyBox title="图书馆的藏书量由墙皮决定">
          <p>
            普通图书馆：楼层越高、房间越深，书架越多。黑洞式图书馆：无论你往里挖多少层，最终能编进目录的书，不能超过外墙粉刷面积所能写下的字。再往里塞书，整座楼就会塌成一个更小、更黑的“馆”，而新馆的目录仍然只写在外墙上。
          </p>
        </AnalogyBox>
        <Misconception
          wrong="面积定律只是说黑洞表面很重要，跟我们住的普通空间无关。"
          right="黑洞给出的是信息容量的上限。任何区域如果装的信息比这更多，它自己就会先变成黑洞。所以这是对整个量子引力的约束，不只是“黑洞学”的边角料。"
        />
      </div>

      <div className="space-y-4">
        <Subhead>1.5 信息悖论：一本被烧掉的日记</Subhead>
        <Prose>
          <p>
            霍金辐射看起来是热的。热辐射几乎不记得燃料原来是什么——壁炉里烧的是家书还是旧报纸，烟的味道区别很小。如果黑洞蒸发到最后消失，而辐射又是纯热的，那么掉进去的那本日记就真正没了。这与量子力学的幺正性打架。这就是<strong>黑洞信息悖论</strong>。
          </p>
          <p>
            此后数十年，物理学家分成许多营地。有人宁愿改量子力学；有人认为信息藏在辐射极细微的关联里；有人提出“黑洞互补”——外面的人和掉进去的人各有一套自洽描述，但不能用同一本账；后来还有火墙争论。课堂不必裁决。要让学生看见的是：<strong>一旦熵写在面积上，信息就很像“住在边界上的东西”</strong>。体内也许只是边界账本的一种投影。
          </p>
        </Prose>
        <AnalogyBox title="烧日记与看烟">
          <p>
            你把日记扔进壁炉。如果烟是完全随机的热噪声，日记内容就从宇宙里删掉了。量子力学像一位死板的会计，不允许删账。全息思想的直觉是：日记其实从未走进炉心深处，它的字从一开始就写在炉壁上；你看见的火焰与烟，是炉壁上那些字的另一种读法。
          </p>
        </AnalogyBox>
        <MediaStage
          kind="diagram"
          title="信息悖论三步"
          purpose="把悖论收成一张可讨论的图。底下那条虚线，是后面全息思想要走的路。"
        >
          <ParadoxFlow />
        </MediaStage>
        <MediaStage
          kind="video"
          title="真正拍到的黑洞：对准 M87 中心"
          purpose="先用观测压住“这是不是科幻”，然后立刻回到面积公式：真正奇怪的是 S 跟面积成正比。"
          credit="影像：ESO/L. Calçada、Digitized Sky Survey 2、ESA/Hubble、RadioAstron、De Gasperin 等、Kim 等、EHT Collaboration。音乐：Niklas Falcke。CC BY 4.0。来源 https://www.eso.org/public/videos/eso1907c/"
        >
          <LessonVideo
            src="/media/eso1907c-m87-zoom.mp4"
            poster="/media/eht-m87.jpg"
            title="Zooming in to the Heart of Messier 87"
          />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>1.6 线索汇合：最大信息量写在表面上</Subhead>
        <Prose>
          <p>
            到这里，三条线索拧成一股：
          </p>
          <p>
            第一，黑洞有熵，熵在面积上。第二，任何区域的信息都有一个面积上限，否则它自己先变成黑洞。第三，若信息不能消失，而体内又好像装不下那么多独立细节，那么最省事的记账方式，就是把账记在边界上。
          </p>
          <p>
            还没有人写出“全息原理”这五个字，但方向已经清楚：量子引力也许不是一种住在体积里的普通场论，而是一种<strong>住在边界上的理论</strong>，体积中的几何只是它的全息再现。下一讲，{"'t Hooft"} 和 Susskind 会把这层窗户纸捅破。
          </p>
        </Prose>
        <TeachTip>
          第一讲结束时做一次 90 秒口头回放：请一位同学只用“衣柜、图书馆、壁炉”三个比喻，复述面积熵与信息悖论。不要让人开始写度规。
        </TeachTip>
      </div>
    </LessonSection>
  );
}
