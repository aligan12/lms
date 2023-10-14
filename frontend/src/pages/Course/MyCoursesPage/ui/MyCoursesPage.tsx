import { useTranslation } from 'react-i18next'

import classes from './MyCoursesPage.module.scss'

import { CourseList } from 'widgets/Course/CourseList'

import { classnames as cn } from 'shared/lib'
import { Htag } from 'shared/ui/Htag/Htag'

const MyCoursesPage = ({ styles }: ICoursesPageProps) => {
	const { t } = useTranslation()

	return (
		<div className={cn(classes.CoursesPage, [styles])}>
			<div className={classes.title}>
				<Htag tag="large">Мои курсы </Htag>
			</div>
			<CourseList onlyHasAccessCourses={true} />
		</div>
	)
}

export default MyCoursesPage

interface ICoursesPageProps {
	styles?: string
}
