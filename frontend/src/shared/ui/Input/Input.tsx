import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

import classes from './Input.module.scss'

import { classnames as cn } from 'shared/lib'

export const Input = forwardRef(
	(
		{ styles, variation = 'secondary', format = 'medium', children, ...props }: IInputProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<input
				ref={ref}
				className={cn(classes.Input, [styles], {
					[classes.secondary]: variation === 'secondary',
					[classes.clear]: variation === 'clear',
					[classes.medium]: format === 'medium',
					[classes.small]: format === 'small',
					[classes.large]: format === 'large',
				})}
				placeholder={children}
				{...props}
			></input>
		)
	},
)

interface IInputProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	styles?: string
	variation?: 'secondary' | 'clear'
	format?: 'small' | 'medium' | 'large'
	children?: string
}
