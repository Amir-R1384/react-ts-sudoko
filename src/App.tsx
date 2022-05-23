import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Div100vh from 'react-div-100vh'
import Confetti from 'react-confetti'

import { boardAtom, emptyCellsAtom, solutionAtom, statsAtom, wonAtom } from './atoms'

import generateBoard from './lib/generate'

import Cell from './components/Cell'
import Stats from './components/Stats'
import Subgrids from './components/Subgrids'
import EraseButton from './components/EraseButton'
import OptionButton from './components/OptionButton'
import RestartButton from './components/RestartButton'
import DifficultyButton from './components/DifficultyButton'

import map2d from './util/map2d'

export default function App() {
	const [board, setBoard] = useRecoilState(boardAtom)
	const [solution, setSolution] = useRecoilState(solutionAtom)
	const [won, setWon] = useRecoilState(wonAtom)
	const stats = useRecoilValue(statsAtom)
	const emptyCells = useRecoilValue(emptyCellsAtom)

	// Generating the board + getting the solutions
	useEffect(() => {
		const { board, solution: newSolution } = generateBoard(stats.difficulty)

		setBoard(board)
		setSolution(newSolution)
	}, [])

	// Checking for wining
	useEffect(() => {
		for (let { x, y, num } of solution) {
			if (emptyCells[`${x}${y}`] !== num) return
		}
		if (solution.length) {
			setWon(true)
		}
	}, [solution, emptyCells])

	return (
		<Div100vh className="grid max-w-md px-5 mx-auto place-items-center">
			<div className="flex flex-col items-center h-full mx-auto justify-evenly">
				<Stats />
				<div
					className={`relative grid grid-cols-9 border-2 w-full aspect-square border-gray-700 ${
						stats.mistakes === 3 && 'pointer-events-none'
					}`}>
					<Subgrids /> {/* Only visual */}
					{map2d(board, (num, x, y) => (
						<Cell key={`${x}${y}`} num={num} x={x} y={y} />
					))}
				</div>
				<div
					className={`flex border-2 border-gray-700 w-full  ${
						stats.mistakes === 3 && 'pointer-events-none'
					}`}>
					<OptionButton num={1} />
					<OptionButton num={2} />
					<OptionButton num={3} />
					<OptionButton num={4} />
					<OptionButton num={5} />
					<OptionButton num={6} />
					<OptionButton num={7} />
					<OptionButton num={8} />
					<OptionButton num={9} />
				</div>
				<div className="flex justify-between w-full">
					<EraseButton />
					<DifficultyButton />
					<RestartButton />
				</div>
			</div>

			{won && (
				<>
					<Confetti />
					<div className="absolute top-0 left-0 grid w-screen h-screen bg-black place-items-center bg-opacity-40">
						<div className="flex flex-col justify-around w-1/2 max-w-md bg-white h-1/2 rounded-xl shdow-md place-items-center drop-shadow-xl">
							<div className="text-4xl font-semibold text-center text-green-500">
								Congrats You Won!
							</div>
							<RestartButton />
						</div>
					</div>
				</>
			)}
		</Div100vh>
	)
}
