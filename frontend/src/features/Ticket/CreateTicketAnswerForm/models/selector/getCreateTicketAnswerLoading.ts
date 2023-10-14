import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTicketAnswerLoading = (state: IStateSchema) => state.createTicketAnswer?.isLoading
