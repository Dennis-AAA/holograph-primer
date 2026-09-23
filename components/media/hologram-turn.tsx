"use client";

import { Playable } from "@/components/media/playable";

export function HologramTurnAnim() {
  return (
    <Playable>
      <div className="grid gap-6 px-4 py-8 md:grid-cols-2">
        <div className="text-center">
          <div className="media-anim holo-card mx-auto h-44 w-32 rounded-md bg-[#d9d3c7] shadow-xl">
            <div className="flex h-full items-center justify-center font-serif text-5xl text-zinc-700">
              ♔
            </div>
          </div>
          <p className="mt-3 font-sans text-xs text-muted-foreground">普通照片：怎么转都是平的</p>
        </div>
        <div className="text-center">
          <div className="media-anim holo-plate mx-auto grid h-44 w-40 place-items-center rounded-md bg-gradient-to-br from-teal-300/40 via-fuchsia-400/30 to-amber-300/40 ring-1 ring-teal-200/40">
            <span className="holo-piece font-serif text-6xl text-teal-100">♘</span>
          </div>
          <p className="mt-3 font-sans text-xs text-muted-foreground">全息片：侧面和纵深跟着转出来</p>
        </div>
      </div>
    </Playable>
  );
}
