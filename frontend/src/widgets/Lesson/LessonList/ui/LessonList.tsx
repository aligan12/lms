import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classes from './LessonList.module.scss'

import { ModuleProgram } from 'widgets/Module/ModuleProgram'

import { IAboutLessonData } from 'entities/Lesson/types'
import { getAllModuleData } from 'entities/Module/ModuleData'
import { ModuleListItem } from 'entities/Module/ModuleListItem'

import { classnames as cn } from 'shared/lib'
import { AccordionWrapper, Htag, Icon, List, ListItem } from 'shared/ui'

export const LessonList = ({ styles }: ILessonListProps) => {
	const { t } = useTranslation('course')

	const data = useSelector(getAllModuleData)
	return (
		<div className={cn(classes.LessonList, [styles])}>
			<Htag tag={'medium'}>Программа курса</Htag>
			<ModuleProgram
				mini={true}
				styles={classes.module}
			/>
		</div>
	)
}

interface ILessonListProps {
	styles?: string
}
