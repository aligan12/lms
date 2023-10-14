import { SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { getError } from '../model/selectors/getAdditionError'
import { getIsLoading } from '../model/selectors/getIsLoading'
import { createLessonAdditionReducer } from '../model/slice/CreateLessonAdditionSlice'
import { IAdditionsDataSchema } from '../model/type/CreateAdditionSchema'
import { createLessonAdditionRequest } from '../services/CreateLessonAdditionRequest'
import classes from './CreateLessonAdditionForm.module.scss'

import { ICreateAdditionData, ILessonAdditionFormConstructor } from 'entities/Lesson/types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { ErrorText, FormConstructor, LoadingDiv } from 'shared/ui'

export const CreateLessonAdditionForm = ({ styles }: ICreateLessonAdditionFormProps) => {
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getIsLoading)
	const error = useSelector(getError)
	const onSubmit: SubmitHandler<ICreateAdditionData> = (formData: ICreateAdditionData, event) => {
		event?.preventDefault()
		const additonData: IAdditionsDataSchema = {
			title: formData.title,
			file: formData.file[0],
		}

		dispatch(createLessonAdditionRequest(additonData))
	}

	const addition: ILessonAdditionFormConstructor[] = [
		{
			title: 'Название файла',
			key: 'title',
			type: 'input',
			description: 'До 30 символов',
			rules: { required: true, maxLength: 30 },
		},
		{
			key: 'file',
			type: 'file-input',
			rules: { required: true },
		},
	]

	return (
		<div className={cn(classes.CreateLessonAdditionForm, [styles])}>
			<FormConstructor
				isLoading={isLoading}
				serverError={error}
				button={'Добавить файл'}
				data={addition}
				onSubmit={onSubmit}
			/>
		</div>
	)
}

interface ICreateLessonAdditionFormProps {
	styles?: string
}
