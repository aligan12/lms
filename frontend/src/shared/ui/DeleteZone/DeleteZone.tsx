import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { Icon } from '../Icon/Icon'
import classes from './DeleteZone.module.scss'

import { classnames as cn } from 'shared/lib'

export const DeleteZone = ({ styles, isVisible, ...props }: IDeleteZoneProps) => {
	return (
		<div
			className={cn(classes.DeleteZone, [styles], {
				[classes.invisible]: isVisible === false,
			})}
			{...props}
		>
			<Icon
				size={'large'}
				variation={'red'}
				styles={classes.icon}
				icon={'trash'}
			/>
		</div>
	)
}

interface IDeleteZoneProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	isVisible?: boolean
}
