import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { createLessonSliceReducer } from '../model/slice/CreateLessonSlice'
import { createLessonRequest } from '../services/CreateLessonRequest'
import classes from './CreateLessonButton.module.scss'

import { ICREATE_LESSON_Params, IEDIT_LESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { getLessonAbout } from 'features/Lesson/CreateLessonAboutForm'
import { getAdditionsData } from 'features/Lesson/CreateLessonAdditionForm'
import { getLessonContents } from 'features/Lesson/CreateLessonContentForm'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button } from 'shared/ui'

export const UpdateLessonButton = ({ styles }: ICreateLessonButtonProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const about = useSelector(getLessonAbout)
	const additions = useSelector(getAdditionsData)
	const contents = useSelector(getLessonContents)
	const { module_id, course_id } = useParams<ICREATE_LESSON_Params>()

	const handleClick = () => {
		// if (module_id && about && additions && contents) {
		// 	const fullAbout = { ...about, module_id: Number(module_id), course: Number(course_id) }
		// 	dispatch(createLessonRequest({ about: fullAbout, additions, contents, navigate }))
		// }
	}

	return (
		<DynamicModuleLoader
			reducer={createLessonSliceReducer}
			reducerKey={'createLesson'}
		>
			<Button
				onClick={handleClick}
				styles={cn(classes.CreateLessonButton, [styles])}
			>
				Сохранить изменения
			</Button>
		</DynamicModuleLoader>
	)
}

interface ICreateLessonButtonProps {
	styles?: string
}
