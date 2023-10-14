// eslint-disable-next-line prettier/prettier
export function setParamsInPath<T extends Record<string, string>>(route: string, params: Record<string, string> | T) {
	return Object.keys(params).reduce((path, key) => path?.replace(':' + key, params[key]), route)
}
