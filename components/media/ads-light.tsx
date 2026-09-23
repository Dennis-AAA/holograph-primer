"use client";

import { Playable } from "@/components/media/playable";

export function AdsLightAnim() {
  return (
    <Playable>
      <svg viewBox="0 0 720 380" className="h-auto w-full" aria-label="光线在 AdS 中往返">
        <rect width="720" height="380" fill="#071018" />
        <path
          d="M90 40 Q 360 8 630 40 L 630 340 Q 360 308 90 340 Z"
          fill="#102033"
          stroke="#7ee7d1"
          strokeWidth="2"
        />
        <path
          d="M90 40 Q 360 8 630 40"
          fill="none"
          stroke="#7ee7d1"
          strokeWidth="3"
        />
        <text x="360" y="28" textAnchor="middle" fill="#7ee7d1" fontSize="12" fontFamily="sans-serif">
          边界
        </text>
        <text x="360" y="200" textAnchor="middle" fill="#e8c36a" fontSize="12" fontFamily="sans-serif">
          AdS 体内
        </text>
        <circle r="6" fill="#f0d48a" className="media-anim ads-photon">
          <title>光线</title>
        </circle>
        <path
          d="M360 200 L 360 48"
          stroke="#7ee7d1"
          strokeDasharray="5 5"
          opacity="0.35"
        />
        <g transform="translate(640 70)">
          <circle r="16" fill="none" stroke="#c9d4e5" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-11"
            stroke="#e8c36a"
            strokeWidth="2"
            className="media-anim ads-clock"
          />
          <text y="36" textAnchor="middle" fill="#c9d4e5" fontSize="11" fontFamily="sans-serif">
            钟
          </text>
        </g>
      </svg>
    </Playable>
  );
}
