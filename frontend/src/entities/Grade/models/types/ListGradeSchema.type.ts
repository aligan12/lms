import { IGradeData } from 'entities/Grade/types'

export interface IListGradeSchema {
	isLoading: boolean
	error?: string
	gradeList: IGradeData[]
	oneTaskGrade: IGradeData | null
	gradeWithStudentInfo: IGradeData[] | null
}
