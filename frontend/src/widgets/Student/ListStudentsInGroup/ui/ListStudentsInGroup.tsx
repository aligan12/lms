import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getListStudentsGroupData } from '../models/selectors/getListStudentsGroupData'
import { listStudentsinGroupReducer } from '../models/slice/ListStudentsInGroupSlice'
import { listStudentsGroupRequest } from '../services/ListStudentsGroupRequest'
import classes from './ListStudentsInGroup.module.scss'

import { IGROUP_LIST_Params } from 'app/providers/AppRouters/config/routeConfig'

import { ICourseData } from 'entities/Course/types'
import { AboutStudentList } from 'entities/Users/Student/AboutStudentList'
import { IOnlyStudentsInGroupData, IStudentAboutData } from 'entities/Users/Student/types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { List } from 'shared/ui'

export const ListStudentsInGroup = ({ styles }: IListStudentsInGroupProps) => {
	// const studentsList: initialState = {
	// 	students: [
	// 		{
	// 			id: 1,
	// 			student: {
	// 				id: 1,
	// 				avatar: null,
	// 				email: '00694234239@stud.satbayev.university',
	// 				phone: '+77077077070',
	// 				is_active: true,
	// 			},
	// 			name: 'Иван',
	// 			surname: 'Иванов',
	// 			patronymic: 'Иванович',
	// 			grade: 5,
	// 		},
	// 		{
	// 			id: 2,
	// 			student: {
	// 				id: 2,
	// 				avatar: null,
	// 				email: '00694234239@stud.satbayev.university',
	// 				phone: '+77077077070',
	// 				is_active: true,
	// 			},
	// 			name: 'Иван',
	// 			surname: 'Иванов',
	// 			patronymic: 'Иванович',
	// 			grade: 5,
	// 		},
	// 	],
	// }
	const studentsList = useSelector(getListStudentsGroupData)
	const { course_id } = useParams<IGROUP_LIST_Params>()
	const dispatch = useAppDispatch()
	console.log('studentsList', studentsList)

	useEffect(() => {
		dispatch(listStudentsGroupRequest({ courseId: Number(course_id) }))
	}, [])

	return (
		<DynamicModuleLoader
			reducer={listStudentsinGroupReducer}
			reducerKey={'listAllStudentInCourse'}
		>
			<div className={cn(classes.ListStudentsInGroup, [styles])}>
				<div className={classes.list_wrapper}>
					<AboutStudentList isColumnNames={true} />
					{studentsList && (
						<List
							styles={classes.list_styles}
							variation="list"
							items={studentsList}
							renderItem={(course: IStudentAboutData) => (
								<>
									{course.student !== undefined && (
										<AboutStudentList
											key={course.student?.id}
											data={course}
										/>
									)}
								</>
							)}
						/>
					)}
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface IListStudentsInGroupProps {
	styles?: string
}
