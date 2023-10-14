import { IStateSchema } from 'app/providers/StoreProvider'

export const getRetrieveCourseData = (state: IStateSchema) => state.retrieveCourseData?.course_data
