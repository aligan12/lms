import classes from './TicketItem.module.scss'

import { IAboutTicketData } from 'entities/Ticket/types'

import { classnames as cn } from 'shared/lib'
import { CircleForIcon, Icon, ListItem } from 'shared/ui'

export const TicketItem = ({ styles, data }: ITicketProps) => {
	return (
		<div className={cn(classes.TicketItem, [styles])}>
			<ListItem
				styles={classes.wrapper}
				hover={'none'}
				variation={'inverted-secondary'}
				mid_up={String(data.date)}
				right={
					<>
						{data.completed && (
							<CircleForIcon variation="primary">
								<Icon
									icon={'done'}
									variation={'primary'}
								/>
							</CircleForIcon>
						)}
						{!data.completed && (
							<CircleForIcon variation="red">
								<Icon
									icon={'close'}
									variation={'red'}
								/>
							</CircleForIcon>
						)}
					</>
				}
			>
				{data.title}
			</ListItem>
		</div>
	)
}

interface ITicketProps {
	styles?: string
	data: IAboutTicketData
}
