export default function checkCell(
	{ x, y }: { x: number; y: number },
	board: (number | null)[][]
): boolean {
	if (board[y][x]! > 9) return false
	const current = board[y][x]

	// Horizontal checking
	const row = board[y]
	for (let i = 0; i < row.length; i++) {
		if (current === row[i] && i !== x) {
			return false
		}
	}

	// Vertical checking
	const column = board.map(arr => arr[x])
	for (let i = 0; i < column.length; i++) {
		if (current === column[i] && i !== y) {
			return false
		}
	}

	// Region checking
	const region = {
		x: Math.floor(x / 3),
		y: Math.floor(y / 3)
	}

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const neighbor_x = region.x * 3 + i
			const neighbor_y = region.y * 3 + j

			if (board[neighbor_y][neighbor_x] === current && neighbor_x !== x && neighbor_y !== y) {
				return false
			}
		}
	}

	return true
}
