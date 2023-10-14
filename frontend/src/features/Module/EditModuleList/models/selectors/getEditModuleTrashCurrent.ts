import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleTrashCurrent = (state: IStateSchema) => state.editModuleList?.trash_current
