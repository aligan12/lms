import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTicketError = (state: IStateSchema) => state.createTicketForm?.error
