import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import classes from './Tag.module.scss'

import { classnames as cn } from 'shared/lib'

export const Tag = ({ styles, size = 'medium', variation = 'primary', children }: ITagProps) => {
	return (
		<div
			className={cn(classes.Tag, [styles], {
				[classes.medium]: size === 'medium',

				[classes.small]: size === 'small',
				[classes.large]: size === 'large',
				[classes.primary]: variation === 'primary',
				[classes.secondary]: variation === 'secondary',
				[classes.clear]: variation === 'clear',
			})}
		>
			{children}
		</div>
	)
}

interface ITagProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	size: 'small' | 'medium' | 'large'
	variation: 'primary' | 'secondary' | 'clear'
}
