import classes from './AddCourseCard.module.scss'

import { classnames as cn } from 'shared/lib'
import { Icon } from 'shared/ui'

export const AddCourseCard = ({ styles }: IAddCourseCardProps) => {
	return (
		<div className={cn(classes.AddCourseCard, [styles])}>
			<div className={classes.plus}>
				<Icon
					variation={'primary'}
					icon={'plus'}
					cursor={'cursor_pointer'}
					size={'large'}
				/>
			</div>
		</div>
	)
}

interface IAddCourseCardProps {
	styles?: string
}
