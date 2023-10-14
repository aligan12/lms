import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import classes from './LessonPage.module.scss'

import { ERoutePath, IABOUT_COURSE_Params } from 'app/providers/AppRouters'
import { ILESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { FullLesson } from 'widgets/Lesson/FullLesson'
import { LessonAdditions } from 'widgets/Lesson/LessonAdditions'
import { LessonList } from 'widgets/Lesson/LessonList'

import { classnames as cn, setParamsInPath } from 'shared/lib'
import { Button } from 'shared/ui'

const LessonPage = ({ styles }: ILessonPageProps) => {
	const navigate = useNavigate()
	const { course_id } = useParams<ILESSON_Params>()
	const handleClick = () => {
		navigate(
			setParamsInPath<IABOUT_COURSE_Params>(ERoutePath.ABOUT_COURSE, {
				course_id: String(course_id),
			}),
		)
	}
	return (
		<div className={cn(classes.LessonPage, [styles])}>
			<div className={classes.all_lesson}>
				<LessonList />
				<LessonAdditions />
			</div>

			<div className={classes.full_lesson}>
				<Button
					styles={classes.backButton}
					onClick={handleClick}
				>
					Выбрать модуль
				</Button>
				<FullLesson />
			</div>
		</div>
	)
}

export default LessonPage

interface ILessonPageProps {
	styles?: string
}
