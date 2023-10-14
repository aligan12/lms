import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import classes from './CourseList.module.scss'

import { ERoutePath, IABOUT_COURSE_Params } from 'app/providers/AppRouters'

import { getCourseStudentData } from 'features/CustomUsers/Student/models/selectors/getCourseStudentData'

import { CourseCard } from 'entities/Course/CourseCard'
import { getListCourseData, listCourseRequest } from 'entities/Course/CourseData'
import { retrieveHasAccessCourses } from 'entities/Course/HasAccessCourses'
import { IAboutCourseData, ICourseData } from 'entities/Course/types'
import { getUserInfo } from 'entities/Users/CustomUser'

import { classnames as cn, deleteRouteId, setParamsInPath, useAppDispatch } from 'shared/lib'
import { Button, Icon, List } from 'shared/ui'

export const CourseList = ({ styles, onlyHasAccessCourses = false }: ICourseListProps) => {
	const { t } = useTranslation('course')
	const data = useSelector(getListCourseData)
	const { student } = useSelector(getUserInfo)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (onlyHasAccessCourses) {
			student && dispatch(retrieveHasAccessCourses({ studentId: student }))
		} else {
			dispatch(listCourseRequest())
		}
	}, [])

	// const data = [
	// 	{
	// 		id: 1,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description:
	// 			'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 100000,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Профессия: Python-разработчик  ',
	// 		description:
	// 			'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 200000,
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Аналитика на PYTHON с 0  ',
	// 		description:
	// 			'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 300000,
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'Профессия Fullstack-разработчик на Python  ',
	// 		description:
	// 			'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 400000,
	// 	},
	// 	{
	// 		id: 5,
	// 		title: 'Факультет Python-разработки  ',
	// 		description:
	// 			'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 500000,
	// 	},
	// ]
	return (
		<div className={cn(classes.CourseList, [styles])}>
			{data && (
				<List
					items={data}
					renderItem={(info: IAboutCourseData) => (
						<CourseCard
							key={info.id}
							data={info}
						/>
					)}
					variation={'card'}
				/>
			)}
		</div>
	)
}

interface ICourseListProps {
	onlyHasAccessCourses?: boolean
	styles?: string
}
