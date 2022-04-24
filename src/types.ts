export type Difficulty = 'easy' | 'medium' | 'hard'
export type FocusedCell = { x: number; y: number } | null
export type EmptyCells = { [index: string]: number | null }
export type Chrono = [number, number, number, number]
export type Solution = { x: number; y: number; num: number }[]
export type Board = (number | null)[][]
