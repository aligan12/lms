import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleTrashList = (state: IStateSchema) => state.editModuleList?.trash_listModule
