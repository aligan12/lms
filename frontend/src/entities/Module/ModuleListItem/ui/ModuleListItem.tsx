import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './ModuleListItem.module.scss'

import { IModuleData } from 'entities/Module/types'

import { classnames as cn } from 'shared/lib'
import { AccordionButton, Htag } from 'shared/ui'

export const ModuleListItem = ({ styles, data, mini = false, ...props }: IModuleListItemProps) => {
	const { t } = useTranslation('course')
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={cn(classes.ModuleListItem, [styles])}
			{...props}
		>
			<div className={classes.left_block}>
				<Htag tag={'very-small'}>
					{t('modul')} {data.number}
				</Htag>
				<Htag tag={'medium'}>{data.title}</Htag>
				{!mini && (
					<Htag
						styles={classes.description}
						tag={'small'}
					>
						{data.description}
					</Htag>
				)}
			</div>
			<div className={classes.right_block}>
				<AccordionButton isOpen={isOpen} />
			</div>
		</div>
	)
}

interface IModuleListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	data: IModuleData
	mini?: boolean
}
