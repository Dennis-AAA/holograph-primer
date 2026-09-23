export const sections = [
  { id: "guide", title: "如何使用这份教案", chapter: "课前" },
  { id: "objectives", title: "教学目标与学时", chapter: "课前" },
  { id: "keypoints", title: "重点与难点", chapter: "课前" },
  { id: "ch1", title: "黑洞把物理学家逼到墙角", chapter: "第一讲" },
  { id: "ch2", title: "宇宙是一张全息图", chapter: "第二讲" },
  { id: "ch3", title: "AdS/CFT：同一出戏两套剧本", chapter: "第三讲" },
  { id: "ch4", title: "全息字典与强弱对偶", chapter: "第四讲" },
  { id: "ch5", title: "全息思想走进其他学科", chapter: "第五讲" },
  { id: "discuss", title: "课堂讨论与思考题", chapter: "收束" },
  { id: "summary", title: "总结回顾与延伸阅读", chapter: "收束" },
  { id: "media", title: "多媒体教具总表", chapter: "教具" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
