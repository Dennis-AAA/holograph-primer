import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const serif = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "宇宙也许是一张全息图 · 全息原理与 AdS/CFT 教案",
  description:
    "一份平实、由浅入深的通识教学教案：从黑洞热力学与信息悖论，讲到 't Hooft、Susskind 与 AdS/CFT 对应。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="starfield min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
