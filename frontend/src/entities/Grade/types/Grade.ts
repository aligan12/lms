import { IListModule } from 'entities/Module/types'
import { IStudentAboutData, IStudentData } from 'entities/Users/Student/types'

export interface IGradeData {
	id: number
	course: number
	student: number
	attendance: boolean
	grade: number
	module_type: string
	list_modules: IListModule
	module_index: number
	student_profile: IStudentAboutData
	teacher_comment: string | null
}

export type IUpdateGradeData = Partial<IGradeData>

export interface ICreateAttendance {
	course: number
	student: number
	attendance: boolean
}
