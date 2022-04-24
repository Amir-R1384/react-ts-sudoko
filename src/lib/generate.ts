import createEmptyBoard from '../util/createEmptyBoard'
import duplicateArr from '../util/duplicateArray'
import checkCell from './check'
import { Difficulty } from '../types'

interface GenerateBoard {
	(difficulty: Difficulty): {
		board: (number | null)[][]
		solution: { x: number; y: number; num: number }[]
	}
}

const generateBoard: GenerateBoard = difficulty => {
	let board = createEmptyBoard()
	const cellsToRemove = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 40

	// * Randomly generating the first row
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	for (let i = 0; i < 9; i++) {
		const index = Math.floor(Math.random() * arr.length)
		const value = arr[index]
		board[0][i] = value
		arr.splice(index, 1)
	}
	// --end

	// * Filling up the rest with the backtracking algorithm
	const current = { x: 0, y: 1 }
	let value = 1

	while (current.y <= 8) {
		board[current.y][current.x] = value
		const result = checkCell(current, board)

		if (result === false) {
			if (value >= 9) {
				board[current.y][current.x] = null
				current.x--
				if (current.x < 0) {
					current.x = 8
					current.y--
				}
				value = board[current.y][current.x]! + 1
			} else {
				value++
			}
		} else {
			value = 1
			current.x++
			if (current.x > 8) {
				current.y++
				current.x = 0
			}
		}
	}
	// --end

	const originalBoard = duplicateArr(board)
	const solution: { x: number; y: number; num: number }[] = []
	let solutionsNum = 0
	let stopCheck = false

	do {
		board = duplicateArr(originalBoard)
		solutionsNum = 0

		// * Removing the numbers
		for (let i = 0; i < cellsToRemove; i++) {
			let x = 9,
				y = 0
			while (board[y][x] == undefined) {
				x = Math.floor(Math.random() * 9)
				y = Math.floor(Math.random() * 9)
			}
			board[y][x] = null
		}
		// --end

		current.x = 0
		current.y = 0
		value = 1

		const filledCells: { x: number; y: number }[] = []

		loop: while (stopCheck === false) {
			while (current.y <= 8) {
				if (board[current.y][current.x] === null) {
					board[current.y][current.x] = value
					const result = checkCell(current, board)

					if (result === true) {
						filledCells.push({
							x: current.x,
							y: current.y
						})

						advance()
					} else {
						board[current.y][current.x] = null
						if (value >= 9) {
							if (!filledCells.length) {
								break loop
							}
							const { x: last_x, y: last_y } = filledCells.pop()!
							current.x = last_x
							current.y = last_y
							value = board[current.y][current.x]! + 1
							board[current.y][current.x] = null
						} else {
							value++
						}
					}
				} else {
					advance()
				}
			}
			solutionsNum++
			for (let { x, y } of filledCells) {
				solution.push({
					x,
					y,
					num: board[y][x]!
				})
			}

			current.x = filledCells[0].x
			current.y = filledCells[0].y

			value = board[current.y][current.x]! + 1

			while (filledCells.length > 0) {
				board[filledCells[0].y][filledCells[0].x] = null
				filledCells.shift()
			}
		}
	} while (solutionsNum > 1)

	function advance() {
		value = 1
		current.x++
		if (current.x > 8) {
			current.x = 0
			current.y++
		}
	}

	return {
		board: board,
		solution
	}
}

export default generateBoard
