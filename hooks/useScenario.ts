import { useState } from 'react'
import { OptionId } from '../types/index'
import { allScenarios as scenarios } from '../data/scenarios'

type AnswerState = 'unanswered' | 'correct' | 'incorrect'
// This hook manages the state of the current scenario, selected answer, and progression through scenarios.
type UseScenarioReturn = {
  currentScenario: typeof scenarios[number]
  currentIndex: number
  totalScenarios: number
  answerState: AnswerState
  selectedOption: OptionId | null
  isComplete: boolean
  selectOption: (id: OptionId) => void
  nextScenario: () => void
  reset: () => void
}

// Manages the state of the current scenario, selected answer, and progression through scenarios.
export function useScenario(): UseScenarioReturn {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered')
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const currentScenario = scenarios[currentIndex]

  // Handles selecting an option and updates answer state accordingly. Does nothing if already answered.
  function selectOption(id: OptionId): void {
    if (answerState !== 'unanswered') return
    setSelectedOption(id)
    setAnswerState(id === currentScenario.correctId ? 'correct' : 'incorrect')
  }

  // Move to the next scenario or mark complete if at the end
  function nextScenario(): void {
    const next = currentIndex + 1
    if (next >= scenarios.length) {
      setIsComplete(true)
    } else {
      setCurrentIndex(next)
      setSelectedOption(null)
      setAnswerState('unanswered')
    }
  }

  // Reset to the first scenario and clear all selections and states
  function reset(): void {
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswerState('unanswered')
    setIsComplete(false)
  }

  return {
    currentScenario,
    currentIndex,
    totalScenarios: scenarios.length,
    answerState,
    selectedOption,
    isComplete,
    selectOption,
    nextScenario,
    reset,
  }
}
