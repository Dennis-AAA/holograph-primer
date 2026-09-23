import { Card, CardContent } from "@/components/ui/card";

export function FormulaCard({
  formula,
  name,
  meaning,
}: {
  formula: string;
  name: string;
  meaning: string;
}) {
  return (
    <Card className="bg-secondary/70">
      <CardContent className="space-y-3">
        <p className="font-sans text-xs tracking-[0.18em] text-primary uppercase">
          {name}
        </p>
        <p className="font-mono text-lg leading-relaxed text-primary md:text-xl">
          {formula}
        </p>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {meaning}
        </p>
      </CardContent>
    </Card>
  );
}
