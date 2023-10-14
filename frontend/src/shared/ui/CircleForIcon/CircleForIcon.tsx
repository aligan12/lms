import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from 'react'

import classes from './CircleForIcon.module.scss'

import { classnames as cn } from 'shared/lib'

export const CircleForIcon = ({
	styles,
	children,
	variation = 'primary',
	format = 'medium',
	fill,
}: ICircleForIconProps) => {
	return (
		<div
			className={cn(classes.CircleForIcon, [styles, classes.right_block], {
				[classes.red]: variation === 'red',
				[classes.white]: variation === 'white',
				[classes.gray]: variation === 'gray',
				[classes.primary]: variation === 'primary',
				[classes.inverted]: variation === 'inverted-secondary',
				[classes.small]: format === 'small',
				[classes.medium]: format === 'medium',
				[classes.fill_primary]: fill === 'primary',
			})}
		>
			{children}
		</div>
	)
}

interface ICircleForIconProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	children: ReactNode
	variation: 'red' | 'inverted-secondary' | 'primary' | 'gray' | 'white'
	format?: 'medium' | 'small'
	fill?: 'red' | 'inverted-secondary' | 'primary' | 'gray' | 'white'
}
