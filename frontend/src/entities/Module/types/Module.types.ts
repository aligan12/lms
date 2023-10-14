import { IListModule } from './ListModule.types'

import { IAboutLessonData, ILectureData } from 'entities/Lesson/types'

import { IFormConstructorData } from 'shared/ui'

export interface IModuleData {
	id: number
	title: string
	description: string
	number: number
	list_modules: IListModule[]
	order: number
	course: number
}

export function instanceOfIModuleData(object: any): object is IModuleData {
	return 'list_modules' in object
}

export interface ICreateModuleData {
	course: number
	title: string
	description: string
	order: number
	list_modules: number[]
}

interface ICreateModuleKeys {
	key: keyof ICreateModuleData
}

export interface IModuleFormConstructor extends IFormConstructorData, ICreateModuleKeys {}
