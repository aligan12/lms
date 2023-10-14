import React, { FC } from 'react'

import classes from './List.module.scss'

import { classnames as cn } from 'shared/lib'

export function List<T>(props: IListProps<T>) {
	return (
		<div
			className={cn(classes.wrapper, [props.styles], {
				[classes.card]: props.variation === 'card',
				[classes.list]: props.variation === 'list',
			})}
		>
			{props.items.map(props.renderItem)}
		</div>
	)
}

interface IListProps<T> {
	variation: 'card' | 'list'
	styles?: string
	items: any[]
	renderItem: (item: T, index: number) => React.ReactNode
}
