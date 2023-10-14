import { IFullStudentData } from 'entities/Users/Student/types/Student/Student.type'

export interface IListStudentsInGroupSchema {
	isLoading: boolean
	error?: string
	listStudents: IFullStudentData[]
}
