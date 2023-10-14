import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
	title: 'Example/Logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const LogoIcon: Story = {
	args: {},
}
