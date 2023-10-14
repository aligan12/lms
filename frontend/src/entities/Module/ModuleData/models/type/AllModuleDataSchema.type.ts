import { IModuleData } from 'entities/Module/types'

export interface IAllModuleDataSchema {
	isLoading: boolean
	error?: string
	allModuleData: IModuleData[]
}
