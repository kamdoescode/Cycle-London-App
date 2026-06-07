import { Scenario } from '../types/index'

// ─── Zone 1 — Hackney ─────────────────────────────────────────────────────────

export const hackneyScenarios: Scenario[] = [
  {
    id: 'hackney-1',
    boroughId: 'hackney',
    zone: 1,
    title: 'London Fields',
    situation:
      "You’re cycling down a paved path shared by cyclists and pedestrians. You’re cycling down the middle of the path when you see another cyclist approach towards you. What do you do?",
    options: [
      { id: 'a', text: 'continue down the middle and hope the other cyclist goes around you' },
      { id: 'b', text: 'move over to the left side of the path and continue' },
      { id: 'c', text: 'move onto the grass to give the other cyclist the whole path' },
    ],
    correctId: 'b',
    explanation:
      'It’s perfectly okay to share a paved lane with another cyclist, just move over to the left side and they’ll do the same',
    consequence:
      'A passenger stepped off directly into your path.',
  },
  {
    id: 'hackney-2',
    boroughId: 'hackney',
    zone: 1,
    title: 'Parked Cars',
    situation:
      "You're cycling along the edge of London Fields on a quiet residential street. There's a long row of parked cars to your left.",
    options: [
      { id: 'a', text: 'Ride close to the cars to stay out of the way of traffic behind you' },
      { id: 'b', text: 'Ride at least 1 metre from the cars at all times' },
      { id: 'c', text: 'Ride close but be ready to swerve if a door opens' },
    ],
    correctId: 'b',
    explanation:
      "A car door can swing fully open in less than a second. Riding 1 metre away keeps you clear of the 'door zone' — Highway Code Rule 239.",
    consequence:
      'A car door swung open and you had no time to react.',
  },
]

// ─── All scenarios combined ───────────────────────────────────────────────────

export const allScenarios: Scenario[] = [
  ...hackneyScenarios,
]

// Helper — get scenarios for a specific borough
export function getScenariosForBorough(boroughId: string): Scenario[] {
  return allScenarios.filter((s) => s.boroughId === boroughId)
}
