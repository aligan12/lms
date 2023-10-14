import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from './TextInput'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof TextInput> = {
	title: 'Example/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Dark: Story = {
	args: { children: 'Введите текст' },
	decorators: [ThemeDecorator(ETheme.DARK)],
}

export const LIGHT: Story = {
	args: { children: 'Введите текст' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
