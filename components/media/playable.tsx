"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Playable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      data-playing={playing ? "true" : "false"}
      className={cn("relative overflow-hidden bg-[#071018]", className)}
    >
      {children}
      <div className="absolute right-3 bottom-3 z-10">
        <Button
          type="button"
          size="sm"
          variant={playing ? "secondary" : "default"}
          onClick={() => setPlaying((v) => !v)}
        >
          {playing ? <Pause /> : <Play />}
          {playing ? "暂停" : "播放"}
        </Button>
      </div>
    </div>
  );
}
