import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

import classes from './Header.module.scss'

import { classnames as cn } from 'shared/lib'
import { Htag } from 'shared/ui'
import { Hr } from 'shared/ui'

export const Header = ({ styles, title, buttons, line = true }: IHeaderProps) => {
	return (
		<>
			<div className={cn(classes.Header, [styles])}>
				<div className={classes.wrapper}>
					<Htag tag={'large'}>{title}</Htag>
					<div className={classes.button}>{buttons}</div>
				</div>
				{line && <Hr></Hr>}
			</div>
		</>
	)
}

interface IHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	title: string
	buttons?: ReactNode
	line?: boolean
}
