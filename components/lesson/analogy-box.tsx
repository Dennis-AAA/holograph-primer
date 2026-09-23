import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AnalogyBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-gold/8 ring-gold/20">
      <CardContent className="flex gap-4">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
          <Lightbulb className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 font-sans text-sm font-semibold tracking-wide text-gold">
            生活类比 · {title}
          </p>
          <div className="prose-lesson text-[0.98rem] leading-[1.85]">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
