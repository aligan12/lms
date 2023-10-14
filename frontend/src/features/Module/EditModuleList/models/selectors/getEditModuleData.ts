import { IStateSchema } from 'app/providers/StoreProvider'

export const getEditModuleData = (state: IStateSchema) => state.editModuleList?.module_data
