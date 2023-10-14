import { IStateSchema } from 'app/providers/StoreProvider'

export const getUserType = (state: IStateSchema) => state?.customUser.userType
