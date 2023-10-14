import { IStateSchema } from 'app/providers/StoreProvider'

export const getCourseStudentData = (state: IStateSchema) => state.getCourseStudentList.courseStudentList
