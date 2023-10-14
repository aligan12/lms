import { IStateSchema } from 'app/providers/StoreProvider'

export const getUpdateStudentError = (state: IStateSchema) => state.updateStudentForm?.error
