import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import classes from './TextBox.module.scss'

import { classnames as cn } from 'shared/lib'

export const TextBox = ({ styles, size = 'medium', children, ...props }: ITextBoxProps) => {
	return (
		<p
			className={cn(classes.TextBox, [styles], {
				[classes.large]: size === 'large',
				[classes.medium]: size === 'medium',
				[classes.small]: size === 'small',
			})}
			{...props}
		>
			{children}
		</p>
	)
}

interface ITextBoxProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	styles?: string
	size: 'large' | 'medium' | 'small'
	children: string | number | string[] | number[] | undefined
}
