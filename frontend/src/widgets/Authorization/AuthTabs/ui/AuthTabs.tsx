import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './AuthTabs.module.scss'

import { LoginForm } from 'features/Authorization/LoginForm'
import { RegistrationForm } from 'features/Authorization/RegistrationForm'
import { GoogleAuthButton } from 'features/GoogleAuthButton'

import { classnames as cn } from 'shared/lib'
import { Icon, ListItem } from 'shared/ui'

export const AuthTabs = ({ styles }: IAuthTabsProps) => {
	const [selectedTab, setSelectedTab] = useState<'login' | 'registration'>('login')
	const { t } = useTranslation('admin')

	const renderForm = () => {
		switch (selectedTab) {
			case 'login':
				return <LoginForm />

			case 'registration':
				return <RegistrationForm />
			default:
				break
		}
	}

	return (
		<div className={cn(classes.AuthTabs, [styles])}>
			<div className={classes.main}>
				<div className={classes.top_block}>
					<ListItem
						onClick={() => setSelectedTab('login')}
						hover={'hover_inverted-secondary'}
						variation={selectedTab === 'login' ? 'inverted-secondary' : 'clear'}
						left={<Icon icon="lock" />}
						styles={classes.top_button}
					>
						{t('vkhod')}
					</ListItem>
					<ListItem
						onClick={() => setSelectedTab('registration')}
						hover={'hover_inverted-secondary'}
						variation={selectedTab === 'registration' ? 'inverted-secondary' : 'clear'}
						left={<Icon icon="registration" />}
						styles={classes.top_button}
					>
						{t('registraciya-0')}
					</ListItem>
				</div>
				{renderForm()}
			</div>
		</div>
	)
}

interface IAuthTabsProps {
	styles?: string
}
