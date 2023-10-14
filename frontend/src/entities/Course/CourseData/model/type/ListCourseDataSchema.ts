import { ICourseData } from 'entities/Course/types'

export interface IListCourseDataSchema {
	course_list?: ICourseData[]
	isLoading: boolean
	error?: string
}
