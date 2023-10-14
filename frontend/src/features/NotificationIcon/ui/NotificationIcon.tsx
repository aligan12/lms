import classes from './NotificationIcon.module.scss'

import { classnames as cn } from 'shared/lib'
import { Icon } from 'shared/ui'

export const NotificationIcon = ({ styles }: INotificationIconProps) => {
	return (
		<Icon
			icon={'notification'}
			className={cn(classes.NotificationIcon, [styles])}
		/>
	)
}

interface INotificationIconProps {
	styles?: string
}
