export default function map2d<A, B>(
	arr: A[][],
	callbackfn: (el: A, i: number, j: number) => B
): B[][] {
	let newArr: B[][] = []

	for (let j = 0; j < arr.length; j++) {
		newArr.push([])
		for (let i = 0; i < arr[j].length; i++) {
			newArr[j].push(callbackfn(arr[j][i], i, j))
		}
	}
	return newArr
}
