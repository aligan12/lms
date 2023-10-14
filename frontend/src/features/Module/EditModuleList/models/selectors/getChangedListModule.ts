import { IStateSchema } from 'app/providers/StoreProvider'

export const getChangedListModule = (state: IStateSchema) => state.editModuleList?.changed_listModule
