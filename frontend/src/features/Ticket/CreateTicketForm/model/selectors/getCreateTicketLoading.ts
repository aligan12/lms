import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTicketLoading = (state: IStateSchema) => state.createTicketForm?.isLoading
