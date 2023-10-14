import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode, useState } from 'react'

import classes from './ListItem.module.scss'

import { classnames as cn } from 'shared/lib'

export const ListItem = ({
	styles,
	right = null,
	left = null,
	mid_up,
	mid_down,
	hover = 'hover_inverted-secondary',
	variation = 'clear',
	children,
	...props
}: IListItemProps) => {
	return (
		<div
			className={cn(classes.ListItem, [styles], {
				[classes.large]: Boolean(mid_up) || Boolean(mid_down),
				[classes.hover_primary]: hover === 'hover_primary',
				[classes.hover_inverted]: hover === 'hover_inverted-secondary',
				[classes.primary]: variation === 'primary',
				[classes.inverted_secondary]: variation === 'inverted-secondary',
				[classes.clear]: variation === 'clear',
			})}
			{...props}
		>
			{left && (
				<div
					className={cn(classes.left, [], {
						[classes.down]: Boolean(mid_up),
						[classes.up]: Boolean(mid_down),
					})}
				>
					{left}
				</div>
			)}

			<div className={classes.mid_wrapper}>
				{mid_up && <div className={classes.mid_up}>{mid_up}</div>}
				<div className={classes.mid}>{children}</div>
				{mid_down && <div className={classes.mid_down}>{mid_down}</div>}
			</div>

			{right && (
				<div
					className={cn(classes.right, [], {
						[classes.down]: Boolean(mid_up),
						[classes.up]: Boolean(mid_down),
					})}
				>
					{right}
				</div>
			)}
		</div>
	)
}

interface IListItemProps
	extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	right?: ReactNode | null
	left?: React.ReactNode | null
	mid_up?: string | ReactNode
	mid_down?: string | ReactNode
	hover: 'hover_primary' | 'hover_inverted-secondary' | 'none'
	variation: 'primary' | 'inverted-secondary' | 'clear'
	children?: string | ReactNode
}
