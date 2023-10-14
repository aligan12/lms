import { IAdditionData } from 'entities/Lesson/types'

export interface ICreateAdditionSchema {
	isLoading?: boolean
	additions_data: IAdditionData[]
	error?: string
}

export interface IAdditionsDataSchema {
	title: string
	file: File
}
