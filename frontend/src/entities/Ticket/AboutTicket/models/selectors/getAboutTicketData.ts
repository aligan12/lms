import { IStateSchema } from 'app/providers/StoreProvider'

export const getAboutTicketData = (state: IStateSchema) => state.retrieveTicketData?.ticketData
