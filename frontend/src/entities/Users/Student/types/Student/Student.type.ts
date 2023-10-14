import { IAboutCustomUser, ICustomUser } from 'entities/Users/CustomUser'

export interface IStudentAboutData {
	student: IAboutCustomUser
	name: string
	surname: string
	patronymic: string
	grade: number
	avatar: string | null
	phone: string | null
}

export interface IFullStudentData {
	sex: string | null
	age: number | null
	country: string | null
	student: ICustomUser
	name: string
	surname: string
	patronymic: string | null
	about: string | null
	university: string | null
	avatar: string | null
	phone: string | null
}
export interface IStudentData {
	sex: string | null
	age: number | null
	country: string | null
	student: number | null
	name: string
	surname: string
	patronymic: string | null
	about: string | null
	university: string | null
	avatar: string | null
	phone: string | null
}

export interface IColumnNames extends Record<keyof IStudentAboutData, string | IAboutCustomUser | null> {
	grade: string
	about?: string
	sex?: string
	avatar: string | null
	phone: string
	country?: string
	university?: string
	age?: number
	student: IAboutCustomUser
}

export interface IOnlyStudentsInGroupData {
	student: IFullStudentData[]
}
export interface IAboutGroupData {
	course: number
	group_number: number
	start_date: string
	end_date: string
}
