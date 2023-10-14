import type { Meta, StoryObj } from '@storybook/react'

import { DoughnutChart } from './DoughnutChart'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof DoughnutChart> = {
	title: 'Example/DoughnutChart',
	component: DoughnutChart,
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
