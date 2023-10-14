import { IListModuleTaskData } from 'entities/Module/types'
import { ITaskAnswer } from 'entities/Task/types'

export interface IRetrieveTaskSchema {
	isLoading: boolean
	error?: string
	taskData: IListModuleTaskData | null
	taskAnswerData: ITaskAnswer | null
	allTaskData: IListModuleTaskData[] | null
}
