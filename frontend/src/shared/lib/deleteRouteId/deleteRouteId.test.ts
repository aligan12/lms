import { deleteRouteId } from './deleteRouteId'

describe('classnames', () => {
	test('with only first params', () => {
		expect(deleteRouteId('/about_course/:id')).toBe('/about_course/')
	})
})
