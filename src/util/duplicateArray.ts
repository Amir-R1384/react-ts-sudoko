export default function duplicateArr<T>(arr: Array<T>): Array<T> {
	return JSON.parse(JSON.stringify(arr))
}
