import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import classes from './LessonListItem.module.scss'

import { ERoutePath, IABOUT_COURSE_Params, ILAST_ID_Params } from 'app/providers/AppRouters'
import { ILESSON_Params, ITASK_CREATE_ANSWER_Params } from 'app/providers/AppRouters/'

import { useStudentHasAccess } from 'features/CustomUsers/Student'

import { IAboutLessonData } from 'entities/Lesson/types'
import { EListModuleType, IListModule } from 'entities/Module/types'
import { getUserType } from 'entities/Users/CustomUser'

import { classnames as cn, deleteRouteId, setParamsInPath } from 'shared/lib'
import { AnimatedButton, Button, Htag, Icon, TextBox } from 'shared/ui'

export const LessonListItem = ({ styles, data, hasButton = true, disabled, moduleIndex }: ILessonListItemProps) => {
	const { t } = useTranslation('course')
	const user = useSelector(getUserType)
	const { course_id } = useParams<IABOUT_COURSE_Params>()
	const access = course_id ? useStudentHasAccess(course_id) : false

	const renderContent = () => {
		switch (data.module_type) {
			case EListModuleType.LECTURE:
				return (
					<>
						<div className={classes.left_block}>
							<TextBox size={'medium'}>{data.lecture_id?.title}</TextBox>
							<Htag tag={'very-small'}>{data.lecture_id?.description}</Htag>
						</div>
						{hasButton && (
							<>
								{(user === 'admin' || user === 'super-admin') && (
									<Link
										to={setParamsInPath<ILESSON_Params>(ERoutePath.LESSON, {
											module_index: String(moduleIndex),

											list_module_id: String(data.id),
											course_id: String(course_id),
										})}
									>
										<AnimatedButton icon={'right'}>Пререйти</AnimatedButton>
									</Link>
								)}
								{user === 'student' && access && !disabled && (
									<Link
										to={setParamsInPath<ILESSON_Params>(ERoutePath.LESSON, {
											module_index: String(moduleIndex),

											list_module_id: String(data.id),
											course_id: String(course_id),
										})}
									>
										<AnimatedButton icon={'right'}>Пререйти</AnimatedButton>
									</Link>
								)}
							</>
						)}
					</>
				)
			case EListModuleType.FILE_TASK:
				return (
					<>
						<div className={classes.left_block}>
							<TextBox size={'medium'}>{data.file_task_id?.title}</TextBox>
						</div>
						{hasButton && (
							<>
								{(user === 'admin' || user === 'super-admin') && (
									<Link
										to={setParamsInPath<ITASK_CREATE_ANSWER_Params>(ERoutePath.TASK_CREATE_ANSWER, {
											module_index: String(moduleIndex),

											list_module_id: String(data.id),
											course_id: String(course_id),
										})}
									>
										<AnimatedButton icon={'right'}>Пререйти</AnimatedButton>
									</Link>
								)}
								{user === 'student' && access && !disabled && (
									<Link
										to={setParamsInPath<ITASK_CREATE_ANSWER_Params>(ERoutePath.TASK_CREATE_ANSWER, {
											module_index: String(moduleIndex),

											list_module_id: String(data.id),
											course_id: String(course_id),
										})}
									>
										<AnimatedButton icon={'right'}>Пререйти</AnimatedButton>
									</Link>
								)}
							</>
						)}
					</>
				)

			default:
				break
		}
	}

	return <div className={cn(classes.LessonListItem, [styles])}>{renderContent()}</div>
}

interface ILessonListItemProps {
	styles?: string
	data: IListModule
	hasButton?: boolean
	disabled: boolean
	moduleIndex: number
}
