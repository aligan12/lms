import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateCourseError = (state: IStateSchema) => state.createCourseForm?.error
