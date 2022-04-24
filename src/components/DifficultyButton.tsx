import { useSetRecoilState } from 'recoil'
import { statsAtom } from '../atoms'

export default function DifficultyButton() {
	const setStats = useSetRecoilState(statsAtom)

	function changeDifficulty() {
		setStats(prev => {
			const nextDifficulty =
				prev.difficulty === 'easy'
					? 'medium'
					: prev.difficulty === 'medium'
					? 'hard'
					: 'easy'
			return {
				...prev,
				difficulty: nextDifficulty
			}
		})
	}

	return (
		<button onClick={changeDifficulty} className="button">
			Change Difficulty
		</button>
	)
}
