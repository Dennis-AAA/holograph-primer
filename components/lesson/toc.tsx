"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { sections } from "@/lib/nav";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function currentSectionId() {
  const line = 150;
  let current: (typeof sections)[number]["id"] = sections[0].id;
  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top <= line) current = s.id;
  }
  return current;
}

export function TableOfContents() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const update = () => setActive(currentSectionId());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("resize", update);
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    const io = new IntersectionObserver(update, {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.15, 0.4, 0.7, 1],
    });
    nodes.forEach((n) => io.observe(n));
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("resize", update);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        data-active={active}
        className="no-print sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          课堂目录
        </p>
        <TocList active={active} />
      </nav>
      <div className="no-print mb-8 lg:hidden">
        <Collapsible>
          <CollapsibleTrigger className="flex h-9 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted">
            课堂目录
            <Menu className="size-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <TocList active={active} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}

function TocList({ active }: { active: string }) {
  return (
    <ol className="space-y-1">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm leading-snug transition-colors",
              active === s.id
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="block text-[10px] tracking-wider text-gold/80 uppercase">
              {s.chapter}
            </span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
