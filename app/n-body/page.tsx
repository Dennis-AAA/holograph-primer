import type { Metadata } from "next";
import Link from "next/link";
import { Aperture } from "lucide-react";
import { NBodyLab } from "@/components/nbody/nbody-lab";
import { SpatialLab } from "@/components/nbody/spatial-lab";
import { Prose, Subhead } from "@/components/lesson/section";

export const metadata: Metadata = {
  title: "九大行星为什么还稳定 · N 体周期解",
  description:
    "超过三体并不等于每条轨道都混沌。九体既有会散掉的周期解，也有线性稳定的麦克斯韦环。页面里的动画直接跑牛顿方程，并标出正在使用的积分器。",
};

export default function NBodyPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Aperture className="size-4" />
            </span>
            <span className="font-heading text-base font-semibold tracking-tight">回到全息课堂</span>
          </Link>
          <p className="font-sans text-xs text-muted-foreground">牛顿 N 体 · 积分器可见</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <p className="mb-2 font-sans text-xs font-medium tracking-[0.22em] text-primary uppercase">
          N 体
        </p>
        <h1 className="max-w-4xl font-heading text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          九大行星稳，是因为太阳太重；九体也有严格的周期解
        </h1>
        <Prose className="mt-6 max-w-3xl">
          <p>
            历史上的九大行星是水星到冥王星。把太阳算进去，这是一个 10 体问题。它能在太阳系年龄里保持大行星轨道不散，靠的是质量等级和轨道间隔，不是因为“九”这个数字特殊，也不是因为方程存在通解。
          </p>
          <p>
            超过三体之后，方程一般不可积，但相空间里同时有周期轨道、准周期环面和混沌区。下面每条轨道都用同一个牛顿求和在积分，右栏写着当前格式的更新步骤、抽样星的 r / v / a，以及能量和角动量的相对误差。
          </p>
        </Prose>

        <div className="mt-8">
          <NBodyLab />
        </div>

        <section className="mt-14 space-y-6 border-t border-border/70 pt-12">
          <Subhead>离开平面：三维里的周期解</Subhead>
          <Prose>
            <p>
              上面那些轨道都躺在一个平面里。把平面解嵌进三维空间，第三维坐标恒为零，它仍然是牛顿方程的解，但质点之间的相对运动没有高度。真正的空间周期解要求轨迹不能通过旋转和平移全部压到一张平面上。
            </p>
            <p>
              牛顿引力里没有非平面的相对平衡：正四面体不能像拉格朗日三角形那样刚体旋转。空间周期解靠的是形状本身在变。下面按族切换。每一条都用三维牛顿求和积分，右栏可以换速度 Verlet、Yoshida 4 和经典 RK4。金色线段是 z 轴。
            </p>
          </Prose>
          <SpatialLab />
          <Prose>
            <p>
              <strong>Hip-hop，10 条。</strong>
              质点数从 4 到 20，全是偶数。初值是正多边形加上相反的垂直速度，切向速度再调到惯性系里尽量闭合。四体有两条，垂直幅度不同。用 Yoshida 4 积一个周期，大多数状态误差在 1% 上下；二十体约 2.9%，多转会漂。
            </p>
            <p>
              <strong>编织环，10 条。</strong>
              一颗较重的中心，加上 4 到 16 颗等质量卫星，相邻卫星倾角相反。卫星越多，中心就越重，相互引力只是修正。一个周期的状态误差大约 0.3% 到 1.3%。
            </p>
            <p>
              <strong>环面纽结编舞没有放进积分器。</strong>
              Calleja、García-Azpeitia、Lessard 与 Mireles James 在 2021 年用区间算术证明了一批空间编舞：4 体 6 条（共振 10:9、6:5、14:11、18:13、10:7、14:9），5 体 1 条三叶结（3:1），7 体 6 条，9 体 2 条。论文附录只给了旋转坐标系里其中一颗星在初始时刻的位置和速度。其余星体要由整条傅里叶曲线经对称性生成，完整初值在他们的 MATLAB 数据包里，这份数据现在取不到。用低阶环面曲线去凑牛顿加速度，残差下不来。没有闭合的轨道就不放进画布。
            </p>
          </Prose>
        </section>

        <section className="mt-14 space-y-8 border-t border-border/70 pt-12">
          <Subhead>为什么九大行星系统是实际稳定的</Subhead>
          <Prose>
            <p>
              太阳约占系统质量的 99.86%。每颗行星的主导运动是绕太阳的开普勒椭圆，其他行星的拉力是小修正。轨道又接近圆形、接近同一个平面，而且彼此离得够远，希尔球没有叠在一起。系统因此贴在“九个互不耦合的开普勒问题”旁边。KAM 理论说，可积系统受到足够小的扰动时，大部分准周期环面还在；Nekhoroshev 估计则说作用量只会以极慢的速度漂。
            </p>
            <p>
              这是天文时间上的实际稳定，不是一条周期轨道的李雅普诺夫稳定，也不是永恒稳定的定理。Laskar 在 1989 年指出内太阳系是弱混沌，邻近轨道大约每 500 万年分离一个 e 倍。混沌在这里的意思是预报会发散，不是行星马上被抛出。外行星在数十亿年里非常规则。Laskar 与 Gastineau 在 2009 年的大量积分里，水星在 50 亿年内大约有 1% 的机会把偏心率加到能和金星轨道交叉。冥王星与海王星锁在 3:2 平运动共振里，共振把冥王星的近日点维持在远离海王星的位置。2006 年国际天文学联合会把冥王星定为矮行星；动画里仍保留它，因为问题问的是那套九大行星。
            </p>
            <p>
              动画里的九大行星用了真实的质量量级，轨道半径则压紧了。水星到冥王星的真实周期相差大约六百倍，外行星在屏幕上会像钉住一样。质量保持 ×1 时，各行星到太阳的距离只做百分之几的呼吸。放到 ×5，压缩后的轨道开始明显变形；放到 ×20，相互引力大到会把这套紧凑系统撕开。真实太阳系比这套演示疏得多。
            </p>
          </Prose>

          <Subhead>超过三体，不是每条轨道都混沌</Subhead>
          <Prose>
            <p>
              二体问题可积，通解是圆锥曲线。三体及更多体，除了能量、动量和角动量，一般不再有足够的整体解析首次积分，这是 Bruns 和 Poincaré 的结论。不可积只说明写不出覆盖全部初值的公式解。同一套方程里，有的初值落在周期轨道上，有的落在准周期环面上，有的进入混沌海，有的在近距交会后逃逸。
            </p>
            <p>
              所以九体可以很稳，也可以很散。麦克斯韦环和等质量九边形用的是同一类相对平衡，差别主要在中心质量。浅色空心点是挪开一点点的邻近轨道：稳定时它贴着原轨道走，不稳定时它很快分叉。
            </p>
          </Prose>

          <Subhead>已经知道的周期解，包含九体</Subhead>
          <Prose>
            <p>
              <strong>麦克斯韦环（九体，严格周期，中心质量足够大时线性稳定）。</strong>
              一颗大质量位于中心，八颗等质量卫星排成正八边形，以同一角速度旋转，相互距离不变。这是相对平衡，因而在惯性系里是周期解。动画里中心质量是每颗卫星的 400 倍，约占系统质量的 98%。给其中一颗 0.2% 的速度扰动，半径只做千分之几的振荡。麦克斯韦在 1859 年用这个图像讨论土星环：中心质量占优时环可以稳定，等质量的正多边形则不行。
            </p>
            <p>
              <strong>等质量正九边形（九体，严格周期，线性不稳定）。</strong>
              角速度按正多边形的径向力平衡来取，所以不加扰动时它会永远转下去。加上 0.2% 的速度扰动，一圈之内多边形就裂开。周期解存在，和它稳不稳，是两件事。
            </p>
            <p>
              <strong>三体八字舞（严格周期，线性稳定）。</strong>
              三颗质量相等的质点沿同一条 8 字形曲线追逐，G = 1 时周期约 6.326。Cris Moore 在 1993 年找到这条轨道，Chenciner 与 Montgomery 在 2000 年证明它存在，Kapela 与 Simó 用计算机辅助证明了它的线性稳定。它是目前唯一被证明稳定的等质量编舞。质量的相对差别超过大约 10⁻⁵ 之后，这份稳定性就不再保持。
            </p>
            <p>
              <strong>四体链编舞（数值周期解，不稳定）。</strong>
              Simó 在 2001 年给出了一批等质量编舞的初值。四体链的公开数字大约到 6 位。用四阶辛格式积分，一个周期后位置误差约 10⁻⁴；从第二周期起，不稳定把这点截断误差放大，轨道离开曲线。n ≥ 4 的编舞有很多数值例子，包括九体，但目前没有第二个被证明稳定的编舞。
            </p>
            <p>
              <strong>拉格朗日等边三角形。</strong>
              三体始终组成等边三角形并整体旋转，角速度满足 ω² = G(m₁+m₂+m₃)/a³。Routh 判据说它线性稳定的条件是总质量的平方大于 27 倍的两两质量乘积之和。质量 1、0.02、0.001 满足；三颗质量都是 1 就不满足。太阳、木星和特洛伊小行星是前一种。欧拉共线的相对平衡同样是周期解，而且总是不稳定，动画里没有单列。
            </p>
            <p>
              <strong>三维三体，以及更多体的 hip-hop。</strong>
              李晓明与廖世俊在 2025 年用机器搜索给出 10059 条空间三体周期轨道，其中大约两成线性稳定，并包含 21 条等质量三维编舞和一类“钢琴三重奏”：两颗星共一条空间曲线，第三颗走另一条。页面上的 O₃(1)、O₂(1.2)、O₂₃₁(1) 和 O₆(0.6) 取自他们的初值表。Chenciner 与 Venturelli 在 2000 年证明，每个偶数 2N（N≥2）都有 hip-hop 族：质点排成反棱柱，在扁平多边形和更立体的构型之间起伏，同时整体转动。四体那条在惯性系里大约能回到 1.5%，多转几圈会漂，文献里这类解一般也不稳定。
            </p>
            <p>
              <strong>九大行星本身不是严格周期解。</strong>
              行星质量取零、周期又可以公度时，限制性多体问题有严格周期解。真实质量下，系统是这族解附近的准周期运动，外加内太阳系那层很慢的混沌扩散。
            </p>
          </Prose>

          <Subhead>屏幕上的积分器在做什么</Subhead>
          <Prose>
            <p>
              每一步先算加速度。第 i 颗星的加速度是对所有其他星的牛顿求和：aᵢ = Σⱼ G mⱼ (rⱼ − rᵢ) / |rⱼ − rᵢ|³。右栏按所选格式把这次求和写成更新规则。
            </p>
            <p>
              辛 Euler 先用加速度改速度，再用新速度改位置。速度 Verlet 把速度更新拆成前后各半步，中间移动位置。Yoshida 4 用三步 Verlet，步长系数是 w₁、w₀、w₁，其中 w₁ = 1/(2−2^(1/3))。这三种都是辛格式，长时能量误差以振荡为主。经典 RK4 把四个斜率做加权平均，短时间很准，但不是辛格式，步长偏大时能量误差会朝一个方向累积。
            </p>
            <p>
              想把这件事看清楚，打开开普勒椭圆，按下「粗步长 0.22」，在速度 Verlet 和 RK4 之间切换。Verlet 的 ΔE/|E₀| 会停在大约百分之几的带子里；RK4 会随着圈数爬升。九大行星若用这个步长，近距误差会不可信，所以那一场景的默认步长小得多。专业的太阳系长时积分通常用 Wisdom–Holman 映射：开普勒部分用解析解推进，只对行星之间的小扰动做数值步。本页故意不用它，好把牛顿求和和格式本身留在屏幕上。
            </p>
          </Prose>
        </section>
      </main>
    </>
  );
}
