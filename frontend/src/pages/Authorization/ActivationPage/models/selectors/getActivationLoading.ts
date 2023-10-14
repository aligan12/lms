import { IStateSchema } from 'app/providers/StoreProvider'

export const getActivationLoading = (state: IStateSchema) => state.activateAccount?.isLoading
