import { IListModuleLectureData } from 'entities/Module/types/ListModule.types'

import { IFormConstructorData } from 'shared/ui'

export interface ICreateLessonAboutData {
	description: string
	title: string
	video?: string
	module_id?: number
	module_list?: IListModuleLectureData
}

interface ICreateLessonAboutKeys {
	key: keyof ICreateLessonAboutData
}

export interface ILessonAboutFormConstructor extends IFormConstructorData, ICreateLessonAboutKeys {}
