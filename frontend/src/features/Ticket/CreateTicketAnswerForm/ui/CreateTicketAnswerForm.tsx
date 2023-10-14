import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getCreateTicketAnswerLoading } from '../models/selector/getCreateTicketAnswerLoading'
import { createTicketAnswerReducer } from '../models/slice/CreateTicketAnswerSlice'
import { createTicketAnswerRequest } from '../services/createTicketAnswerRequest'
import classes from './CreateTicketAnswerForm.module.scss'

import { ILAST_ID_Params } from 'app/providers/AppRouters'

import { getCreateTicketError } from 'features/Ticket/CreateTicketForm/model/selectors/getCreateTicketError'

import { ICreateTicketAnswerData, ITicketAnswerFormConstructor } from 'entities/Ticket/types/Ticket.types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor } from 'shared/ui'

export const CreateTicketAnswerForm = ({ styles }: ICreateTicketAnswerFormProps) => {
	const { t } = useTranslation('ticket')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getCreateTicketAnswerLoading)
	const error = useSelector(getCreateTicketError)
	const { id } = useParams<ILAST_ID_Params>()

	const onSubmit: SubmitHandler<ICreateTicketAnswerData> = (formData: ICreateTicketAnswerData, event) => {
		event?.preventDefault()
		formData.completed = true
		id && dispatch(createTicketAnswerRequest({ answerData: formData, navigate: navigate, ticketId: Number(id) }))
		console.log(formData)
	}
	const data: ITicketAnswerFormConstructor[] = [
		{
			type: 'text-input',
			title: `${t('otvet-na-tiket')}`,
			description: `${t('do ')}` + 280 + `${t(' simvolov')}`,
			key: 'answer',
			rules: {
				required: true,
				maxLength: 280,
			},
		},
	]
	return (
		<DynamicModuleLoader
			reducer={createTicketAnswerReducer}
			reducerKey="createTicketAnswer"
		>
			<div className={cn(classes.CreateTicketAnswerForm, [styles])}>
				<FormConstructor<ICreateTicketAnswerData>
					isLoading={isLoading}
					serverError={error}
					onSubmit={onSubmit}
					data={data}
					button={`${t('otpravit-otvet')}`}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

interface ICreateTicketAnswerFormProps {
	styles?: string
}
