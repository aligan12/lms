import { IStateSchema } from 'app/providers/StoreProvider'

export const getActivationSuccessful = (state: IStateSchema) => state.activateAccount?.successful
