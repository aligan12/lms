import { IStateSchema } from 'app/providers/StoreProvider'

export const getUserToken = (state: IStateSchema) => state?.customUser.token
