import { classnames } from 'shared/lib'

describe('classnames', () => {
	test('with only first params', () => {
		expect(classnames('someClass')).toBe('someClass')
	})

	test('with additional class', () => {
		expect(classnames('someClass', ['additional1', 'additional2'])).toBe(
			'someClass additional1 additional2',
		)
	})

	test('with mods', () => {
		expect(
			classnames('someClass', ['additional1', 'additional2'], {
				mode1: false,
				mode2: true,
			}),
		).toBe('someClass additional1 additional2 mode2')
	})

	test('with two mods ', () => {
		expect(
			classnames('someClass', ['additional1', 'additional2'], {
				mode1: true,
				mode2: true,
			}),
		).toBe('someClass additional1 additional2 mode1 mode2')
	})

	test('with undefined mods ', () => {
		expect(
			classnames('someClass', ['additional1', 'additional2'], {
				mode1: false,
				mode2: true,
			}),
		).toBe('someClass additional1 additional2 mode2')
	})
})
