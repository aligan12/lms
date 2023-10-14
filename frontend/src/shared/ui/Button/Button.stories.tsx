import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Button> = {
	title: 'Example/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { children: 'Записаться на курс', variation: 'primary', format: 'small' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Secondary: Story = {
	args: { children: 'Сообщения', variation: 'secondary', format: 'medium' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Clear: Story = {
	args: { children: 'Сообщения', variation: 'clear', format: 'medium' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Medium: Story = {
	args: { children: 'Сообщения', variation: 'secondary', format: 'medium' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Large: Story = {
	args: { children: 'Сообщения', variation: 'secondary', format: 'large' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Small: Story = {
	args: { children: 'Сообщения', variation: 'secondary', format: 'small' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
