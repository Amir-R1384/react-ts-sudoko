import map2d from '../util/map2d'

export default function Subgrids() {
	const array = Array(3)
		.fill(null)
		.map(() => Array(3).fill(null))

	return (
		<>
			{map2d(array, (cell, x, y) => (
				<div
					key={`${x}${y}`}
					className={`absolute pointer-events-none w-1/3 border border-gray-700 h-1/3 top-${
						y === 0 ? 0 : y + '/3'
					}
                     left-${x === 0 ? 0 : x + '/3'}`}></div>
			))}
		</>
	)
}
