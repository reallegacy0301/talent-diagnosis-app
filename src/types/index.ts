export type Axis = "talent" | "value" | "business" | "execution";

export interface Question {
  id: number;
  text: string;
  axis: Axis;
}

export interface AxisScores {
  talent: number;
  value: number;
  business: number;
  execution: number;
}

export type ResultType =
  | "diamond_rough"
  | "wisdom_keeper"
  | "visionary_architect"
  | "action_pioneer"
  | "integrated_master";

export interface DiagnosisResult {
  type: ResultType;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  nextStep: string;
  lineBeforeCta: string;
  scores: AxisScores;
  emoji: string;
  color: string;
}
