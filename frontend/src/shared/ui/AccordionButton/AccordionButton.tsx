import { CircleForIcon } from '../CircleForIcon/CircleForIcon'
import { Icon } from '../Icon/Icon'
import classes from './AccordionButton.module.scss'

export const AccordionButton = ({ styles, isOpen }: IAccordionButtonProps) => {
	return (
		<CircleForIcon
			className={styles}
			variation={'primary'}
		>
			<Icon
				styles={[classes.animate, isOpen && classes.is_open].join(' ')}
				variation={'primary'}
				icon={'up'}
			/>
		</CircleForIcon>
	)
}

interface IAccordionButtonProps {
	styles?: string
	isOpen: boolean
}
