import type { Meta, StoryObj } from '@storybook/react'

import { CodeBox } from './CodeBox'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof CodeBox> = {
	title: 'Example/CodeBox',
	component: CodeBox,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { children: 'C:UsersYour Name>python --version' },
	decorators: [ThemeDecorator(ETheme.DARK)],
}

export const Secondary: Story = {
	args: { children: 'C:UsersYour Name>python --version' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
