import { IStateSchema } from 'app/providers/StoreProvider'

export const getChangedModule = (state: IStateSchema) => state.editModuleList?.changed_module
