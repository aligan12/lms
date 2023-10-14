import { useCallback, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getLoginState } from '../model/selectors/getLoginState/getLoginState'
import { loginSliceReducer } from '../model/slice/loginSlice'
import { loginByEmail } from '../services/loginByEmail/LoginByEmail'
import classes from './LoginForm.module.scss'

import { GoogleAuthButton } from 'features/GoogleAuthButton'

import { ICreateLoginData, ILoginFormConstructor } from 'entities/Authorization/types'

import { DynamicModuleLoader, useAppDispatch } from 'shared/lib'
import { classnames as cn } from 'shared/lib'
import { FormConstructor, Hr, Htag } from 'shared/ui'

export const LoginForm = ({ styles }: ILoginFormProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const loginState = useSelector(getLoginState)

	const { t } = useTranslation('admin')

	const onSubmit: SubmitHandler<ICreateLoginData> = useCallback(
		(formData: ICreateLoginData, event) => {
			event?.preventDefault()
			dispatch(loginByEmail({ ...formData, navigate }))
		},
		[dispatch],
	)

	const loginForm: ILoginFormConstructor[] = [
		{
			type: 'input',
			key: 'email',
			title: `${t('vvedite-email')}`,
			rules: {
				required: true,
				pattern: 'email',
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
			type: 'check-box',
			key: 'rememberMe',
			description: `${t('zapomnit-menya')}`,
			rules: {
				required: false,
			},
		},
	]

	return (
		<DynamicModuleLoader
			reducerKey={'loginForm'}
			reducer={loginSliceReducer}
		>
			<div className={cn(classes.LoginForm, [styles])}>
				<div className={classes.main}>
					<FormConstructor<ICreateLoginData>
						isLoading={loginState?.isLoading}
						serverError={loginState?.error}
						disabled={loginState?.isLoading}
						onSubmit={onSubmit}
						data={loginForm}
						button={`${t('vkhod')}`}
					/>

					<div className={classes.bottom_block}>
						<Htag tag={'very-small'}>{t('zabyli-parol')}</Htag>

						<GoogleAuthButton />
					</div>
					<Hr />
					<Htag tag={'very-small'}>Tестовые аккаунты :</Htag>
					<Htag tag={'very-small'}>admin@gmail.com </Htag>
					<Htag tag={'very-small'}>student@gmail.com </Htag>

					<Htag tag={'very-small'}>пароль : testtest@ </Htag>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface ILoginFormProps {
	styles?: string
}
