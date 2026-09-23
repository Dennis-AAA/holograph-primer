import { ChapterDiscuss } from "@/components/chapters/chapter-discuss";
import { ChapterFive } from "@/components/chapters/chapter-five";
import { ChapterFour } from "@/components/chapters/chapter-four";
import { ChapterOne } from "@/components/chapters/chapter-one";
import { ChapterPrep } from "@/components/chapters/chapter-prep";
import { ChapterSummary } from "@/components/chapters/chapter-summary";
import { ChapterThree } from "@/components/chapters/chapter-three";
import { ChapterTwo } from "@/components/chapters/chapter-two";
import { MediaKit } from "@/components/chapters/media-kit";
import { LessonHero } from "@/components/lesson/hero";
import { SiteHeader } from "@/components/lesson/site-header";
import { TableOfContents } from "@/components/lesson/toc";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-24 sm:px-6">
        <LessonHero />
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <TableOfContents />
          <article className="min-w-0">
            <ChapterPrep />
            <ChapterOne />
            <ChapterTwo />
            <ChapterThree />
            <ChapterFour />
            <ChapterFive />
            <ChapterDiscuss />
            <ChapterSummary />
            <MediaKit />
          </article>
        </div>
      </div>
      <footer className="no-print border-t border-border/80 py-8 text-center font-sans text-xs text-muted-foreground">
        通识物理教案 · 供课堂讲授与自学。公式取自然单位时会注明。不是专业综述，引用请回到原始论文。
      </footer>
    </>
  );
}
