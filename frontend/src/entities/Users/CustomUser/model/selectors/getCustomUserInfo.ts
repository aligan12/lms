import { IStateSchema } from 'app/providers/StoreProvider'

export const getCustomUserInfo = (state: IStateSchema) => state?.customUser.customUserInfo
