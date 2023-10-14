import { IStateSchema } from 'app/providers/StoreProvider'

export const getFullUserState = (state: IStateSchema) => state?.customUser
