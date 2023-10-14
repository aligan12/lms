import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './AboutCourse.module.scss'

import { IABOUT_COURSE_Params, ILAST_ID_Params } from 'app/providers/AppRouters'

import { EnrollCourseButton } from 'features/Course/EnrollCourseButton'
import { useStudentHasAccess } from 'features/CustomUsers/Student'

import { CourseMiniCard } from 'entities/Course/CourseMiniCard'
import { IAboutCourseData } from 'entities/Course/types'
import { getUserType } from 'entities/Users/CustomUser'

import { classnames as cn } from 'shared/lib'

export const AboutCourse = ({ styles, data }: IAboutCourseProps) => {
	const user = useSelector(getUserType)
	const { course_id } = useParams<IABOUT_COURSE_Params>()
	const access = course_id ? useStudentHasAccess(course_id) : false
	return (
		<div className={cn(classes.AboutCourse, [styles])}>
			<CourseMiniCard data={data} />
			{((!access && user === 'student') || user === 'not-auth') && <EnrollCourseButton />}
		</div>
	)
}

interface IAboutCourseProps {
	styles?: string
	data: IAboutCourseData
}
