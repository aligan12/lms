import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleError = (state: IStateSchema) => state.editModuleList?.error
