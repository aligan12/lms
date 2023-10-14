import { IStudentData } from 'entities/Users/Student/types'
import { IFullStudentData } from 'entities/Users/Student/types/Student/Student.type'

import { IFormConstructorData } from 'shared/ui'

export interface IAboutCourseData {
	id: number
	title: string
	description: string
	price: number
	image: string
}

export interface ICreateCourseData {
	image: File
	title: string
	description: string
	course_duration: number
	category: number
	price: number
}

export type IUpdateCourseData = Partial<ICreateCourseData>

export interface ICourseData {
	id: number
	image: string
	title: string
	time_create: string
	time_update: string
	is_published: boolean
	description: string
	course_duration: number
	student: IFullStudentData
	category: number
	rating: number
	price: number
}

export interface ICourseStudentData {
	course: number
	group: null
	is_completed: false
	number: null
	student: number
}

interface ICreateCourseKeys {
	key: keyof ICreateCourseData
}

export interface ICourseFormConstructor extends IFormConstructorData, ICreateCourseKeys {}
