import { IStateSchema } from 'app/providers/StoreProvider'

export const getListStudentsGroupData = (state: IStateSchema) => state.listAllStudentInCourse?.listStudents
