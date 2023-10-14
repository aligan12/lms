import { IStateSchema } from 'app/providers/StoreProvider'

export const getTicketStudentError = (state: IStateSchema) => state.listTicketStudent?.error
