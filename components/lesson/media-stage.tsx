import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const kindLabel = {
  image: "插图",
  video: "影像",
  animation: "动画",
  diagram: "示意图",
};

export function MediaStage({
  kind,
  title,
  purpose,
  credit,
  children,
  className,
}: {
  kind: keyof typeof kindLabel;
  title: string;
  purpose: string;
  credit?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10", className)}>
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {kindLabel[kind]}
          </Badge>
          <figcaption className="truncate font-sans text-sm font-medium">{title}</figcaption>
        </div>
      </div>
      <div className="border-t border-border/70">{children}</div>
      <div className="space-y-1 px-4 py-3">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          <span className="text-foreground/80">用来讲：</span>
          {purpose}
        </p>
        {credit ? (
          <p className="font-sans text-[11px] leading-relaxed text-muted-foreground/80">
            {credit}
          </p>
        ) : null}
      </div>
    </figure>
  );
}

export function LessonImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="h-auto w-full bg-background object-cover"
    />
  );
}

function publicPath(src: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}

export function LessonVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  return (
    <video
      className="aspect-video h-auto w-full bg-black"
      controls
      playsInline
      preload="metadata"
      poster={poster ? publicPath(poster) : undefined}
      title={title}
    >
      <source src={publicPath(src)} type="video/mp4" />
      你的浏览器不支持视频播放，请换用较新的 Chrome / Edge / Safari。
    </video>
  );
}
