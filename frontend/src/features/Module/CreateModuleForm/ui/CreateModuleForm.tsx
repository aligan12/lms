import { SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getCreateModuleError } from '../models/selectors/getCreateModuleError'
import { getCreateModuleIsLoading } from '../models/selectors/getCreateModuleIsLoading'
import { getCreateModuleSuccessful } from '../models/selectors/getCreateModuleSuccessful'
import { createModuleSliceReducer } from '../models/slice/CreateModuleSlice'
import { createModuleRequest } from '../services/CreateModuleRequest'
import classes from './CreateModuleForm.module.scss'
import { UpdateModuleDataButton } from './UpdateModuleDataButton'

import { ICREATE_MODULE_Params } from 'app/providers/AppRouters'

import { ICreateModuleData, IModuleFormConstructor } from 'entities/Module/types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, FormConstructor, Header } from 'shared/ui'

export const CreateModuleForm = ({ styles }: ICreateModuleFormProps) => {
	const dispatch = useAppDispatch()
	const { course_id } = useParams<ICREATE_MODULE_Params>()
	const serverError = useSelector(getCreateModuleError)
	const isLoading = useSelector(getCreateModuleIsLoading)
	const successful = useSelector(getCreateModuleSuccessful)
	const onSubmit: SubmitHandler<ICreateModuleData> = (formData: ICreateModuleData, event) => {
		event?.preventDefault()
		console.log(formData)
		formData.course = Number(course_id)

		dispatch(createModuleRequest(formData))
	}

	const form: IModuleFormConstructor[] = [
		{
			key: 'title',
			title: 'Название модуля',
			type: 'input',
			rules: {
				required: true,
				maxLength: 35,
			},
		},
		{
			key: 'description',
			title: 'Описание модуля',
			type: 'text-input',
			rules: {
				required: true,
				maxLength: 120,
			},
		},
	]

	return (
		<DynamicModuleLoader
			reducer={createModuleSliceReducer}
			reducerKey={'createModuleData'}
		>
			<div className={cn(classes.CreateModuleForm, [styles])}>
				<Header
					styles={classes.header}
					title="Добавить модуль"
					buttons={<UpdateModuleDataButton />}
				></Header>
				<FormConstructor<ICreateModuleData>
					button={'Добавить модуль'}
					data={form}
					onSubmit={onSubmit}
					isLoading={isLoading}
					serverError={serverError}
					successful={successful}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

interface ICreateModuleFormProps {
	styles?: string
}
