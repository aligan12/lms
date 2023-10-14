import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getRegistrationErrors } from '../model/selectors/getRegistrationErrors'
import { getRegistrationLoading } from '../model/selectors/getRegistrationLoading'
import { registrationFormSliceActions, registrationFormSliceReducer } from '../model/slice/RegistrationFormSlice'
import { registrationByEmail } from '../services/RegistrationByEmail'
import classes from './RegistrationForm.module.scss'

import { ICreateRegistrationData, IRegistrationFormConstructor } from 'entities/Authorization/types'
import { ICustomUserType } from 'entities/Users/CustomUser/types/CustomUser.type'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, ErrorText, FormConstructor, Htag, LoadingDiv } from 'shared/ui'

export const RegistrationForm = ({ styles }: IRegistrationFormProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const onSubmit: SubmitHandler<ICreateRegistrationData> = (formData: ICreateRegistrationData, event) => {
		event?.preventDefault()
		dispatch(registrationFormSliceActions.setName(formData.name))
		dispatch(registrationFormSliceActions.setName(formData.surname))
		formData.type = userType
		dispatch(registrationByEmail({ registrationData: formData, navigate }))
	}

	const isLoading = useSelector(getRegistrationLoading)
	const error = useSelector(getRegistrationErrors)
	const [userType, setUserType] = useState<ICustomUserType>('4')
	const { t } = useTranslation('admin')

	const registrationForm: IRegistrationFormConstructor[] = [
		{
			type: 'input',
			key: 'name',
			title: `${t('vvedite-imya')}`,
			rules: {
				required: true,
			},
		},
		{
			type: 'input',
			key: 'surname',
			title: `${t('vvedite-familiyu')}`,
			rules: {
				required: true,
			},
		},
		{
			type: 'input',
			key: 'email',
			title: `${t('vvedite-email')}`,
			rules: {
				required: true,
			},
		},
		{
			type: 'password',
			key: 'password',
			title: `${t('vvedite-parol')}`,
			rules: {
				required: true,
				minLength: 8,
			},
		},
		{
			type: 'password',
			key: 're_password',
			title: `${t('povtorite-parol')}`,
			rules: {
				required: true,
				minLength: 8,
				validate: 'password',
			},
		},
	]

	return (
		<DynamicModuleLoader
			reducer={registrationFormSliceReducer}
			reducerKey={'registrationForm'}
		>
			<div className={cn(classes.RegistrationForm, [styles])}>
				<div className={classes.main}>
					<div className={classes.top}>
						<Htag tag="small">{t('zaregistrirovatsya-kak')}</Htag>
						<div>
							<Button
								onClick={() => setUserType('4')}
								variation={userType === '4' ? 'primary' : 'clear'}
							>
								{t('student')}
							</Button>
							<Button
								onClick={() => setUserType('3')}
								variation={userType === '3' ? 'primary' : 'clear'}
							>
								{t('uchitel')}
							</Button>
						</div>
					</div>

					<FormConstructor
						isLoading={isLoading}
						serverError={error}
						onSubmit={onSubmit}
						data={registrationForm}
						button={`${t('registraciya')}`}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface IRegistrationFormProps {
	styles?: string
}
