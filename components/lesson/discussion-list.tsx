"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
  {
    q: "若有人说“全息原理就是宇宙是假的”，你怎样在两分钟内礼貌而准确地纠正？",
    a: "先承认全息图这个词容易让人想到幻象，再把定义说回去：它是关于信息如何编码、两种理论如何等价。假/真是额外的哲学判断。可以举双语小说：英文译本不是“假红楼梦”。",
  },
  {
    q: "为什么黑洞熵按面积、不按体积，会逼出“自由度住在边界上”？",
    a: "若体积里每个小格子都有独立状态，熵应跟体积走，最终会超过视界面积给出的账。黑洞又给出任何区域的信息上限。要两边同时成立，体积里的自由度不能全独立，独立账本更像写在面上。",
  },
  {
    q: "霍金辐射看起来热，与量子力学的哪一条最直接冲突？冲突一定意味着信息毁掉了吗？",
    a: "直接冲突的是幺正性（演化可逆、信息可重建）。不一定毁掉：可能藏在辐射的精细关联、残余物、或只有用对偶才能看见的记账方式里。课堂要的是问题结构，不是站队。",
  },
  {
    q: "用施工图、皮影、罐头标签三个比喻，各指出一处会把学生带偏的地方。",
    a: "施工图容易让人以为体内还有图纸没写的额外现实；皮影容易让人以为一边是真、一边是影；罐头标签容易让人以为标签只是近似说明书。纠正：在理想全息里两边同等完整，且不要双重记账。",
  },
  {
    q: "'t Hooft 的“降维”和 Susskind 的“世界是全息图”，侧重点有何不同？",
    a: "前者强调计数与自洽：独立自由度必须按面积像素化。后者强调编码与互补：体积世界是边界信息的重建，两种呈现不可叠罗汉。合在一起才是课堂定义。",
  },
  {
    q: "AdS 的边界在无穷远，为什么课堂上还总画一堵墙？这堵墙可以敲吗？",
    a: "墙是为了让“边界理论住在哪儿”变得可画。几何上它在无穷远，不是实验室的水泥壁。你不能旅行到那里敲门；可观测量是边界上的场论相关函数，不是某人手按在墙上的触感。",
  },
  {
    q: "为什么说 AdS/CFT 是对偶而不是“引力模拟场论”的软件？",
    a: "模拟软件通常单向、近似、可关可开。对偶声称两边定义同一套物理，理想情况下可观测量相等。我们常用经典引力去算强耦合场论，那是因为该极限好算，并不把对偶降格成外挂插件。",
  },
  {
    q: "拖动耦合强度滑块时，为什么场论变难，引力反而变易？这对凝聚态研究有什么实际用处？",
    a: "大 N、强耦合对应体内经典、平滑的几何。固体与夸克汤最难的区间，正好可能落到“解爱因斯坦方程”的区间。用处是提供风洞：看强耦合普适行为，而不是替代第一性原理化学。",
  },
  {
    q: "径向坐标对应能量尺度。若一个过程发生在体内很深的地方，边界上的人会觉得它“大”还是“小”、快还是慢？",
    a: "深处对应红外、长距离、低能量、更慢的有效过程。边界上的人会把它看成粗粒化之后的集体行为，而不是短距紫外涨落。黑洞深处的红移还会把钟进一步拉慢。",
  },
  {
    q: "Ryu-Takayanagi 把纠缠熵写成面积。若边界上两区域变得更纠缠，体内的极小曲面通常会怎样？",
    a: "更纠缠意味着熵更大，极小曲面面积更大，或连通方式改变（例如两块区域对应的体内路径更深、甚至出现连通的桥）。可与 ER=EPR 的示意联系：纠缠增强，空间更舍不得断开。",
  },
  {
    q: "η/s ≈ 1/4π 被实验“靠近”了，能否据此宣称 QCD 等于某种弦论？",
    a: "不能。它支持“强耦合流体可以非常接近完美流体”这一普适图景。QCD 没有这么多超对称，N 也不是无穷。靠近是线索，不是身份证明。",
  },
  {
    q: "如果我们的宇宙不是 AdS，全息课还有什么资格讲给我们听？",
    a: "资格在于：它是量子引力少数可把账算清的实验室；它提供了信息与几何互译的语言；它改变了强耦合多体的提问方式。模型宇宙的价值不在于与夜空一模一样，而在于让思想第一次变得可检验、可计算。德西特全息仍是未完成的下一章。",
  },
];

export function DiscussionList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-xl bg-card px-2 ring-1 ring-foreground/10 sm:px-4">
      {questions.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} className="border-b border-border last:border-b-0">
            <button
              type="button"
              aria-expanded={expanded}
              className="flex w-full items-start justify-between gap-3 py-3 text-left font-sans text-[0.95rem] leading-relaxed hover:text-primary"
              onClick={() => setOpen(expanded ? null : i)}
            >
              <span>
                {i + 1}. {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
            {expanded ? (
              <p className="pb-3 font-sans text-sm leading-relaxed text-muted-foreground">
                <span className="text-primary">参考要点：</span>
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
