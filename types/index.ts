// ─── Options & Scenarios ──────────────────────────────────────────────────────

export type OptionId = 'a' | 'b' | 'c'

export type Option = {
  id: OptionId
  text: string
}

export type Scenario = {
  id: string
  boroughId: BoroughId
  zone: number
  title: string
  situation: string
  options: Option[]
  correctId: OptionId
  explanation: string   // shown after any answer
  consequence?: string  // optional — shown only on wrong answer
}

// ─── Boroughs & Zones ─────────────────────────────────────────────────────────

export type BoroughId =
  | 'hackney'
  | 'islington'
  | 'southwark'
  | 'camden'
  | 'city_westminster'

export type ZoneStatus = 'locked' | 'active' | 'unlocked'

export type Borough = {
  id: BoroughId
  name: string
  zone: number          // 1 = easiest, 5 = hardest
  status: ZoneStatus
  scenarioCount: number // total scenarios in this zone
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export type ConfidenceLevel =
  | 'never_cycled'
  | 'ridden_before'
  | 'cycle_sometimes'
  | 'cycle_regularly'

export type UserProfile = {
  name: string
  confidenceLevel: ConfidenceLevel
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export type ScenarioResult = {
  scenarioId: string
  correct: boolean
  answeredAt: string    // ISO date string
}

export type ZoneProgress = {
  boroughId: BoroughId
  completedScenarioIds: string[]
  isComplete: boolean
}

export type UserProgress = {
  confidenceXP: number
  zoneProgress: Record<BoroughId, ZoneProgress>
  results: ScenarioResult[]
}

// ─── Answer state (used in useScenario) ───────────────────────────────────────

export type AnswerState = 'unanswered' | 'correct' | 'incorrect'
