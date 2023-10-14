import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from './Icon'

import { ETheme } from 'app/providers/ThemeProvider/lib/ThemeContext'

import { ThemeDecorator } from 'shared/config/StyleDecorator/ThemeDecorator'

const meta: Meta<typeof Icon> = {
	title: 'Example/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { icon: 'home', variation: 'primary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Secondary: Story = {
	args: { icon: 'home', variation: 'secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const InvertedSecondary: Story = {
	args: { icon: 'home', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Red: Story = {
	args: { icon: 'home', variation: 'red' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Home: Story = {
	args: { icon: 'home', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Book: Story = {
	args: { icon: 'book', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Calendar: Story = {
	args: { icon: 'calendar', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Chat: Story = {
	args: { icon: 'chat', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Circle: Story = {
	args: { icon: 'circle', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const CircleFilled: Story = {
	args: { icon: 'circle_filled', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Clock: Story = {
	args: { icon: 'clock', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Close: Story = {
	args: { icon: 'close', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Courses: Story = {
	args: { icon: 'courses', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Done: Story = {
	args: { icon: 'done', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Down: Story = {
	args: { icon: 'down', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Edit: Story = {
	args: { icon: 'edit', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const File: Story = {
	args: { icon: 'file', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Language: Story = {
	args: { icon: 'language', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Left: Story = {
	args: { icon: 'left', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
export const Link: Story = {
	args: { icon: 'link', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Lock: Story = {
	args: { icon: 'lock', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Mail: Story = {
	args: { icon: 'mail', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Notification: Story = {
	args: { icon: 'notification', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Plus: Story = {
	args: { icon: 'plus', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Right: Story = {
	args: { icon: 'right', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
export const Save: Story = {
	args: { icon: 'save', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Search: Story = {
	args: { icon: 'search', variation: 'secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Settings: Story = {
	args: { icon: 'settings', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Shield: Story = {
	args: { icon: 'shield', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const StarFilled: Story = {
	args: { icon: 'star_filled', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Star: Story = {
	args: { icon: 'star', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Teacher: Story = {
	args: { icon: 'teacher', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Tool: Story = {
	args: { icon: 'tool', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Up: Story = {
	args: { icon: 'up', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Video: Story = {
	args: { icon: 'video', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}

export const Trash: Story = {
	args: { icon: 'trash', variation: 'inverted-secondary' },
	decorators: [ThemeDecorator(ETheme.LIGHT)],
}
