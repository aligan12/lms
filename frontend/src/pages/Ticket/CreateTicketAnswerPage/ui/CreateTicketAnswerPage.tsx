import { useTranslation } from 'react-i18next'

import classes from './CreateTicketAnswerPage.module.scss'

import { BackButton } from 'features/BackButton'
import { CreateTicketAnswerForm } from 'features/Ticket/CreateTicketAnswerForm'

import { AboutTicket } from 'entities/Ticket/AboutTicket'

import { classnames as cn } from 'shared/lib'
import { Button, CircleForIcon, Header, Hr, Htag, Icon, TextBox } from 'shared/ui'

export const CreateTicketAnswerPage = ({ styles }: ICreateTicketAnswerPageProps) => {
	const { t } = useTranslation('ticket')

	return (
		<div className={cn(classes.CreateTicketAnswerPage, [styles])}>
			<BackButton />
			<div className={classes.main}>
				<div className={classes.wrapper}>
					<Header title={`${t('otvet')}`} />
					<AboutTicket />
					<CreateTicketAnswerForm />
				</div>
			</div>
		</div>
	)
}

export default CreateTicketAnswerPage

interface ICreateTicketAnswerPageProps {
	styles?: string
}
