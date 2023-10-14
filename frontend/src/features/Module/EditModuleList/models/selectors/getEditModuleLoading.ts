import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleLoading = (state: IStateSchema) => state.editModuleList?.isLoading
