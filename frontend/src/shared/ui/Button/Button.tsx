import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import classes from './Button.module.scss'

import { classnames as cn } from 'shared/lib'

export const Button: FC<IButtonProps> = ({ styles, variation = 'primary', format = 'small', children, ...props }) => {
	return (
		<button
			className={cn(classes.Button, [styles], {
				[classes.primary]: variation === 'primary',
				[classes.secondary]: variation === 'secondary',
				[classes.clear]: variation === 'clear',
				[classes.large]: format === 'large',
				[classes.small]: format === 'small',
				[classes.medium]: format === 'medium',
			})}
			{...props}
		>
			<div className={classes.flex}>{children}</div>
		</button>
	)
}

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	styles?: string
	children: string | React.ReactNode | React.ReactNode[]
	variation?: 'primary' | 'secondary' | 'clear'
	format?: 'large' | 'small' | 'medium'
}
