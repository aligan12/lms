import type { Meta, StoryObj } from '@storybook/react'

import { Htag } from './Htag'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Htag> = {
	title: 'Example/Htag',
	component: Htag,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const VeryLarge: Story = {
	args: { children: 'Название курса', tag: 'very-large' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Large: Story = {
	args: { children: 'Название курса', tag: 'large' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Medium: Story = {
	args: { children: 'Программа курса', tag: 'medium' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Small: Story = {
	args: { children: 'Название модуля', tag: 'small' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const VerySmall: Story = {
	args: { children: 'Описание урока', tag: 'very-small' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
