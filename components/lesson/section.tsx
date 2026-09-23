import { cn } from "@/lib/utils";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("prose-lesson", className)}>{children}</div>;
}

export function LessonSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/70 pt-14 pb-6"
    >
      <p className="mb-2 font-sans text-xs font-medium tracking-[0.22em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

export function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-xl font-semibold tracking-tight text-gold md:text-2xl">
      {children}
    </h3>
  );
}
