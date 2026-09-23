import Image from "next/image";
import { LessonSection } from "@/components/lesson/section";

const kit = [
  {
    when: "开场 / 第二讲",
    src: "/media/optical-hologram-lab.jpg",
    alt: "光学全息实验室",
    note: "全息实验室插画 + 照片/全息对照 + 可播放的转动动画。",
  },
  {
    when: "第一讲",
    src: "/media/bekenstein-coffee-blackhole.jpg",
    alt: "咖啡落入黑洞",
    note: "贝肯斯坦插画、霍金辐射动画、信息悖论流程，以及 ESO 的 M87 拉近视频。",
  },
  {
    when: "第二讲",
    src: "/media/pixelated-horizon.jpg",
    alt: "像素化视界",
    note: "视界像素插画，用来讲降维。",
  },
  {
    when: "第三讲",
    src: "/media/ads-chalkboard.jpg",
    alt: "AdS 板书",
    note: "光线往返动画、AdS₅×S⁵ 对偶图、粉笔板书。",
  },
  {
    when: "第四讲",
    src: "/media/ads5-s5-duality.jpg",
    alt: "对偶图",
    note: "字典海报、RG 扫描动画、可拖动的虫洞。",
  },
  {
    when: "第五讲 / 收束",
    src: "/media/eht-m87.jpg",
    alt: "M87 黑洞",
    note: "长毛黑洞、电阻曲线、离子碰撞动画、STAR 照片，以及四帧收束片。",
  },
];

export function MediaKit() {
  return (
    <LessonSection
      id="media"
      eyebrow="教具"
      title="本课用到的图与动画"
      subtitle="正文里每一项都已经嵌进去。这里按上课顺序再收一页，方便备课跳转。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {kit.map((k) => (
          <a
            key={k.when}
            href={`#${k.when.includes("第一") ? "ch1" : k.when.includes("第二") ? "ch2" : k.when.includes("第三") ? "ch3" : k.when.includes("第四") ? "ch4" : k.when.includes("第五") ? "ch5" : "top"}`}
            className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition hover:ring-primary/40"
          >
            <Image
              src={k.src}
              alt={k.alt}
              width={640}
              height={360}
              className="aspect-video h-auto w-full object-cover"
            />
            <div className="px-4 py-3">
              <p className="font-sans text-sm font-medium text-gold">{k.when}</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                {k.note}
              </p>
            </div>
          </a>
        ))}
      </div>
    </LessonSection>
  );
}
