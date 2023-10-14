import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCreateTicketError } from '../model/selectors/getCreateTicketError'
import { getCreateTicketLoading } from '../model/selectors/getCreateTicketLoading'
import { getCreateTicketSuccessful } from '../model/selectors/getCreateTicketSuccessful'
import { CreateTicketReducer } from '../model/slice/CreateTicketSlice'
import { createTicketRequest } from '../services/CreateTicketRequest'
import classes from './CreateTicketForm.module.scss'

import { ICreateTicketData, ITicketFormConstructor } from 'entities/Ticket/types'
import { ICreateTicketDataFileList } from 'entities/Ticket/types/Ticket.types'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor } from 'shared/ui'

export const CreateTicketForm = ({ styles }: ICreateTicketFormProps) => {
	const { t } = useTranslation('ticket')
	const isLoading = useSelector(getCreateTicketLoading)
	const error = useSelector(getCreateTicketError)
	const successful = useSelector(getCreateTicketSuccessful)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<ICreateTicketDataFileList> = (formData: ICreateTicketDataFileList, event) => {
		event?.preventDefault()
		const ticket_data: ICreateTicketData = { ...formData, file: formData.file[0] }
		console.log(ticket_data)
		dispatch(createTicketRequest(ticket_data))
	}

	const data: ITicketFormConstructor[] = [
		{
			type: 'input',
			title: `${t('nazvanie')}`,
			description: `${t('do ')}` + 20 + `${t(' simvolov')}`,
			key: 'title',
			rules: {
				required: true,
				maxLength: 20,
			},
		},
		{
			type: 'selector',
			options: [
				{ title: 'Смена обучения', value: '1' },
				{ title: 'Смена обуч', value: '2' },
				{ title: 'Смена ', value: '3' },
			],
			title: `${t('tema-obrasheniya')}`,
			key: 'theme',
			rules: {
				required: true,
			},
		},
		{
			type: 'text-input',
			title: `${t('opisanie-tiketa')}`,
			description: `${t('do ')}` + 80 + `${t(' simvolov')}`,
			key: 'description',
			rules: {
				required: true,
				maxLength: 80,
			},
		},

		{
			type: 'file-input',
			key: 'file',
		},
	]
	return (
		<DynamicModuleLoader
			reducer={CreateTicketReducer}
			reducerKey={'createTicketForm'}
		>
			<div className={cn(classes.CreateTicketForm, [styles])}>
				<FormConstructor<ICreateTicketDataFileList>
					successful={successful}
					serverError={error}
					isLoading={isLoading}
					onSubmit={onSubmit}
					data={data}
					button={`${t('otpravit-zayavku-0')}`}
				/>
			</div>
		</DynamicModuleLoader>
	)
}

interface ICreateTicketFormProps {
	styles?: string
}
