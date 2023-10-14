import type { Meta, StoryObj } from '@storybook/react'

import { ListItem } from './ListItem'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'
import { Icon } from 'shared/ui/Icon/Icon'

const meta: Meta<typeof ListItem> = {
	title: 'Example/ListItem',
	component: ListItem,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Dark: Story = {
	args: { children: 'Мое обучение' },
	decorators: [ThemeDecorator(ETheme.DARK)],
}

export const Left: Story = {
	args: {
		children: 'Мое обучение',
		left: <Icon icon="home" />,
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Mid: Story = {
	args: { children: 'Русский' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Right: Story = {
	args: {
		children: 'Задизайнить LMS, дедлайн..',
		right: <Icon icon="chat" />,
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const MidUp: Story = {
	args: {
		children: 'Задизайнить LMS, дедлайн..',
		mid_up: 'Новое сообщение',
		right: <Icon icon="chat" />,
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const MidDown: Story = {
	args: {
		children: 'Название урока',
		mid_down: '01.06',
		left: <Icon icon="calendar" />,
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Primary: Story = {
	args: {
		children: 'Задизайнить LMS, дедлайн..',
		mid_up: 'Новое сообщение',
		right: (
			<Icon
				icon="chat"
				variation="primary"
			/>
		),
		variation: 'inverted-secondary',
		hover: 'hover_primary',
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Inverted: Story = {
	args: {
		children: 'Название урока',
		mid_down: '01.06',
		left: (
			<Icon
				icon="calendar"
				variation="inverted-secondary"
			/>
		),
		variation: 'inverted-secondary',
		hover: 'hover_inverted-secondary',
	},
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
