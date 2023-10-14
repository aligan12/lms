import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './TaskAnswersPage.module.scss'

import { ERoutePath, ITASK_ANSWERS_Params, ITASK_VIEW_ANSWER_Params } from 'app/providers/AppRouters'

import { allGradesOfTask, getGradeWithStudentInfo } from 'entities/Grade'
import { IGradeData } from 'entities/Grade/types'
import { AboutStudentList } from 'entities/Users/Student/AboutStudentList'

import { classnames as cn, setParamsInPath, useAppDispatch } from 'shared/lib'
import { List } from 'shared/ui'

const TaskAnswersPage = ({ styles }: ITaskAnswersPageProps) => {
	const data = useSelector(getGradeWithStudentInfo)
	const { list_module_id, course_id } = useParams<ITASK_ANSWERS_Params>()
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(allGradesOfTask({ list_modules: Number(list_module_id) }))
	}, [])

	console.log('DATA', data)

	return (
		<div className={cn(classes.TaskAnswersPage, [styles])}>
			{data && (
				<List
					variation="list"
					items={data}
					renderItem={(grade: IGradeData) => (
						<AboutStudentList
							data={grade.student_profile}
							link={setParamsInPath<ITASK_VIEW_ANSWER_Params>(ERoutePath.TASK_VIEW_ANSWER, {
								course_id: String(course_id),
								list_module_id: String(list_module_id),
								student_id: String(grade.student),
							})}
						/>
					)}
				/>
			)}
		</div>
	)
}

export default TaskAnswersPage

interface ITaskAnswersPageProps {
	styles?: string
}
