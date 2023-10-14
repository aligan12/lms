import { IStateSchema } from 'app/providers/StoreProvider'

export const getUpdateStudentLoading = (state: IStateSchema) => state.updateStudentForm?.isLoading
