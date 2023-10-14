import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getEnrollLoading } from '../models/selectors/getEnrollLoading'
import { enrollCourseStudentReducer } from '../models/slice/enrollCourseStudentSlice'
import { enrollCourseStudentRequest } from '../services/enrollCourseStudentRequest'
import classes from './EnrollCourseButton.module.scss'

import { ERoutePath, IABOUT_COURSE_Params, ILAST_ID_Params } from 'app/providers/AppRouters'

import { getUserInfo, getUserType } from 'entities/Users/CustomUser'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, ErrorText } from 'shared/ui'

export const EnrollCourseButton = ({ styles }: IEnrollCourseButtonProps) => {
	const { t } = useTranslation('course')
	const user = useSelector(getUserType)
	const { course_id } = useParams<IABOUT_COURSE_Params>()
	const { student } = useSelector(getUserInfo)
	const error = useSelector(getEnrollLoading)
	const dispatch = useAppDispatch()
	console.log('Id', student)
	const handleClick = () => {
		student &&
			course_id &&
			dispatch(enrollCourseStudentRequest({ course: Number(course_id), student: Number(student) }))
	}

	return (
		<DynamicModuleLoader
			reducer={enrollCourseStudentReducer}
			reducerKey="enrollCouseStudent"
		>
			{user === 'not-auth' ? (
				<Link to={ERoutePath.AUTHORIZATION}>
					<Button styles={classes.link}>{t('zapisatsya-na-kurs')}</Button>
				</Link>
			) : (
				<Button
					onClick={handleClick}
					styles={styles}
				>
					{t('zapisatsya-na-kurs')}
				</Button>
			)}
			{error && <ErrorText>{error}</ErrorText>}
		</DynamicModuleLoader>
	)
}

interface IEnrollCourseButtonProps {
	styles?: string
}
