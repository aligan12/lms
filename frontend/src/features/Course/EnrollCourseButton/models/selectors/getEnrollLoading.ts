import { IStateSchema } from 'app/providers/StoreProvider'

export const getEnrollLoading = (state: IStateSchema) => state.enrollCouseStudent?.error
