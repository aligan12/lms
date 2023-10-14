import classes from './AuthorizationPage.module.scss'

import { AuthTabs } from 'widgets/Authorization/AuthTabs'

import { BackButton } from 'features/BackButton'

import { classnames as cn } from 'shared/lib'

export const AuthorizationPage = ({ styles }: IAuthorizationPageProps) => {
	return (
		<div className={cn(classes.AuthorizationPage, [styles])}>
			<BackButton />
			<div className={classes.form}>
				<AuthTabs />
			</div>
		</div>
	)
}
export default AuthorizationPage

interface IAuthorizationPageProps {
	styles?: string
}
