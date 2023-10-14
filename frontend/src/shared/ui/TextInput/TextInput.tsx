import { DetailedHTMLProps, ForwardedRef, HtmlHTMLAttributes, forwardRef } from 'react'

import classes from './TextInput.module.scss'

import { classnames as cn } from 'shared/lib'

export const TextInput = forwardRef(
	({ styles, children, value, ...props }: ITextInputProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
		return (
			<div className={cn(classes.TextInput, [styles])}>
				<textarea
					value={value}
					ref={ref}
					className={classes.textarea}
					placeholder={children}
					{...props}
				></textarea>
			</div>
		)
	},
)

interface ITextInputProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	children: string
	styles?: string
	value?: string
}
