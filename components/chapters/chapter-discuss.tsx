import { DiscussionList } from "@/components/lesson/discussion-list";
import { LessonSection, Prose, Subhead } from "@/components/lesson/section";
import { TeachTip } from "@/components/lesson/callouts";

export function ChapterDiscuss() {
  return (
    <LessonSection
      id="discuss"
      eyebrow="收束"
      title="课堂讨论与思考题"
      subtitle="建议分组。每组抽两道口述、一道书面。教师可先让学生答，再展开参考要点。"
    >
      <Prose>
        <p>
          讨论课不要追求标准答案。评分标准可以是：比喻是否贴住物理、有没有把对偶说成单向模拟、有没有把 AdS 说成真实宇宙、能不能主动说出局限。
        </p>
      </Prose>
      <Subhead>十二道题（点击展开参考要点）</Subhead>
      <DiscussionList />
      <TeachTip>
        若时间紧，必做第 1、2、7、12 题。它们分别钉死：不是模拟假说、面积定律的逻辑、对偶不是软件、模型宇宙的资格。
      </TeachTip>
      <div className="space-y-3">
        <Subhead>可选作业</Subhead>
        <Prose>
          <p>
            书面作业（800–1200 字）：用一个你自己想的比喻贯穿全文，解释从贝肯斯坦熵到 AdS/CFT 的思路，并单独用一段写出这个比喻在哪里会骗人。
          </p>
          <p>
            口头作业：向一位没有学过大学物理的家人讲五分钟，录音。回放时自己标出三处可能误导对方的句子，下节课带来。
          </p>
        </Prose>
      </div>
    </LessonSection>
  );
}
