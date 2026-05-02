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
        "あなたの中には、まだ言語化されていない才能が眠っています。それは「特別なこと」ではなく、あなたが自然にやってしまうこと、他者から繰り返し感謝されること——その中に宿っています。気づいていないだけで、可能性は確かに存在しています。",
      challenge:
        "才能に気づけていない期間は、そのまま「機会を失い続ける期間」でもあります。あなたが「当たり前」と感じていることを、今この瞬間も高いお金を払って求めている人がいます。自分の価値を正しく認識できないまま時間が過ぎるほど、その差は静かに広がっていきます。焦る必要はありません。ただ、気づくのが早いほど、選択肢は確実に増えます。",
      nextStep:
        "まず必要なのは、才能の「棚卸し」です。過去に感謝されたこと、時間を忘れて取り組めること、他者に「なぜそんなにできるの？」と言われたこと——それらを丁寧に整理するだけで、事業の核となるものが浮かび上がります。公式LINEでは、このプロセスをあなたのペースで進められるよう、原石タイプ専用のロードマップをお届けしています。",
      lineBeforeCta:
        "あなたの才能は、まだ眠っています。\nでも、それに気づいた今日が、すべての起点になります。",
    },
    wisdom_keeper: {
      title: "知恵の守り人タイプ",
      subtitle: "The Wisdom Keeper",
      emoji: "📚",
      color: "#8b7cc4",
      description:
        "深い知識と積み重ねた経験——あなたにはすでに、人に届けられる「知恵の資産」があります。問題は才能の有無ではなく、それを価値として外に出す設計がまだできていないことです。知っている人と、必要としている人の間に、橋がかかっていない状態です。",
      challenge:
        "「自分の知識は特別ではない」という感覚が、最も大きな壁になっています。しかしその謙虚さは、裏を返せば「自分の価値を市場に届けることを、自ら止めている」ということでもあります。あなたが何年もかけて得たものを、今まさに必死で探している人がいます。「もう少し準備してから」と思い続けるうちに、その人は別の場所へ辿り着いてしまいます。知恵は、届けて初めて価値になります。",
      nextStep:
        "あなたに今必要なのは、さらなる知識ではなく「届ける設計」です。誰の、どんな悩みに、どんな形で届けるか——その一点を明確にするだけで、知恵は収益に変わります。公式LINEでは、知恵の守り人タイプが最短で収益化するためのステップを、具体的にお伝えしています。",
      lineBeforeCta:
        "あなたの知恵を、必要としている人がいます。\nその橋渡しを、一緒に設計しましょう。",
    },
    visionary_architect: {
      title: "ビジョナリーアーキタイプ",
      subtitle: "The Visionary Architect",
      emoji: "🏛️",
      color: "#c49b3c",
      description:
        "才能の自覚があり、届けたい世界観も持っている。あなたはすでに「何をやるか」が見えている段階にいます。しかし多くのビジョナリーが躓くのは、構想を収益に変える「設計と実装」のフェーズです。描く力と、売る力は、別のスキルです。",
      challenge:
        "ビジョンが鮮明であるほど、「まだ形になっていない」という焦りと「完璧にしてから出したい」という葛藤が同時に生まれます。その間、時間は確実に流れています。構想のままでは誰も救えません。収益がなければ、ビジョンを持続させることもできません。あなたの理想を「事業」として機能させるには、今すぐ動ける「最小の形」が必要です。",
      nextStep:
        "ビジョンを最初の売上に変えるには、「完成形」ではなく「届けられる最小単位」から始めることが鍵です。公式LINEでは、ビジョナリーアーキタイプが陥りやすいパターンと、ビジョンを現実の収益に着地させるための具体的な設計ステップをお伝えしています。",
      lineBeforeCta:
        "あなたのビジョンは本物です。\nあとは、それを「売上」という形に変換するだけです。",
    },
    action_pioneer: {
      title: "行動の先駆者タイプ",
      subtitle: "The Action Pioneer",
      emoji: "⚡",
      color: "#c46b3c",
      description:
        "動き続けられる力は、事業においてもっとも希少な資質のひとつです。あなたにはそれがあります。しかし行動の量が成果に直結しない時期が続いているなら、それは「方向性」の問題です。才能の軸が定まれば、今の行動力はそのまま武器になります。",
      challenge:
        "努力と行動を積み重ねているのに、収入や影響力が比例して伸びない——その感覚に心当たりはないでしょうか。原因は能力ではなく、「何のために動いているか」の軸がまだ明確でないことにあります。軸のない行動は、どれだけ積み上げても消耗を生みます。あなたの行動力は本物です。だからこそ、正しい方向に向いた瞬間に、結果は一気に加速します。",
      nextStep:
        "今のあなたに必要なのは、「もっと頑張ること」ではなく「才能の核を特定すること」です。過去に最も感謝されたこと、最も自然に成果が出たこと——そこに、あなたの軸があります。公式LINEでは、行動の先駆者タイプが才能の核を見つけ、行動を収益に直結させるためのロードマップをお届けしています。",
      lineBeforeCta:
        "あなたの行動力は、正しい軸と出会うことで\n初めて「売上」という形に変わります。",
    },
    integrated_master: {
      title: "統合マスタータイプ",
      subtitle: "The Integrated Master",
      emoji: "👑",
      color: "#d4a017",
      description:
        "才能の認識、価値への変換、事業設計、実行継続——4つの軸がバランスよく育っています。あなたはすでに「才能を事業に変える素地」を持っています。問われているのは、そこからどう「スケール」させるかです。",
      challenge:
        "一定の成果を手にしているとき、次の壁は見えにくいものです。しかし「自分一人の力でできること」には必ず上限があります。収入も影響力も、現在の仕組みのまま伸ばし続けることには、どこかで限界が来ます。次のステージに進むためには、才能を「個人の努力」から「仕組みと影響力のある事業体」へと昇華させる設計が必要です。",
      nextStep:
        "あなたに今必要なのは「もっと頑張ること」ではなく、「あなたがいなくても動く仕組み」を設計することです。才能が何倍にも広がるチーム、媒体、収益の流れ——その設計図を引く時期が来ています。公式LINEでは、統合マスタータイプが次のステージへ移行するための戦略と、具体的なスケール設計の考え方をお伝えしています。",
      lineBeforeCta:
        "あなたの才能と実績は、すでに証明されています。\n次は、それを「仕組み」に変える番です。",
    },
  };

  return { type, scores, ...results[type] };
}
