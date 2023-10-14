import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import classes from './CoursesPage.module.scss'

import { CourseList } from 'widgets/Course/CourseList'

import { loginByGoogle } from 'features/GoogleAuthButton'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Htag } from 'shared/ui/Htag/Htag'

const CoursesPage = ({ styles }: ICoursesPageProps) => {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [state, setState] = useState<string | null>(null)
	const [code, setCode] = useState<string | null>(null)
	const dispatch = useAppDispatch()

	useEffect(() => {
		setState(searchParams.get('state'))
		setCode(searchParams.get('code'))
	}, [])

	useEffect(() => {
		if (state && code) {
			dispatch(loginByGoogle({ code, state }))
		}
	}, [state, code])

	return (
		<div className={cn(classes.CoursesPage, [styles])}>
			<div className={classes.title}>
				<Htag tag="large">{t('vse-kursy')}</Htag>
			</div>
			<CourseList />
		</div>
	)
}

export default CoursesPage

interface ICoursesPageProps {
	styles?: string
}
