import { IStateSchema } from 'app/providers/StoreProvider'

export const getRegistrationLoading = (state: IStateSchema) => state.registrationForm?.isLoading
