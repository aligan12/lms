import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTicketAnswerError = (state: IStateSchema) => state.createTicketAnswer?.error
