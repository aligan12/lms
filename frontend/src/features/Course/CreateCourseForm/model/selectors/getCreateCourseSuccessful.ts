import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateCourseSuccessful = (state: IStateSchema) => state.createCourseForm?.successful
