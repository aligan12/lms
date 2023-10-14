import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './AboutCoursePage.module.scss'

import { IABOUT_COURSE_Params } from 'app/providers/AppRouters'

import { AboutCourse } from 'widgets/Course/AboutCourse'
import { ModuleProgram } from 'widgets/Module/ModuleProgram'

import { BackButton } from 'features/BackButton'

import { getRetrieveCourseData, retrieveCourseRequest } from 'entities/Course/CourseData'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Htag, TextBox } from 'shared/ui'

const AboutCoursePage = ({ styles }: IAboutCoursePageProps) => {
	const { t } = useTranslation('course')
	// const data = {
	// 	id: 1,
	// 	image: 'sdfsd',
	// 	title: 'Python-разработчик с нуля  ',
	// 	description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 	price: 100000,
	// }
	const { course_id } = useParams<IABOUT_COURSE_Params>()
	const data = useSelector(getRetrieveCourseData)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(retrieveCourseRequest(Number(course_id)))
	})

	return (
		<>
			{data && (
				<div className={cn(classes.AboutCoursePage, [styles])}>
					<div className={classes.course_title}>
						<BackButton />
						<Htag tag={'very-large'}>{data.title}</Htag>
						<TextBox
							styles={classes.description}
							size={'medium'}
						>
							{data.description}
						</TextBox>
					</div>
					<div className={classes.module_list}>
						<Htag
							styles={classes.title}
							tag={'large'}
						>
							{t('programma-kursa')}
						</Htag>
						<ModuleProgram />
					</div>
					<div className={classes.course_card}>
						<AboutCourse data={data} />
					</div>
				</div>
			)}
		</>
	)
}

export default AboutCoursePage

interface IAboutCoursePageProps {
	styles?: string
}
