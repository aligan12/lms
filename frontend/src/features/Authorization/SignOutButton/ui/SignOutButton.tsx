import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import classes from './SignOutButton.module.scss'

import { customUserSliceActions, getUserType } from 'entities/Users/CustomUser'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Button } from 'shared/ui'

export const SignOutButton = ({ styles }: ISignOutButtonProps) => {
	const userType = useSelector(getUserType)
	const dispatch = useAppDispatch()
	const { t } = useTranslation('')

	const handleClick = () => {
		dispatch(customUserSliceActions.signOut())
	}

	return <>{userType !== 'not-auth' && <Button onClick={handleClick}>{t('vykhod')}</Button>}</>
}

interface ISignOutButtonProps {
	styles?: string
}
