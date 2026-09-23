import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Misconception({
  wrong,
  right,
}: {
  wrong: string;
  right: string;
}) {
  return (
    <Card>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div>
            <p className="mb-1 font-sans text-xs font-medium tracking-wide text-destructive">
              常见误解
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              {wrong}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="mb-1 font-sans text-xs font-medium tracking-wide text-primary">
              更准确的说法
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              {right}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeachTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-card/60 px-4 py-3 font-sans text-sm leading-relaxed text-muted-foreground">
      <span className="mr-2 font-medium text-primary">教师备忘</span>
      {children}
    </div>
  );
}
