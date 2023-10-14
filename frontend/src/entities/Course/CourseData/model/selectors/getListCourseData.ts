import { IStateSchema } from 'app/providers/StoreProvider'

export const getListCourseData = (state: IStateSchema) => state.listCourseData.course_list
