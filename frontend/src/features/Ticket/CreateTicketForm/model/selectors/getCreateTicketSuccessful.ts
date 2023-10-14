import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTicketSuccessful = (state: IStateSchema) => state.createTicketForm?.successful
