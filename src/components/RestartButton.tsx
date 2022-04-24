import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
	boardAtom,
	chronoAtom,
	emptyCellsAtom,
	focusedCellAtom,
	solutionAtom,
	statsAtom
} from '../atoms'
import generateBoard from '../lib/generate'

export default function RestartButton() {
	const [stats, setStats] = useRecoilState(statsAtom)
	const resetFocusedCell = useResetRecoilState(focusedCellAtom)
	const resetEmptyCells = useResetRecoilState(emptyCellsAtom)
	const resetChrono = useResetRecoilState(chronoAtom)
	const setBoard = useSetRecoilState(boardAtom)
	const setSolution = useSetRecoilState(solutionAtom)

	function restart() {
		setStats(prev => ({
			...prev,
			mistakes: 0
		}))
		resetFocusedCell()
		resetEmptyCells()
		resetChrono()
		const { board, solution: newSolution } = generateBoard(stats.difficulty)

		setBoard(board)
		setSolution(newSolution)
	}

	return (
		<button onClick={restart} className="button">
			Restart
		</button>
	)
}
