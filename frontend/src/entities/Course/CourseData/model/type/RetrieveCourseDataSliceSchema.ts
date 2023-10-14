import { ICourseData } from 'entities/Course/types/Course.types'

export interface IRetrieveCourseDataSchema {
	course_data?: ICourseData
	isLoading: boolean
	error?: string
}
