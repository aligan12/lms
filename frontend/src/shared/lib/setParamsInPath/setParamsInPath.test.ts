import { setParamsInPath } from './setParamsInPath'

describe('setParamsInPath', () => {
	test('with only first params', () => {
		expect(
			setParamsInPath('/course/:course_id/edit_lesson/:lesson_id', {
				course_id: '1',
				lesson_id: '2',
			}),
		).toBe('/course/1/edit_lesson/2')
	})
})
