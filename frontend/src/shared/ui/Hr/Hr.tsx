import classes from './Hr.module.scss'

import { classnames as cn } from 'shared/lib'

export const Hr = ({ styles }: IHrProps) => {
	return (
		<div className={classes.wrapper}>
			<hr className={cn(classes.line, [styles])} />
		</div>
	)
}

interface IHrProps {
	styles?: string
}
