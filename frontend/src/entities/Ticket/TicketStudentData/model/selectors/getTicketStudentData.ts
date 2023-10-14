import { IStateSchema } from 'app/providers/StoreProvider'

export const getTicketStudentData = (state: IStateSchema) => state.listTicketStudent?.ticketStudentData
