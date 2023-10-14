import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateCourseLoading = (state: IStateSchema) => state.createCourseForm?.isLoading
