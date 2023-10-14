import type { Preview } from '@storybook/react'

import { StyleDecorator } from '../../src/shared/config/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/StyleDecorator/ThemeDecorator'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [StyleDecorator],
}

export default preview
