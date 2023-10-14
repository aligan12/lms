import type { Meta, StoryObj } from '@storybook/react'

import { Step } from './Step'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Step> = {
	title: 'Example/Step',
	component: Step,
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
	args: { variation: 'secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const First: Story = {
	args: { format: 'first' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Second: Story = {
	args: { format: 'second' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
export const Last: Story = {
	args: { format: 'last' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
