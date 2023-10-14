import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { createTaskRequest } from '../services/createTaskRequest'
import classes from './CreateTaskForm.module.scss'

import { ICREATE_TASK_Params } from 'app/providers/AppRouters'

import { ICreateTaskData, ITaskFormConstructor } from 'entities/Task/types/Task.types'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor, Htag, UploadFile } from 'shared/ui'

export const CreateTaskForm = ({ styles }: ICreateTaskFormProps) => {
	const { t } = useTranslation('course')
	const { course_id, module_id } = useParams<ICREATE_TASK_Params>()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const onSubmit: SubmitHandler<ICreateTaskData> = (formData: ICreateTaskData, event) => {
		event?.preventDefault()
		course_id &&
			module_id &&
			dispatch(
				createTaskRequest({
					formData: formData,
					props: { course_id: Number(course_id), module_id: Number(module_id), navigate },
				}),
			)
		console.log(formData)
	}

	const data: ITaskFormConstructor[] = [
		{
			type: 'input',
			title: `${t('nazvanie-zadaniya')}`,
			description: `${t('do-0')}` + 200 + `${t('simvolov-0')}`,
			key: 'title',
			rules: {
				required: true,
				maxLength: 200,
			},
		},
		{
			type: 'text-input',
			title: `${t('zadanie')}`,
			key: 'description',
			rules: {
				required: true,
			},
		},
		{
			type: 'file-input',
			key: 'file',
		},
	]

	return (
		<div className={cn(classes.CreateTaskForm, [styles])}>
			<div className={classes.wrapper}>
				<FormConstructor<ICreateTaskData>
					onSubmit={onSubmit}
					data={data}
					button={`${t('sokhranit')}`}
					styles={classes.form}
				/>
			</div>
			<div className={classes.upload}>
				<UploadFile />
				<Htag tag={'very-small'}> {t('ili-peretashite-fail-0')}</Htag>
			</div>
		</div>
	)
}

interface ICreateTaskFormProps {
	styles?: string
}
