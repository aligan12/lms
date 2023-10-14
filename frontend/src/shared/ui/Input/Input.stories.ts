import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Input> = {
	title: 'Example/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Clear: Story = {
	args: { variation: 'clear', children: 'Найти' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Secondary: Story = {
	args: { variation: 'secondary', children: 'Найти' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
export const Large: Story = {
	args: { format: 'large', children: 'Найти' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Medium: Story = {
	args: { format: 'medium', children: 'Найти' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Small: Story = {
	args: { format: 'small', children: 'Найти' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
