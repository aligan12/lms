import { IFormConstructorData } from 'shared/ui'

export interface ITaskData {
	title: string
	description: string
	file: string
}
export interface ICreateTaskData {
	title: string
	description: string
	file: File
}

interface ICreateTaskKeys {
	key: keyof ICreateTaskData
}

export interface ITaskFormConstructor extends IFormConstructorData, ICreateTaskKeys {}

export interface ITaskAnswer {
	title: string
	description: string
	file: string
	course: number
	list_modules: number
	module_index: number
	is_late: boolean
	data: string
}

export interface ICreateTaskAnswerData {
	title: string
	description: string
	file: File
	course: number
	list_modules: number
	module_index: number
}

export interface ICreateTaskAnswerForm {
	title: string
	description: string
	file: FileList
}

interface ICreateTaskAnswerKeys {
	key: keyof ICreateTaskAnswerForm
}

export interface ITaskAnswerFormConstructor extends IFormConstructorData, ICreateTaskAnswerKeys {}
