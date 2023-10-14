import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import classes from './Navbar.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'

import { SignOutButton } from 'features/Authorization/SignOutButton'
import { ChangeThemeButton } from 'features/ChangeTheme'
import { SearchCourseInput } from 'features/Course/SearchCourseInput'
import { NotificationIcon } from 'features/NotificationIcon'
import { TranslateButton } from 'features/Translate'

import { Avatar } from 'entities/Avatar'
import { LanguageCard } from 'entities/LanguageCard'
import { getUserType } from 'entities/Users/CustomUser'

import { classnames as cn } from 'shared/lib'
import { Button, Icon, Input, ListItem } from 'shared/ui'
import { Search } from 'shared/ui/Icon/Icon.stories'
import { Logo } from 'shared/ui/Logo/Logo'

export const Navbar = ({ styles }: INavbarProps) => {
	const { t } = useTranslation()
	const userType = useSelector(getUserType)

	const renderButtonForUser = () => {
		switch (userType) {
			case 'teacher':
				return (
					<Button
						variation={'clear'}
						format={'small'}
					>
						{t('uchitelskaya')}
						<Icon
							variation={'primary'}
							icon={'book'}
							size={'small'}
						/>
					</Button>
				)

			case 'admin' || 'super-admin':
				return (
					<Link to={ERoutePath.TEACHER_ROOM}>
						<Button
							variation={'clear'}
							format={'small'}
						>
							Админ панель
							<Icon
								variation={'primary'}
								icon={'tool'}
							/>
						</Button>
					</Link>
				)

			default:
				break
		}
	}

	return (
		<div className={cn(classes.Navbar, [styles])}>
			<div className={classes.left}>
				<Link to={'/'}>
					<Logo />
				</Link>
				<SearchCourseInput />
			</div>
			<div className={classes.right}>
				{renderButtonForUser()}
				<SignOutButton />
				<ChangeThemeButton />
				<TranslateButton />
				{/* <NotificationIcon /> */}

				{userType === 'not-auth' ? (
					<Link to={ERoutePath.AUTHORIZATION}>
						<Button>Вход</Button>
					</Link>
				) : (
					<Link to={ERoutePath.PROFILE}>
						<Avatar size="medium" />
					</Link>
				)}
			</div>
		</div>
	)
}

interface INavbarProps {
	styles?: string
}
