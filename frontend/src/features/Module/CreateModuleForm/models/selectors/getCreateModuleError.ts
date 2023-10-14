import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateModuleError = (state: IStateSchema) => state?.createModuleData?.error
