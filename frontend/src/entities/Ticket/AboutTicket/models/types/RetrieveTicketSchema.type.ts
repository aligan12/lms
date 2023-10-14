import { ITicketData } from 'entities/Ticket/types/'

export interface IRetrieveTicketSchema {
	isLoading: boolean
	error?: string
	ticketData: ITicketData | null
}
