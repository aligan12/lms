import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-redux'
import { Link, useParams } from 'react-router-dom'

import classes from './EditCoursePage.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'
import { ICREATE_MODULE_Params } from 'app/providers/AppRouters/config/routeConfig'

import { BackButton } from 'features/BackButton'
import { EditCourseForm } from 'features/Course/EditCourseForm'

import { retrieveCourseRequest } from 'entities/Course/CourseData'

import { classnames as cn, setParamsInPath, useAppDispatch } from 'shared/lib'
import { Button, Header } from 'shared/ui'

export const EditCoursePage = ({ styles }: IEditCoursePageProps) => {
	const { t } = useTranslation('course')
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [linkParams, setLinkParams] = useState<ICREATE_MODULE_Params>({ course_id: 'null' })

	useEffect(() => {
		console.log(location)
		dispatch(retrieveCourseRequest(Number(id)))
		if (id) {
			setLinkParams({
				course_id: id,
			})
		}
	}, [])

	return (
		<div className={cn(classes.EditCoursePage, [styles])}>
			<BackButton />
			<div className={classes.main}>
				<div className={classes.wrapper}>
					<Header
						title={`${t('redaktirovanie-kursa')}`}
						buttons={
							<Link to={setParamsInPath(ERoutePath.CREATE_MODULE, linkParams)}>
								<Button
									variation="primary"
									styles={classes.button}
									format={'small'}
								>
									Добавить модуль
								</Button>
							</Link>
						}
					/>
				</div>
				<div className={classes.left_block}>
					<EditCourseForm />
				</div>
			</div>
		</div>
	)
}
export default EditCoursePage

interface IEditCoursePageProps {
	styles?: string
}
