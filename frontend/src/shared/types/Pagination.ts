export interface IPagination<T> {
	count: number
	next: null | number
	previous: null | number
	results: T[]
}
