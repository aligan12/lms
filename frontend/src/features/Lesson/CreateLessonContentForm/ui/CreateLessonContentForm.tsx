import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { lessonContentActions } from '../model/slice/LessonContentSlice'
import classes from './CreateLessonContentForm.module.scss'

import { ICreateLessonContentData, ILessonContentFormConstructor } from 'entities/Lesson/types'

import { classnames as cn } from 'shared/lib'
import { FormConstructor } from 'shared/ui'

export const CreateLessonContentForm = ({ styles }: ICreateLessonContentFormProps) => {
	const [counter, setConter] = useState(0)
	const dispatch = useDispatch()

	const onSubmit: SubmitHandler<ICreateLessonContentData> = (formData: ICreateLessonContentData, event) => {
		event?.preventDefault()
		formData.id = counter
		formData.order = counter
		setConter(counter + 1)
		console.log(formData)

		dispatch(lessonContentActions.add_content(formData))
	}

	const content: ILessonContentFormConstructor[] = [
		{
			title: 'Введите заголовок',
			description: 'Это необязательное поле',
			key: 'title',
			type: 'input',
			rules: {
				maxLength: 100,
			},
		},
		{
			title: 'Выберите тип контента',
			key: 'type',
			type: 'selector',
			options: [
				{ title: 'Текст', value: 'text' },
				{ title: 'Код', value: 'code' },
			],
			rules: {
				required: true,
			},
		},
		{
			title: 'Введите контент ',
			key: 'content',
			type: 'text-input',
			rules: {
				required: true,
			},
		},
	]

	return (
		<div className={cn(classes.CreateLessonContentForm, [styles])}>
			<FormConstructor<ICreateLessonContentData>
				data={content}
				onSubmit={onSubmit}
				button={'Добавить блок лекции'}
			/>
		</div>
	)
}

interface ICreateLessonContentFormProps {
	styles?: string
}
