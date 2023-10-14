import { IStateSchema } from 'app/providers/StoreProvider'

export const getRegistrationErrors = (state: IStateSchema) => state.registrationForm?.error
