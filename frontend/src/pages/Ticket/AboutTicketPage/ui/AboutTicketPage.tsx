import classes from './AboutTicketPage.module.scss'

import { AboutTicket } from 'entities/Ticket/AboutTicket'

import { classnames as cn } from 'shared/lib'

const AboutTicketPage = ({ styles }: IAboutTicketPageProps) => {
	return (
		<div className={cn(classes.AboutTicketPage, [styles])}>
			<AboutTicket />
		</div>
	)
}
export default AboutTicketPage

interface IAboutTicketPageProps {
	styles?: string
}
