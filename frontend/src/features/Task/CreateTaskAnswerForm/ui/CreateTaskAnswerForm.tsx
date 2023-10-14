import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getCreateTaskAnswerError } from '../models/selectors/getCreateTaskAnswerError'
import { getCreateTaskAnswerLoading } from '../models/selectors/getCreateTaskAnswerLoading'
import { getCreateTaskAnswerSuccess } from '../models/selectors/getCreateTaskAnswerSuccess'
import { createTaskAnswerRequest } from '../services/createTaskAnswerRequest'
import classes from './CreateTaskAnswerForm.module.scss'

import { ITASK_CREATE_ANSWER_Params } from 'app/providers/AppRouters'

import {
	ICreateTaskAnswerData,
	ICreateTaskAnswerForm,
	ITaskAnswerFormConstructor,
	ITaskFormConstructor,
} from 'entities/Task/types/Task.types'
import { getUserInfo } from 'entities/Users/CustomUser'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { ErrorText, FormConstructor, Icon } from 'shared/ui'

export const CreateTaskAnswerForm = ({ styles }: ICreateTaskAnswerFormProps) => {
	const { t } = useTranslation('course')
	const [error, setError] = useState<null | string>(null)
	const serverError = useSelector(getCreateTaskAnswerError)
	const isLoading = useSelector(getCreateTaskAnswerLoading)
	const successful = useSelector(getCreateTaskAnswerSuccess)
	const { student } = useSelector(getUserInfo)
	const dispatch = useAppDispatch()
	const { course_id, list_module_id, module_index } = useParams<ITASK_CREATE_ANSWER_Params>()

	const onSubmit: SubmitHandler<ICreateTaskAnswerForm> = (formData: ICreateTaskAnswerForm, event) => {
		event?.preventDefault()
		const answerData: ICreateTaskAnswerData = {
			...formData,
			file: formData.file[0],
			course: Number(course_id),
			list_modules: Number(list_module_id),
			module_index: Number(module_index),
		}
		if (answerData.file || answerData.description) {
			student &&
				dispatch(
					createTaskAnswerRequest({
						answerData: answerData,
						props: {
							courseId: Number(course_id),
							list_module_id: Number(list_module_id),
							student: student,
						},
					}),
				)
			console.log(answerData)
		} else {
			setError('Нужно добавить ответ')
		}
	}

	const data: ITaskAnswerFormConstructor[] = [
		{
			type: 'text-input',
			title: `${t('otvet-0')}`,
			key: 'description',
			rules: {
				required: false,
			},
		},
		{
			type: 'file-input',
			key: 'file',
		},
	]

	return (
		<div className={cn(classes.CreateTaskAnswerForm, [styles])}>
			<div className={classes.wrapper}>
				{error && <ErrorText>{error}</ErrorText>}
				<FormConstructor<ICreateTaskAnswerForm>
					serverError={serverError}
					isLoading={isLoading}
					onSubmit={onSubmit}
					data={data}
					button={
						<>
							{t('otpravit-reshenie')}{' '}
							<Icon
								icon={'done'}
								variation={'white'}
							></Icon>
						</>
					}
					styles={classes.form}
				/>
			</div>
		</div>
	)
}

interface ICreateTaskAnswerFormProps {
	styles?: string
}
