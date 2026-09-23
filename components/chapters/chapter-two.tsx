import { HologramDiagram } from "@/components/diagrams/hologram-diagram";
import { AnalogyBox } from "@/components/lesson/analogy-box";
import { Misconception, TeachTip } from "@/components/lesson/callouts";
import { LessonImage, MediaStage } from "@/components/lesson/media-stage";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { HologramTurnAnim } from "@/components/media/hologram-turn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChapterTwo() {
  return (
    <LessonSection
      id="ch2"
      eyebrow="第二讲"
      title="宇宙是一张全息图"
      subtitle="'t Hooft 与 Susskind 把面积定律从“黑洞的怪癖”提升成量子引力的组织原则。"
    >
      <div className="space-y-4">
        <Subhead>2.1 1990 年代：重力太拥挤，必须降维</Subhead>
        <Prose>
          <p>
            1993 年，赫拉尔杜斯·{"'t Hooft"}（Gerard {"'t Hooft"}）写了一篇如今常被追溯为全息原理宣言的短文，精神可以叫<strong>量子引力中的降维</strong>。他的观察很泼辣：如果自由度真的按体积来数，量子引力会有太多状态，多到与黑洞熵对不上，也多到让理论自己别扭。解决办法不是再发明一种粒子，而是承认：<strong>真正的独立自由度，活在比我们看见的更少的维度里</strong>。
          </p>
          <p>
            一年后，伦纳德·萨斯坎德（Leonard Susskind）把这个想法写成更广为人知的论文标题：<strong>The World as a Hologram</strong>——世界即全息图。他不仅赞同降维，还把光学里的全息术认真当成物理隐喻：三维景象的全部信息，可以编码在二维干涉图样上；激光一照，立体世界“再长出来”。在量子引力里，那张二维图样就是区域的边界。
          </p>
        </Prose>
        <HologramDiagram />
        <MediaStage
          kind="image"
          title="实验室里的全息片"
          purpose="先让眼睛承认：扁平纹路被光照之后，真能“长”出立体。"
        >
          <LessonImage
            src="/media/optical-hologram-lab.jpg"
            alt="激光打在彩虹干涉底片上，右侧浮现立体的马头棋"
            width={1280}
            height={720}
          />
        </MediaStage>
        <MediaStage
          kind="animation"
          title="照片是平的，全息会转出侧面"
          purpose="对照普通照片：怎么转都是一张纸。全息原理借用的是这种编码，不是商场橱窗贴膜。"
        >
          <HologramTurnAnim />
        </MediaStage>
        <MediaStage
          kind="image"
          title="同一颗棋子，两种写法"
          purpose="左边是平面记录，右边是把立体编码进一张片。物理全息比这更绝：两边都完整。"
        >
          <LessonImage
            src="/media/hologram-vs-photo.jpg"
            alt="左侧一张平面国王棋照片，右侧全息片上立起半透明的立体棋子"
            width={1280}
            height={720}
          />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>2.2 {"'t Hooft"}：把体积里的粒子，改写成边界上的像素</Subhead>
        <Prose>
          <p>
            {"'t Hooft"} 的核心观点可以讲成一句很土的话：<strong>别在房间里面数豆子了，去数墙纸上的格子。</strong>每一个普朗克面积大小的边界补丁，最多能记下大约一个比特（更精确些是 1/4 个自然单位的熵）。体积中的场、粒子、几何起伏，都必须能翻译成这些边界像素的花样。如果翻译不过去，那种自由度在量子引力里根本不该存在。
          </p>
          <p>
            这叫“降维”，不是把三维人压成纸片人，而是说：描述三维世界所需的独立数据，只要二维就够。就像一份建筑施工图：楼是立体的，但足以重建它的信息，可以画在几张平面图纸上。图纸不是楼的“简化版”，在理想情况下，它就是楼的完整说明书。
          </p>
        </Prose>
        <AnalogyBox title="施工图与大楼">
          <p>
            物业经理若有一套无穷精确的图纸（钢筋、管线、每颗螺丝），他不必钻进墙里也能知道大楼的一切。全息原理比这更绝：它声称在量子引力里，<em>不存在</em>图纸以外的额外秘密。墙里若还有图纸没写的独立机关，熵就会超标，理论会自己打架。
          </p>
        </AnalogyBox>
      </div>

      <div className="space-y-4">
        <Subhead>2.3 Susskind：屏幕上的世界，和屏幕后的世界</Subhead>
        <Prose>
          <p>
            Susskind 特别强调一个容易绕晕的点：全息不是“我们是假的，真世界在膜上”。更妥当的说法是：<strong>同一套物理，有两种呈现</strong>。一种呈现看起来像有体积、有引力、有黑洞；另一种呈现是边界上的量子系统，不一定有引力。你不能把两种呈现叠在一起当两套独立实体，否则会重复计算——这与黑洞互补的精神很近：落下的人与远处的人各有描述，但不能同时用。
          </p>
          <p>
            他也把弦论拉了进来。弦论里的弦、膜、额外维，为“边界上怎么装得下这么多信息”提供了候选语言。当时还没有人写出后来那种干净的 AdS/CFT 公式，但方向已经从哲学口号转向“也许能找到一个具体模型”。
          </p>
        </Prose>
        <AnalogyBox title="皮影戏与戏台">
          <p>
            看皮影：屏幕上的影子是扁平的，故事却是立体的爱恨。你可以说“真的是皮人在动”，也可以说“真的是影子在演”。全息原理偏向一种更绝的立场：这两句话若都算完整，它们必须说的是同一出戏。去问“到底哪边才是真的”，有点像问“中文小说和它的忠实英文译本哪本才是故事本身”。
          </p>
        </AnalogyBox>
        <Misconception
          wrong="全息原理已经证明我们生活在计算机模拟里，边界是一台外星电脑。"
          right="物理上的全息是关于信息如何编码、两种理论如何等价，并不自动等于“模拟假说”。后者是额外的哲学加料，课堂里应明确标成加料。"
        />
      </div>

      <div className="space-y-4">
        <Subhead>2.4 两人观点对照</Subhead>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{"'t Hooft"} · 降维</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-sans text-sm leading-relaxed text-muted-foreground">
              <p>问题意识：量子引力的自由度若按体积数，会多到与黑洞熵冲突。</p>
              <p>主张：真实自由度住在边界上，按普朗克面积像素化。</p>
              <p>风格：从信息计数和自洽性出发，偏“必须如此”。</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Susskind · 全息图</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-sans text-sm leading-relaxed text-muted-foreground">
              <p>问题意识：如何把降维说成一种物理上可想象的编码。</p>
              <p>主张：体积中的世界是边界信息的全息重建；注意互补，避免双重记账。</p>
              <p>风格：从弦论与黑洞互补出发，偏“可以这样实现”。</p>
            </CardContent>
          </Card>
        </div>
        <Prose>
          <p>
            合在一起，全息原理的课堂定义可以写成：
          </p>
          <p>
            <strong>
              在包含引力的量子理论里，任意区域的物理都可以由该区域边界上的理论来描述；其信息量不超过边界面积（以普朗克单位计）所能容纳的信息。
            </strong>
          </p>
          <p>
            注意几个限定词。“包含引力”——普通量子场论不必全息；“可以描述”——是等价，不是诗意比喻；“不超过”——是上限，具体理论可能用得更省。
          </p>
        </Prose>
        <MediaStage
          kind="image"
          title="像素化的视界"
          purpose="把降维画成可数的格子：灯只在表面上，体内不再堆独立的小灯。"
        >
          <LessonImage
            src="/media/pixelated-horizon.jpg"
            alt="黑洞视界由青金两色小方格铺成，内部完全黑暗"
            width={1280}
            height={720}
          />
        </MediaStage>
      </div>

      <div className="space-y-4">
        <Subhead>2.5 口号还缺一块拼图</Subhead>
        <Prose>
          <p>
            1994 年的全息原理很美，但还不好算。人们缺少一个真正写得下来的例子：左边是某种引力理论的拉氏量，右边是某种量子场论的拉氏量，中间有一本可查的词典，两边算出同一个数。没有这本词典，全息仍像一句深刻的格言。
          </p>
          <p>
            1997 年，胡安·马尔达西那（Juan Maldacena）交出了这块拼图。下一批关键词是 AdS、CFT，以及那道从此写进量子引力现代史的对应关系。
          </p>
        </Prose>
        <TeachTip>
          第二讲收尾用两分钟让学生用自己的话区分三件事：全息图（光学）、全息原理（信息与引力）、模拟假说（哲学）。分不清这三件事，后面的 AdS/CFT 一定会幻听。
        </TeachTip>
      </div>
    </LessonSection>
  );
}
