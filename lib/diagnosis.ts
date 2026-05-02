import type { Question, AxisScores, DiagnosisResult, ResultType } from "@/types";

export const questions: Question[] = [
  // 才能認知 (5問)
  {
    id: 1,
    text: "自分が自然にできることで、他者から感謝や驚きを受けることがある",
    axis: "talent",
  },
  {
    id: 2,
    text: "「どうしてそんなに○○が得意なの？」と言われることが複数ある",
    axis: "talent",
  },
  {
    id: 3,
    text: "没頭すると時間を忘れる活動・テーマが明確にある",
    axis: "talent",
  },
  {
    id: 4,
    text: "自分の強みや才能を言語化して他者に説明できる",
    axis: "talent",
  },
  {
    id: 5,
    text: "過去の経験の中に、繰り返し現れるパターンや得意分野がある",
    axis: "talent",
  },
  // 価値変換力 (5問)
  {
    id: 6,
    text: "自分の知識・経験が誰かの課題解決に役立つと実感したことがある",
    axis: "value",
  },
  {
    id: 7,
    text: "無料で提供していたことに「お金を払いたい」と言われた経験がある",
    axis: "value",
  },
  {
    id: 8,
    text: "自分の得意なことを「サービス」として提供するイメージができている",
    axis: "value",
  },
  {
    id: 9,
    text: "ターゲットとなる顧客像（どんな人を助けたいか）が浮かぶ",
    axis: "value",
  },
  {
    id: 10,
    text: "自分の提供価値を一言で表現できる",
    axis: "value",
  },
  // 事業設計力 (5問)
  {
    id: 11,
    text: "収益化の仕組みや価格設定について具体的に考えたことがある",
    axis: "business",
  },
  {
    id: 12,
    text: "競合や市場についてリサーチし、自分のポジションを把握している",
    axis: "business",
  },
  {
    id: 13,
    text: "事業のロードマップや段階的な成長プランを描いている",
    axis: "business",
  },
  {
    id: 14,
    text: "集客・認知拡大の手段について具体的なアイデアがある",
    axis: "business",
  },
  {
    id: 15,
    text: "自分のサービスの提供フロー（問合せ〜納品まで）を設計できている",
    axis: "business",
  },
  // 実行継続力 (5問)
  {
    id: 16,
    text: "決めたことを途中で諦めず、最後まで実行し続けることが多い",
    axis: "execution",
  },
  {
    id: 17,
    text: "失敗や壁にぶつかっても、立て直して前進できる",
    axis: "execution",
  },
  {
    id: 18,
    text: "日々の行動を振り返り、改善するサイクルを持っている",
    axis: "execution",
  },
  {
    id: 19,
    text: "不確実な状況でも、まず動いてみることができる",
    axis: "execution",
  },
  {
    id: 20,
    text: "長期的なビジョンに向けて、日常の小さな行動を積み重ねている",
    axis: "execution",
  },
];

export function calculateScores(answers: Record<number, number>): AxisScores {
  const axes: (keyof AxisScores)[] = ["talent", "value", "business", "execution"];
  const scores: AxisScores = { talent: 0, value: 0, business: 0, execution: 0 };

  axes.forEach((axis) => {
    const axisQuestions = questions.filter((q) => q.axis === axis);
    const total = axisQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 3), 0);
    scores[axis] = Math.round((total / (axisQuestions.length * 5)) * 100);
  });

  return scores;
}

export function determineType(scores: AxisScores): ResultType {
  const { talent, value, business, execution } = scores;
  const avg = (talent + value + business + execution) / 4;

  if (avg >= 75) return "integrated_master";

  if (talent < 50 && value < 50) return "diamond_rough";
  if (talent >= 70 && value < 50) return "wisdom_keeper";
  if (talent >= 60 && value >= 60 && business < 55) return "visionary_architect";
  if (execution >= 70 && business < 55) return "action_pioneer";
  if (business >= 65 && execution >= 65) return "integrated_master";

  // Fallback: weakest axis determines type
  const minAxis = Object.entries(scores).reduce((a, b) => (a[1] < b[1] ? a : b));
  if (minAxis[0] === "talent" || minAxis[0] === "value") return "diamond_rough";
  if (minAxis[0] === "business") return "visionary_architect";
  return "action_pioneer";
}

export function getResult(scores: AxisScores): DiagnosisResult {
  const type = determineType(scores);

  const results: Record<ResultType, Omit<DiagnosisResult, "scores" | "type">> = {
    diamond_rough: {
      title: "原石タイプ",
      subtitle: "The Diamond in the Rough",
      emoji: "💎",
      color: "#6b9cc4",
      description:
        "あなたには確かな才能と可能性が眠っています。しかしまだその価値に自分自身が気づいていないか、外に出し方を知らない段階にあります。磨けば必ず輝く「原石」です。自己認識を深めることが、すべての出発点になります。",
      challenge:
        "才能を「当たり前のこと」と思い込み、価値として認識できていない。他者の目線で自分の強みを客観視する機会が少ない。",
      nextStep:
        "まず「過去に感謝されたこと」「無意識にやってしまうこと」を書き出す棚卸しワークから始めましょう。才能の言語化が、事業の第一歩です。",
    },
    wisdom_keeper: {
      title: "知恵の守り人タイプ",
      subtitle: "The Wisdom Keeper",
      emoji: "📚",
      color: "#8b7cc4",
      description:
        "深い専門知識と豊かな経験をお持ちです。あなたの知見を必要としている人は確実に存在します。しかしその「知恵」をいまだ外部に提供できていない、または提供の仕方がわかっていない状態です。",
      challenge:
        "「自分の知識は特別ではない」という謙虚さが、価値提供の壁になっている。才能はあるが、それをビジネスとして設計する視点が育っていない。",
      nextStep:
        "あなたの知識を「誰かの10年を1年に縮める情報」として捉え直しましょう。1人のクライアントに深く届けることからスタートするのが最短ルートです。",
    },
    visionary_architect: {
      title: "ビジョナリーアーキタイプ",
      subtitle: "The Visionary Architect",
      emoji: "🏛️",
      color: "#c49b3c",
      description:
        "才能の認識と価値変換の感覚に優れています。「こういうサービスを作りたい」「こんな世界を実現したい」というビジョンが明確です。しかし事業設計や実行のフェーズで止まりやすい傾向があります。",
      challenge:
        "アイデアは豊富だが、収益化・集客・継続という「仕組み化」の部分が弱い。構想と現実のギャップに悩むことがある。",
      nextStep:
        "ビジョンを「初めの一歩で売れる最小単位のサービス」に落とし込む作業を今すぐ行いましょう。完璧な設計より、検証できる小さな一手が突破口になります。",
    },
    action_pioneer: {
      title: "行動の先駆者タイプ",
      subtitle: "The Action Pioneer",
      emoji: "⚡",
      color: "#c46b3c",
      description:
        "実行力と継続力に秀でた、行動派のあなた。動き続けることができる強さがあります。しかし才能の核心や提供価値の定義が曖昧なまま走り続けているため、努力が分散しがちです。",
      challenge:
        "「何をやるか」よりも「どうやるか」に意識が向きやすく、根本の強みを棚卸しする機会が少ない。量をこなしているが、レバレッジが効いていない。",
      nextStep:
        "一度立ち止まり、「最も成果が出たこと・喜ばれたこと」を振り返りましょう。そこに才能の核があります。軸を定めることで、行動の威力が数倍になります。",
    },
    integrated_master: {
      title: "統合マスタータイプ",
      subtitle: "The Integrated Master",
      emoji: "👑",
      color: "#d4a017",
      description:
        "才能認知・価値変換・事業設計・実行継続、すべての軸においてバランスよく高い水準にあります。あなたはすでに「才能を事業に変える力」の基盤を持っています。次のステージは、スケールとレガシーの構築です。",
      challenge:
        "全体的な能力が高いがゆえに、次の壁が見えにくい。さらなる飛躍のためには、より高度な戦略・チーム・仕組みが必要になってくる段階です。",
      nextStep:
        "あなたの才能と事業を「自分一人の収益」から「影響力と仕組みのある事業体」へと進化させましょう。そのための設計をご一緒できることを楽しみにしています。",
    },
  };

  return { type, scores, ...results[type] };
}
