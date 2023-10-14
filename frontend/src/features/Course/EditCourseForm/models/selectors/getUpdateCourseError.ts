import { IStateSchema } from 'app/providers/StoreProvider'

export const getUpdateCourseError = (state: IStateSchema) => state.updateCourseData?.error
