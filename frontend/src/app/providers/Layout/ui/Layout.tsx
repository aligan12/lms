import { DetailedHTMLProps, HTMLAttributes } from 'react'

import classes from './Layout.module.scss'

import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'

import { classnames as cn } from 'shared/lib'

export const Layout = ({ styles, children }: ILayoutProps) => {
	return (
		<div className={cn(classes.Layout, [styles])}>
			<Navbar styles={classes.navbar} />
			<div className={classes.page}>{children}</div>
			<Sidebar styles={classes.sidebar} />
		</div>
	)
}

interface ILayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
}
