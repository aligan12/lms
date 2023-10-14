import { ReactNode, useState } from 'react'

import classes from './AccordionWrapper.module.scss'

import { classnames as cn } from 'shared/lib'

export const AccordionWrapper = ({ styles, main, renderItems }: IAccordionWrapperProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<div className={cn(classes.AccordionWrapper, [styles])}>
			<div onClick={() => setIsOpen(!isOpen)}>{main}</div>
			<div className={cn(classes.render_item, [], { [classes.is_open]: isOpen === true })}>{renderItems}</div>
		</div>
	)
}

interface IAccordionWrapperProps {
	styles?: string
	main: ReactNode
	renderItems: ReactNode
}
