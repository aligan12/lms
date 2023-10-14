import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import classes from './ModuleList.module.scss'

import { useLastAttendance } from 'entities/Grade'
import { LessonListItem } from 'entities/Lesson/LessonListItem'
import { ModuleListItem } from 'entities/Module/ModuleListItem'
import { IListModule, IModuleData } from 'entities/Module/types'

import { classnames as cn } from 'shared/lib'
import { AccordionWrapper, List } from 'shared/ui'

export const ModuleList = ({ styles, module, module_index, mini = false }: IModuleListProps) => {
	const { isDisabled, lastAttendance, lastModuleIndex } = useLastAttendance(module_index)
	return (
		<div
			className={cn(classes.ModuleList, [styles])}
			key={module.id}
		>
			<AccordionWrapper
				main={
					<ModuleListItem
						mini={mini}
						data={module}
					/>
				}
				renderItems={
					<List
						styles={classes.lesson_list}
						items={module.list_modules}
						variation={'list'}
						renderItem={(data: IListModule) => (
							<LessonListItem
								moduleIndex={module_index}
								disabled={isDisabled(data, lastAttendance, lastModuleIndex)}
								data={data}
								key={data.id}
							/>
						)}
					/>
				}
			/>
		</div>
	)
}

interface IModuleListProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	module: IModuleData
	module_index: number
	mini?: boolean
}
