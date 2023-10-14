import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { getLessonAbout } from '../model/selectors/getLessonAbout'
import { createLessonAboutActions, createLessonAboutReducer } from '../model/slice/CreateLessonAboutSlice'
import classes from './CreateLessonAboutForm.module.scss'

import { ICreateLessonAboutData, ILessonAboutFormConstructor } from 'entities/Lesson/types'

import { DynamicModuleLoader, classnames as cn } from 'shared/lib'
import { FormConstructor } from 'shared/ui'

export const CreateLessonAboutForm = ({ styles }: ICreateLessonAboutFormProps) => {
	const dispatch = useDispatch()
	const about = useSelector(getLessonAbout)
	const onSubmit: SubmitHandler<ICreateLessonAboutData> = (formData: ICreateLessonAboutData, event) => {
		event?.preventDefault()
		console.log(formData)
		dispatch(createLessonAboutActions.change_about_lesson(formData))
	}

	const description: ILessonAboutFormConstructor[] = [
		{
			title: 'Название урока',
			description: 'До 50 символов',
			key: 'title',
			type: 'input',
			rules: {
				required: true,
				maxLength: 50,
			},
			defaultValue: about.title,
		},
		{
			title: 'Описание урока',
			description: 'До 80 символов',
			key: 'description',
			type: 'text-input',
			rules: {
				required: true,
				maxLength: 80,
			},
			defaultValue: about.description,
		},
		{
			title: 'Видео урока',
			description: 'Введите ссылку на YouTube',
			key: 'video',
			type: 'input',
			defaultValue: about.video,
		},
	]

	return (
		<div className={cn(classes.CreateLessonForm, [styles])}>
			<FormConstructor
				data={description}
				onSubmit={onSubmit}
				button={'Применить описание'}
			/>
		</div>
	)
}

interface ICreateLessonAboutFormProps {
	styles?: string
}
