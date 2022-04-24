export default function createEmptyBoard(): (number | null)[][] {
	return new Array(9).fill(null).map(() => new Array(9).fill(null))
}
