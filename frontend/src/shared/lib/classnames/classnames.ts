type TMods = Record<string, boolean | string>

export const classnames = (
	cls: string,
	addition: Array<string | undefined> = [],
	modes: TMods = {},
) => {
	return [
		cls,
		...addition.filter(Boolean),
		...Object.entries(modes)
			.filter(([_, value]) => Boolean(value))
			.map(([key, _]) => key),
	].join(' ')
}
