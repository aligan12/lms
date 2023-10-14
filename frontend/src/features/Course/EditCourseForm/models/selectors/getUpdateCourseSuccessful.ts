import { IStateSchema } from 'app/providers/StoreProvider'

export const getUpdateCourseSuccessful = (state: IStateSchema) => state.updateCourseData?.successful
