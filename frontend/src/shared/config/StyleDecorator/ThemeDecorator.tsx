import { Story } from '@storybook/react'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'
import 'app/styles/index.scss'

export const ThemeDecorator = (theme: ETheme) => (StoryComponent: Story) =>
	(
		<div className={`app ${theme}`}>
			<StoryComponent />
		</div>
	)
