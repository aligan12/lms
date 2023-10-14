import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classes from './CreateCoursePage.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'

import { BackButton } from 'features/BackButton'
import { CreateCourseForm } from 'features/Course/CreateCourseForm'

import { classnames as cn } from 'shared/lib'
import { Button, Header } from 'shared/ui'

const CreateCoursePage = ({ styles }: ICreateCoursePageProps) => {
	const { t } = useTranslation('course')

	return (
		<div className={cn(classes.CreateCoursePage, [styles])}>
			<BackButton />
			<div className={classes.main}>
				<div className={classes.wrapper}>
					<Header title={`${t('sozdanie-kursa')}`} />
				</div>
				<div className={classes.left_block}>
					<CreateCourseForm />
				</div>
			</div>
		</div>
	)
}

export default CreateCoursePage

interface ICreateCoursePageProps {
	styles?: string
}
