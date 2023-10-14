import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateModuleIsLoading = (state: IStateSchema) => state?.createModuleData?.isLoading
