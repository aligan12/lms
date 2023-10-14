import classes from './AllTicketsPage.module.scss'

import { TicketList } from 'widgets/Ticket/TicketList'

import { classnames as cn } from 'shared/lib'
import { Header } from 'shared/ui'

const AllTicketsPage = ({ styles }: IAllTicketsPageProps) => {
	return (
		<div className={cn(classes.AllTicketsPage, [styles])}>
			<Header title={'Все тикеты'} />

			<TicketList />
		</div>
	)
}

export default AllTicketsPage

interface IAllTicketsPageProps {
	styles?: string
}
