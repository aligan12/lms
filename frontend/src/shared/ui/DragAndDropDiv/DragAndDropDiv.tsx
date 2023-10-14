import { BaseSyntheticEvent, DetailedHTMLProps, HTMLAttributes, HtmlHTMLAttributes, useState } from 'react'

import classes from './DragAndDropDiv.module.scss'

import { classnames as cn } from 'shared/lib'

export function DragAndDropDiv<T>({
	styles,
	item,
	children,
	childrenId,
	startHandler,
	leaveHandler,
	overHandler,
	endHandler,
	dropHandler,
}: IDragAndDropDivProps<T>) {
	return (
		<div className={cn(classes.DragAndDropDiv, [styles])}>
			<div
				className={classes.drag}
				id={childrenId}
				onDragStart={(e) => startHandler && startHandler(e, item)}
				onDragLeave={(e) => leaveHandler && leaveHandler(e)}
				onDragEnd={(e) => endHandler && endHandler(e)}
				onDragOver={(e) => overHandler && overHandler(e)}
				onDrop={(e) => dropHandler && dropHandler(e, item)}
				draggable={true}
			></div>
			<div className={classes.event_none}>{children}</div>
		</div>
	)
}

interface IDragAndDropDivProps<T> extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	item: T
	childrenId: string
	startHandler?: (e: BaseSyntheticEvent, content: T) => void
	leaveHandler?: (e: BaseSyntheticEvent) => void
	overHandler?: (e: BaseSyntheticEvent) => void
	endHandler?: (e: BaseSyntheticEvent) => void
	dropHandler?: (e: BaseSyntheticEvent, content: T) => void
}
