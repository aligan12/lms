import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import classes from './Sidebar.module.scss'

import { ERoutePath } from 'app/providers/AppRouters/'

import { getUserType } from 'entities/Users/CustomUser'

import { classnames as cn } from 'shared/lib'
import { Icon, ListItem } from 'shared/ui'

export const Sidebar = ({ styles }: ISidebarProps) => {
	const { t } = useTranslation()
	const user = useSelector(getUserType)
	const renderButtonsForUser = () => {
		switch (user) {
			case 'student':
				return (
					<>
						<ListItem
							hover={'hover_inverted-secondary'}
							variation={'clear'}
							left={<Icon icon="home" />}
							styles={classes.top_button}
						>
							{t('moe-obuchenie')}
						</ListItem>
						<Link to={ERoutePath.MY_COURSES}>
							<ListItem
								hover={'hover_inverted-secondary'}
								variation={'clear'}
								left={<Icon icon="book" />}
								styles={classes.top_button}
							>
								Мои курсы
							</ListItem>
						</Link>
					</>
				)
			case 'admin':
				return (
					<Link to={ERoutePath.ALL_TICKETS}>
						<ListItem
							hover={'hover_inverted-secondary'}
							variation={'clear'}
							left={<Icon icon="shield" />}
							styles={classes.top_button}
						>
							Тикеты
						</ListItem>
					</Link>
				)

			default:
				break
		}
	}

	return (
		<div className={cn(classes.Sidebar, [styles])}>
			<div className={classes.top_button}>
				{renderButtonsForUser()}
				<Link to={ERoutePath.COURSES}>
					<ListItem
						hover={'hover_inverted-secondary'}
						variation={'clear'}
						left={<Icon icon="courses" />}
						styles={classes.top_button}
					>
						{t('kursy')}
					</ListItem>
				</Link>

				{/* <ListItem
					hover={'hover_inverted-secondary'}
					variation={'clear'}
					left={<Icon icon="calendar" />}
					styles={classes.top_button}
				>
					{t('kalendar')}
				</ListItem> */}
				{/* <ListItem
					hover={'hover_inverted-secondary'}
					variation={'clear'}
					left={<Icon icon="chat" />}
					styles={classes.top_button}
				>
					{t('soobsheniya')}
				</ListItem> */}
			</div>

			{user === 'student' && (
				<div className={classes.bottom_button}>
					<Link to={ERoutePath.TICKETS}>
						<ListItem
							hover={'hover_inverted-secondary'}
							variation={'clear'}
							left={<Icon icon="shield" />}
							styles={classes.bottom_button}
						>
							{t('podderzhka')}
						</ListItem>
					</Link>
				</div>
			)}
		</div>
	)
}

interface ISidebarProps {
	styles?: string
}
