import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleCurrentId = (state: IStateSchema) => state.editModuleList?.current_id
