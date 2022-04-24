import { useRecoilValue, useSetRecoilState } from 'recoil'
import { emptyCellsAtom, focusedCellAtom, statsAtom } from '../atoms'

export default function EraseButton() {
	const setCells = useSetRecoilState(emptyCellsAtom)
	const focusedCell = useRecoilValue(focusedCellAtom)
	const stats = useRecoilValue(statsAtom)

	function onClick() {
		if (focusedCell) {
			const { x, y } = focusedCell
			setCells(prev => ({
				...prev,
				[x.toString() + y.toString()]: null
			}))
		}
	}

	return (
		<button
			onClick={onClick}
			className={`button ${stats.mistakes === 3 && 'pointer-events-none'}`}>
			Erase
		</button>
	)
}
