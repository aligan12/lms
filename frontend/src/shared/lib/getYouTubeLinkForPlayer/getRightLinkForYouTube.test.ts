import { getRightLinkForYouTube } from './getRightLinkForYouTube'

describe('classnames', () => {
	test('with only first params', () => {
		expect(getRightLinkForYouTube('https://youtu.be/U0lib5e_c-A')).toBe(
			'https://www.youtube.com/embed/U0lib5e_c-A',
		)
	})
})
