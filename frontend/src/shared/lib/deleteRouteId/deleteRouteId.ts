export const deleteRouteId = (route: string): string => {
	if (route) {
		const routeArray = route.split('/')
		routeArray.pop()
		const newRoute: string = routeArray.join('/') + '/'
		return newRoute
	}
	return ''
}
