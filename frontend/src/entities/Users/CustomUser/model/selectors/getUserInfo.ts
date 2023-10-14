import { IStateSchema } from 'app/providers/StoreProvider'

export const getUserInfo = (state: IStateSchema) => state?.customUser.userInfo
