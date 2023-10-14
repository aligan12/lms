import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleTrashModule = (state: IStateSchema) => state.editModuleList?.trash_module
