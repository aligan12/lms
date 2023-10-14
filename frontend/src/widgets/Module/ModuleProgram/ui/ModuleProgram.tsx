import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './ModuleProgram.module.scss'

import { IABOUT_COURSE_Params } from 'app/providers/AppRouters'

import { listGradesForStudent, useLastAttendance } from 'entities/Grade'
import { getAllListModulesRequest, getAllModuleData } from 'entities/Module/ModuleData'
import { ModuleList } from 'entities/Module/ModuleList'
import { IModuleData } from 'entities/Module/types'
import { getUserInfo } from 'entities/Users/CustomUser'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Htag, List } from 'shared/ui'

export const ModuleProgram = ({ styles, mini = false }: IModuleProgramProps) => {
	// const data: IModuleData[] = [
	// 	{
	// 		id: 1,
	// 		order: 1,
	// 		title: 'Первый модуль ',
	// 		description: 'Введение ',
	// 		number: 1,
	// 		list_modules: [
	// 			{
	// 				id: 1,
	// 				order: 1,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 			{
	// 				id: 2,
	// 				order: 2,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 			{
	// 				id: 3,
	// 				order: 3,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 2,
	// 		order: 2,
	// 		title: 'Второй модуль ',
	// 		description: 'Введение ',
	// 		number: 1,
	// 		list_modules: [
	// 			{
	// 				id: 1,
	// 				order: 1,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 			{
	// 				id: 2,
	// 				order: 2,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 			{
	// 				id: 3,
	// 				order: 3,
	// 				lecture_id: {
	// 					id: 1,
	// 					title: 'Введение в программирование',
	// 					description: 'Введение в профессию и основы алгоритмизации Основы синтаксиса Списки и циклы ',
	// 				},
	// 				file_task_id: null,
	// 				module_type: EListModuleType.LECTURE,
	// 				test_task_id: null,
	// 			},
	// 		],
	// 	},
	// ]
	const { course_id } = useParams<IABOUT_COURSE_Params>()
	const { student } = useSelector(getUserInfo)
	const module_data = useSelector(getAllModuleData)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllListModulesRequest(Number(course_id)))
		student && dispatch(listGradesForStudent({ courseId: Number(course_id), studentId: student }))
	}, [])

	return (
		<div className={cn(classes.CourseProgram)}>
			<List
				styles={styles}
				items={module_data}
				renderItem={(module: IModuleData, index) => (
					<ModuleList
						mini={mini}
						module_index={index}
						key={module.id}
						module={module}
					/>
				)}
				variation={'list'}
			/>
		</div>
	)
}

interface IModuleProgramProps {
	styles?: string
	mini?: boolean
}
