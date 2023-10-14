import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import classes from './ViewAnswerPage.module.scss'

import { ERoutePath, ITASK_VIEW_ANSWER_Params } from 'app/providers/AppRouters'

import { BackButton } from 'features/BackButton'
import { CreateTaskGradeForm } from 'features/Task/CreateTaskGradeForm'

import { getOneGradeData, oneTaskGradeRequest } from 'entities/Grade'
import { StarsGroup } from 'entities/StarsGroup'
import { AboutTask } from 'entities/Task/AboutTask'
import { StudentAnswer, getTaskAnswerRequest, retrieveTaskReducer, retrieveTaskRequest } from 'entities/Task/TaskData'
import { getUserInfo } from 'entities/Users/CustomUser'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, Header, Htag, Icon, TextBox, TextInput } from 'shared/ui'

export const ViewAnswerPage = ({ styles }: IViewAnswerPageProps) => {
	const { t } = useTranslation('admin')
	const dispatch = useAppDispatch()

	const hasGrade = useSelector(getOneGradeData)
	const { list_module_id, course_id, student_id } = useParams<ITASK_VIEW_ANSWER_Params>()
	useEffect(() => {
		list_module_id && dispatch(retrieveTaskRequest({ list_module_id: Number(list_module_id) }))
		list_module_id &&
			student_id &&
			dispatch(oneTaskGradeRequest({ listModuleId: Number(list_module_id), studentId: Number(student_id) }))
	}, [])

	useEffect(() => {
		if (hasGrade && student_id) {
			dispatch(
				getTaskAnswerRequest({
					listModulesId: Number(list_module_id),
					studentId: Number(student_id),
					courseId: Number(course_id),
				}),
			)
		}
	}, [hasGrade])
	return (
		<DynamicModuleLoader
			reducer={retrieveTaskReducer}
			reducerKey="retrieveTaskData"
		>
			<div className={cn(classes.ViewAnswerPage, [styles])}>
				<BackButton />
				<div className={classes.main}>
					<AboutTask />
					<Header
						title={`${t('otvet-studenta')}`}
						styles={classes.head}
					/>
					<StudentAnswer />

					<CreateTaskGradeForm />
				</div>
			</div>
		</DynamicModuleLoader>
	)
}
export default ViewAnswerPage

interface IViewAnswerPageProps {
	styles?: string
}
