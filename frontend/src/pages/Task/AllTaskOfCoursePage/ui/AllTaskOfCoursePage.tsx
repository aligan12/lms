import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import classes from './AllTaskOfCoursePage.module.scss'

import { ERoutePath, IALL_TASK_Params, ITASK_ANSWERS_Params } from 'app/providers/AppRouters'

import { BackButton } from 'features/BackButton'

import { EListModuleType, IListModuleTaskData } from 'entities/Module/types'
import { getAllTaskData, getAllTaskOfCourse, retrieveTaskReducer } from 'entities/Task/TaskData'

import { DynamicModuleLoader, classnames as cn, setParamsInPath, useAppDispatch } from 'shared/lib'
import { Htag, List, ListItem } from 'shared/ui'

const AllTaskOfCoursePage = ({ styles }: IAllTaskOfCoursePageProps) => {
	// const data: IListModuleTaskData[] = [
	// 	{
	// 		id: 1,
	// 		lecture_id: null,
	// 		module_type: EListModuleType.FILE_TASK,
	// 		order: 1,
	// 		test_task_id: null,
	// 		file_task_id: {
	// 			title: 'Task',
	// 			description: 'adsfsd',
	// 			file: ' adfasdf',
	// 		},
	// 	},
	// 	{
	// 		id: 1,
	// 		lecture_id: null,
	// 		module_type: EListModuleType.FILE_TASK,
	// 		order: 1,
	// 		test_task_id: null,
	// 		file_task_id: {
	// 			title: 'Task',
	// 			description: 'adsfsd',
	// 			file: ' adfasdf',
	// 		},
	// 	},
	// 	{
	// 		id: 1,
	// 		lecture_id: null,
	// 		module_type: EListModuleType.FILE_TASK,
	// 		order: 1,
	// 		test_task_id: null,
	// 		file_task_id: {
	// 			title: 'Task',
	// 			description: 'adsfsd',
	// 			file: ' adfasdf',
	// 		},
	// 	},
	// 	{
	// 		id: 1,
	// 		lecture_id: null,
	// 		module_type: EListModuleType.FILE_TASK,
	// 		order: 1,
	// 		test_task_id: null,
	// 		file_task_id: {
	// 			title: 'Task',
	// 			description: 'adsfsd',
	// 			file: ' adfasdf',
	// 		},
	// 	},
	// ]

	const { course_id } = useParams<IALL_TASK_Params>()
	const data = useSelector(getAllTaskData)
	const dispatch = useAppDispatch()
	useEffect(() => {
		course_id && dispatch(getAllTaskOfCourse({ courseId: Number(course_id) }))
	}, [])

	console.log(data)

	return (
		<DynamicModuleLoader
			reducer={retrieveTaskReducer}
			reducerKey="retrieveTaskData"
		>
			<div className={classes.wrapper}>
				<BackButton />
				<div className={cn(classes.AllTaskOfCoursePage, [styles])}>
					{data && data.length > 0 ? (
						<List
							variation="list"
							items={data}
							renderItem={(item: IListModuleTaskData) => (
								<Link
									to={setParamsInPath<ITASK_ANSWERS_Params>(ERoutePath.TASK_ANSWERS, {
										list_module_id: String(item.id),
										course_id: String(course_id),
									})}
								>
									<ListItem
										styles={classes.item}
										key={item.id}
										right={item.file_task_id.title}
										variation="clear"
										hover="hover_inverted-secondary"
									/>
								</Link>
							)}
						/>
					) : (
						<Htag tag="large">В данном курсе нет заданий </Htag>
					)}
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

export default AllTaskOfCoursePage
interface IAllTaskOfCoursePageProps {
	styles?: string
}
