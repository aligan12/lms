import type { Meta, StoryObj } from '@storybook/react'

import { VerticalBarChart } from './VerticalBarChart'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof VerticalBarChart> = {
	title: 'Example/VerticalBarChart',
	component: VerticalBarChart,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Secondary: Story = {
	args: {},
	decorators: [ThemeDecorator(ETheme.DARK)],
}
