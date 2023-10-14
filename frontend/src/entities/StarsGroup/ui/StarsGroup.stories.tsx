import type { Meta, StoryObj } from '@storybook/react'

import { StarsGroup } from './StarsGroup'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof StarsGroup> = {
	title: 'Example/StarsGroup',
	component: StarsGroup,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Dark: Story = {
	args: {
		rating: 3,
		changeable: true,
		setRating: () => {
			console.log('Rating Changed ')
		},
	},
	decorators: [ThemeDecorator(ETheme.DARK)],
}

export const Light: Story = {
	args: {
		rating: 3,
		changeable: true,
		setRating: () => {
			console.log('Rating Changed ')
		},
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Сhangeable: Story = {
	args: {
		rating: 3,
		changeable: true,
		setRating: () => {
			console.log('Rating Changed ')
		},
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Unchangeable: Story = {
	args: { rating: 3, changeable: false },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
