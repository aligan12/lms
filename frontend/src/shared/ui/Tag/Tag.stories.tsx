import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '../Icon/Icon'
import { Tag } from './Tag'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Tag> = {
	title: 'Example/Tag',
	component: Tag,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { variation: 'primary', children: '36' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Secondary: Story = {
	args: { variation: 'secondary', children: '36' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Small: Story = {
	args: { size: 'small' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Medium: Story = {
	args: { size: 'medium', children: '36' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Large: Story = {
	args: {
		size: 'large',
		children: (
			<Icon
				icon="right"
				variation="secondary"
			/>
		),
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
