import { useRecoilValue, useSetRecoilState } from 'recoil'
import { emptyCellsAtom, focusedCellAtom } from '../atoms'

export default function OptionButton({ num }: { num: number }) {
	const setCells = useSetRecoilState(emptyCellsAtom)
	const focusedCell = useRecoilValue(focusedCellAtom)

	function onClick() {
		if (focusedCell) {
			const { x, y } = focusedCell
			setCells(prev => ({
				...prev,
				[x.toString() + y.toString()]: num || null
			}))
		}
	}

	return (
		<button
			onClick={onClick}
			className={`grid text-gray-600 flex-1 aspect-square text-xl place-items-center hover:bg-slate-100 transition-colors ${
				num !== 9 && 'border-r-2'
			}`}>
			{num}
		</button>
	)
}
