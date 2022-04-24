import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { emptyCellsAtom, focusedCellAtom, solutionAtom, statsAtom } from '../atoms'

interface Params {
	num: number | null
	x: number
	y: number
}

type State = 'correct' | 'incorrect' | null

export default function Cell({ num, x, y }: Params) {
	const [cells, setCells] = useRecoilState(emptyCellsAtom)
	const [focusedCell, setFocusedCell] = useRecoilState(focusedCellAtom)
	const solution = useRecoilValue(solutionAtom)
	const setStats = useSetRecoilState(statsAtom)

	const isEmpty = num === null
	const [state, setState] = useState<State>(null)
	const isFocused = x === focusedCell?.x && y === focusedCell?.y

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		if (value === '' || /^[123456789]$/.test(value)) {
			setCells(prev => ({
				...prev,
				[x.toString() + y.toString()]: Number(value) || null
			}))
		}
	}

	function onFocus() {
		setFocusedCell({ x, y })
	}

	useEffect(() => {
		if (!isEmpty || focusedCell?.x !== x || focusedCell?.y !== y) return
		// Runs everytime the cell value has been modified
		const value = cells[`${x}${y}`]

		const corresponding = solution.find(obj => obj.x === x && obj.y === y)
		if (!corresponding) return

		if (value == null) {
			setState(null)
		} else if (corresponding!.num === Number(value)) {
			setState('correct')
		} else {
			setState('incorrect')
			setStats(prev => ({ ...prev, mistakes: prev.mistakes + 1 }))
		}
	}, [cells])

	return (
		<div
			className={`grid text-xl border place-items-center ${
				!isEmpty
					? 'text-gray-600'
					: state === 'correct'
					? 'text-green-600'
					: state === 'incorrect'
					? 'text-red-600'
					: 'text-gray-600'
			}`}>
			{isEmpty ? (
				<input
					type="number"
					inputMode="none"
					value={cells[`${x}${y}`] || ''}
					onChange={onInputChange}
					className={`w-full h-full text-center outline-none border-0 focus:bg-slate-100 ${
						isFocused && 'bg-slate-100'
					}`}
					onFocus={onFocus}
				/>
			) : (
				num
			)}
		</div>
	)
}
