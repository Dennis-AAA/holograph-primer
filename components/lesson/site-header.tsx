import Link from "next/link";
import { Aperture } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Aperture className="size-4" />
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">
            全息课堂
          </span>
        </a>
        <div className="flex items-center gap-4">
          <Link href="/n-body" className="font-sans text-xs font-medium text-primary">
            N 体实验
          </Link>
          <p className="hidden font-sans text-xs tracking-wide text-muted-foreground sm:block">
            通识物理教案 · 约 4 学时
          </p>
        </div>
      </div>
    </header>
  );
}
