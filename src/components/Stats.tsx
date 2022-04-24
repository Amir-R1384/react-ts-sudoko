import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { chronoAtom, statsAtom } from '../atoms'

export default function Stats() {
	const [{ mistakes, difficulty }, setStats] = useRecoilState(statsAtom)
	const [chrono, setChrono] = useRecoilState(chronoAtom)
	const gameOver = mistakes === 3
	let interval: number

	useEffect(() => {
		interval = setInterval(() => {
			setChrono(prev => {
				let [a, b, c, d] = prev

				d++
				if (d === 10) {
					d = 0
					c++
					if (c === 6) {
						d = 0
						c = 0
						b++
						if (b === 10) {
							d = 0
							c = 0
							b = 0
							a++
							if (a === 6) {
								clearInterval(interval)
							}
						}
					}
				}

				return [a, b, c, d]
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [mistakes])

	useEffect(() => {
		if (mistakes === 3) {
			clearInterval(interval)
		}
	}, [mistakes])

	return (
		<div className="flex items-center justify-between w-full text-gray-500 sm:text-base font-regular">
			<div className="capitalize">
				Difficulty:{' '}
				<span
					className={
						difficulty === 'easy'
							? 'text-green-500'
							: difficulty === 'medium'
							? 'text-yellow-500'
							: 'text-orange-600'
					}>
					{difficulty}
				</span>
			</div>
			<div className={gameOver ? 'text-red-600' : ''}>
				{chrono[0] < 6
					? `${gameOver ? 'Game Over! ' : ''}${chrono[0]}${chrono[1]} : ${chrono[2]}${
							chrono[3]
					  }`
					: 'Too long!'}
			</div>
			<div>Mistakes: {mistakes}/3</div>
		</div>
	)
}
