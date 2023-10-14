import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classes from './TicketsPage.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'

import { TicketList } from 'widgets/Ticket/TicketList'

import { classnames as cn } from 'shared/lib'
import { Button, Header, Icon } from 'shared/ui'

const TicketsPage = ({ styles }: ITicketPageProps) => {
	const { t } = useTranslation('ticket')
	return (
		<div className={cn(classes.TicketsPage, [styles])}>
			<Header
				title={t('moi-obrasheniya')}
				buttons={
					<Link to={ERoutePath.CREATE_TICKET}>
						<Button>
							{t('novyi-tiket')}
							<Icon
								variation={'white'}
								icon={'plus'}
							/>
						</Button>
					</Link>
				}
			/>

			<TicketList />
		</div>
	)
}

export default TicketsPage

interface ITicketPageProps {
	styles?: string
}
