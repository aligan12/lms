import { IStateSchema } from 'app/providers/StoreProvider'

export const getActivationError = (state: IStateSchema) => state.activateAccount?.error
