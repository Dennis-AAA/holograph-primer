# 宇宙也许是一张全息图

一份关于**全息原理**与 **AdS/CFT 对应**的通识教学教案网站。语言平实，用日常类比把黑洞熵、信息悖论、't Hooft / Susskind 的全息思想，以及反德西特时空与边界共形场论的对偶串成一堂可讲授的课。

面向：大学通识课、物理系高年级选讲、科学传播工作坊。不要求先行修过广义相对论或量子场论。

## 课堂里有什么

- 教学目标、学时建议、重点难点
- 五讲正文：黑洞热力学 → 全息原理 → AdS/CFT → 全息字典与强弱对偶 → 跨学科影响
- 随文嵌入的插图、可播放动画，以及 ESO 的 M87 拉近视频
- 互动：耦合强度滑块、全息词条、虫洞纠缠旋钮
- 十二道讨论题（含教师参考要点）、总结与分层阅读

科学影像的署名见 `public/media/CREDITS.txt`。EHT 与 RHIC 图片、ESO 视频按 CC BY 使用。

## 本地运行

需要 Node.js 20 或以上。

```bash
npm install
npm run dev
```

浏览器打开 [http://127.0.0.1:43217](http://127.0.0.1:43217)。

生产构建：

```bash
npm run build
npm start
```

## 对外网页

N 体演示在 `/n-body`。推到 `main` 之后，GitHub Actions 会把静态站点发到 GitHub Pages：

[https://dennis-aaa.github.io/holograph-primer/n-body/](https://dennis-aaa.github.io/holograph-primer/n-body/)

仓库需要是公开的，并且在 Settings → Pages 里把 Source 设成 GitHub Actions。第一次打开发布工作流时，GitHub 会要求批准 `github-pages` 环境。

## 怎么用这份教案

建议总学时约 4 课时，可拆成两到三次课。开场不要先写 AdS/CFT，先问：一间教室的全部细节，账本是否可能写在墙壁面积上？

每一节都按「生活图像 → 物理事实 → 一句话结论」推进。金色是生活类比，文中的插图和动画可以直接投影。

这不是专业综述。公式在自然单位下会注明；引用请回到文中列出的原始论文。

## 技术

Next.js（App Router）+ TypeScript + Tailwind CSS + shadcn/ui。长文一次读完，左侧（或移动端顶部）是随滚动高亮的目录。
