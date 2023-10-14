import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import classes from './CodeBox.module.scss'

import { classnames as cn } from 'shared/lib'

export const CodeBox = ({ styles, children }: ICodeBoxProps) => {
	return (
		<div className={cn('', [styles])}>
			<div className={classes.code_wrapper}>
				<p className={classes.code}>
					<pre>{children}</pre>
				</p>
			</div>
		</div>
	)
}

interface ICodeBoxProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	children: string
}
