import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './EditModuleProgram.module.scss'

import { ICREATE_MODULE_Params } from 'app/providers/AppRouters'

import { EditModuleList, editModuleSliceReducer, getEditModuleData } from 'features/Module/EditModuleList'

import { getAllListModulesRequest, getAllModuleData } from 'entities/Module/ModuleData'
import { IListModule, IModuleData } from 'entities/Module/types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { List } from 'shared/ui'

export const EditModuleProgram = ({ styles }: IEditModuleProgramProps) => {
	// const moduledata: IModuleData[] = [
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
	const { course_id } = useParams<ICREATE_MODULE_Params>()
	const moduledata = useSelector(getEditModuleData)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getAllListModulesRequest(Number(course_id)))
	}, [course_id])

	const [currentContent, setCurrentContent] = useState<IModuleData | IListModule | undefined>(undefined)

	return (
		<DynamicModuleLoader
			reducer={editModuleSliceReducer}
			reducerKey={'editModuleList'}
		>
			<div className={cn(classes.EditModuleProgram, [styles])}>
				{moduledata && (
					<List
						items={moduledata}
						renderItem={(module: IModuleData, index) => (
							<EditModuleList
								moduleIndex={index}
								moduledata={moduledata}
								setCurrentContent={setCurrentContent}
								key={module.id}
								module={module}
								currentContent={currentContent}
							/>
						)}
						variation={'list'}
					/>
				)}
			</div>
		</DynamicModuleLoader>
	)
}

interface IEditModuleProgramProps {
	styles?: string
}
