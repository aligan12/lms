import { IAboutTicketData } from 'entities/Ticket/types'

export interface IListTicketStudentSchema {
	isLoading: boolean
	error?: string
	ticketStudentData: IAboutTicketData[]
}
