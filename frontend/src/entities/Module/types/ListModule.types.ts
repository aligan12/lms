import { IAboutLessonData, ILectureData } from 'entities/Lesson/types'
import { ITaskData } from 'entities/Task/types'

export interface IListModule {
	id: number
	lecture_id: IAboutLessonData | null
	file_task_id: ITaskData | null
	test_task_id: number | null
	module_type: EListModuleType
	order: number
	deadline?: Date
}

export interface IListModuleLectureData {
	id: number
	lecture_id: ILectureData
	file_task_id: null
	test_task_id: null
	module_type: EListModuleType
	order: number
	deadline?: Date
}

export interface IListModuleTaskData {
	id: number
	lecture_id: null
	file_task_id: ITaskData
	test_task_id: null
	module_type: EListModuleType
	order: number
	deadline?: Date
}

export function instanceOfListModule(object: any): object is IListModule {
	return 'lecture_id' in object
}
export interface ICreateListModule {
	lecture_id?: number
	file_task_id?: number
	test_task_id?: number
	module_type: EListModuleType
	module: number
	course: number
}

export enum EListModuleType {
	LECTURE = '1',
	TEST_TASK = '2',
	FILE_TASK = '3',
}
