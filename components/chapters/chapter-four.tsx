import { RadialScaleDiagram } from "@/components/diagrams/radial-scale-diagram";
import { RTSurfaceDiagram } from "@/components/diagrams/rt-surface-diagram";
import { AnalogyBox } from "@/components/lesson/analogy-box";
import { Misconception, TeachTip } from "@/components/lesson/callouts";
import { DictionaryExplorer } from "@/components/lesson/dictionary-explorer";
import { DualitySlider } from "@/components/lesson/duality-slider";
import { FormulaCard } from "@/components/lesson/formula-card";
import { MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { DictionaryPoster } from "@/components/media/dictionary-poster";
import { RgFlowAnim } from "@/components/media/rg-flow";
import { WormholeAnim } from "@/components/media/wormhole";

export function ChapterFour() {
  return (
    <LessonSection
      id="ch4"
      eyebrow="第四讲"
      title="全息字典、强弱对偶、体-边界对应"
      subtitle="对偶要能用，必须有一本词典：体内的几何词汇，怎么翻译成边界的量子词汇。"
    >
      <div className="space-y-4">
        <Subhead>4.1 体-边界对应：谁在里面，谁在面上</Subhead>
        <Prose>
          <p>
            课堂里请把三个词分清：
          </p>
          <p>
            <strong>体（bulk）</strong>：AdS 内部，有径向深度，有引力。<strong>边界（boundary）</strong>：那张低一维的屏幕，住着 CFT。<strong>对应（correspondence）</strong>：两边的量一对一（或按规则多对一）翻译，而不是身体与影子那种残缺关系。
          </p>
          <p>
            有人把全息原理想成“只关心表面，里面随便”。AdS/CFT 恰恰相反：里面的每一块褶皱都要在表面上有着落；表面上的每一句闲话，也要在里面找得到几何。
          </p>
        </Prose>
        <AnalogyBox title="罐头标签与汤">
          <p>
            普通罐头：标签是广告，汤才是内容。全息罐头：标签上的文字如果写得足够精确，它就是汤的另一种完整说明书。你用勺子喝到的咸淡，必须能从标签的语法里算出来；你改标签上的一个动词，汤的波纹也得跟着改。
          </p>
        </AnalogyBox>
      </div>

      <div className="space-y-4">
        <Subhead>4.2 全息字典：先背最常用的五条</Subhead>
        <Prose>
          <p>
            字典不是一张死表，而是一套计算规程。入门课先把“词条”读熟。点开下面每一条，看体内和边界如何对译。
          </p>
        </Prose>
        <DictionaryExplorer />
        <MediaStage
          kind="diagram"
          title="可打印的全息字典"
          purpose="考试与讨论都可以看这张表。重点是会翻译，不是背公式。"
        >
          <DictionaryPoster />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>4.3 强弱对偶：越黏糊的汤，越适合用地形图</Subhead>
        <Prose>
          <p>
            量子场论在耦合弱的时候好算：粒子几乎自由，碰撞是小扰动，费曼图一张张加。耦合一强，所有图都同等重要，微扰论塌方。偏偏大自然不体贴——夸克胶子等离子体、某些高温超导体、奇异金属，都处在“勺子搅不动”的区间。
          </p>
          <p>
            AdS/CFT 的礼物是：<strong>场论最难的地方，往往对应体内最好算的地方</strong>——弯曲半径大、弦的量子涨落小，经典爱因斯坦方程就够。反过来，场论很稀很淡、很好算时，体内的弦论自己变得很量子，几何直打哆嗦。所以这不是作弊，是把难度搬到另一张桌子上。
          </p>
        </Prose>
        <DualitySlider />
        <AnalogyBox title="俯拍拥挤的广场">
          <p>
            广场上人山人海，你在人群里数人会疯。改去无人机上拍：密集的人流变成平滑的密度和流速，流体力学突然好用。全息里的经典引力，常常就是那张无人机航拍。航拍不是人群的假象，它是强耦合时最自然的语言。人少的清晨，航拍反而没用，你得回到一个一个数。
          </p>
        </AnalogyBox>
        <Misconception
          wrong="用爱因斯坦方程去算场论，说明场论“其实就是引力”，或者说明计算只是近似所以对偶不成立。"
          right="经典引力是对偶在大 N、强耦合极限下的好用版本，如同用热力学代替 10²³ 个分子的牛顿方程。对偶在极限外仍可成立，只是两边都变难。"
        />
      </div>

      <div className="space-y-4">
        <Subhead>4.4 径向方向就是放大倍率</Subhead>
        <RadialScaleDiagram />
        <Prose>
          <p>
            场论里有一套叫重整化群（RG）的粗粒化手续：先看短距离、高能量的细节，再一步步模糊，留下长距离、低能量的有效故事。AdS 把这套手续画成了空间里的一条轴。靠近边界，对应紫外、短距、高能；走进体内，对应红外、长距、低能。若体内深处出现黑洞视界，边界理论常常进入有限温度、甚至“热化”过的流体阶段。
          </p>
        </Prose>
        <AnalogyBox title="地图 App 的缩放条">
          <p>
            把手机地图拉到最大，你看见商店门牌，那是紫外。两指捏小，门牌消失，剩下街区和高速，那是红外。AdS 的径向坐标就是这根缩放条，只不过它被升级成了时空的一维。
          </p>
        </AnalogyBox>
        <MediaStage
          kind="animation"
          title="从边界走进体内 = 连续粗粒化"
          purpose="多出来的那一维，是观察尺度。点播放，看扫描框从细格子走到粗格子。"
        >
          <RgFlowAnim />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>4.5 纠缠也能量：Ryu-Takayanagi</Subhead>
        <RTSurfaceDiagram />
        <Prose>
          <p>
            2006 年，Ryu 与 Takayanagi 写出一条后来极其重要的词条：边界上某区域 A 与外界的纠缠熵，等于体内那张以 A 的边缘为边界、面积最小的曲面的面积（除以 4Gℏ）。量子信息里最抽象的“牵绊有多深”，变成了几何课上的“最短的膜有多大”。
          </p>
        </Prose>
        <FormulaCard
          name="Ryu–Takayanagi 公式（示意）"
          formula="S_A = Area(γ_A) / 4 G_N ℏ"
          meaning="γ_A 是伸进体内、挂在区域 A 边缘上的极小曲面。它把黑洞熵的面积定律，推广到没有黑洞、只有纠缠的日常量子系统。"
        />
        <AnalogyBox title="隔开两位舞者的最小布帘">
          <p>
            舞台左边一位舞者，右边一位。她们动作同步的程度（纠缠），不必询问内心，去看那块把舞台隔开、又绷得最省布料的帘子有多大。帘子越大，两边能共享的秘密越多。这当然是比喻，但 RT 公式的精神就是把“共享秘密的量”写成布料面积。
          </p>
        </AnalogyBox>
        <TeachTip>
          若学生问“纠缠熵到底是什么”，用贝尔实验或一双手套：左右口袋各一只，你看见左是左手套，立刻知道右是右手套。熵衡量的是这种“看见这边就锁定那边”的程度，不是温度计上的热。
        </TeachTip>
      </div>

      <div className="space-y-4">
        <Subhead>4.6 时空也许是织出来的</Subhead>
        <Prose>
          <p>
            一旦纠缠对应面积，一个更大胆的念头就出现了：体内两点之间还算不算“连在一起”，取决于边界上相应自由度还纠不纠缠。纠缠拆掉，空间就可能裂开。Van Raamsdonk 等人用对偶把这讲成一幅图画——时空的连通性，像是由量子纠缠缝合的。
          </p>
          <p>
            这仍是正在生长的研究，不是课堂定理。但学生应当听见这件事：全息字典不仅翻译已有的词，它还暗示<strong>空间本身可能是一种导出物</strong>，更底层的是量子信息。
          </p>
        </Prose>
        <MediaStage
          kind="animation"
          title="两份边界理论缝出一座虫洞"
          purpose="拖动纠缠强度：够强则体内连通，太弱则细腰勒断。几何可以从信息里长出来。"
        >
          <WormholeAnim />
        </MediaStage>
      </div>
    </LessonSection>
  );
}
