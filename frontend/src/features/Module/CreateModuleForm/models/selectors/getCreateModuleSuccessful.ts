import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateModuleSuccessful = (state: IStateSchema) => state?.createModuleData?.successful
