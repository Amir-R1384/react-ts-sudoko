import { atom } from 'recoil'
import { Chrono, Difficulty, EmptyCells, FocusedCell, Solution, Board } from './types'
import createEmptyBoard from './util/createEmptyBoard'

// Stats: difficulty, mistakes
// Board
// FocusedCell
// EmptyCells
// Chrono
// Solution

interface Stats {
	difficulty: Difficulty
	mistakes: number
}

export const statsAtom = atom<Stats>({
	key: 'statsAtom',
	default: {
		difficulty: 'easy',
		mistakes: 0
	}
})

export const boardAtom = atom<Board>({
	key: 'boardAtom',
	default: createEmptyBoard()
})

export const focusedCellAtom = atom<FocusedCell>({
	key: 'focusedCellAtom',
	default: null
})

export const emptyCellsAtom = atom<EmptyCells>({
	key: 'emptyCellsAtom',
	default: {}
})

export const chronoAtom = atom<Chrono>({
	key: 'chronoAtom',
	default: [0, 0, 0, 0]
})

export const solutionAtom = atom<Solution>({
	key: 'solutionAtom',
	default: []
})
