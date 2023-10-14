import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { NavigateFunction } from 'react-router-dom'

import { IActivationSchema } from 'pages/Authorization/ActivationPage'

import { IListStudentsInGroupSchema } from 'widgets/Student/ListStudentsInGroup'

import { ILoginSchema } from 'features/Authorization/LoginForm'
import { IRegistrationSchema } from 'features/Authorization/RegistrationForm'
import { ICreateCourseSchema } from 'features/Course/CreateCourseForm'
import { IUpdateCourseSchema } from 'features/Course/EditCourseForm'
import { IEnrollCourseStudentSchema } from 'features/Course/EnrollCourseButton/'
import { ICourseStudentSchema } from 'features/CustomUsers/Student'
import { ICreateAdditionSchema } from 'features/Lesson/CreateLessonAdditionForm'
import { ICreateLessonSchema } from 'features/Lesson/CreateLessonButton'
import { ILessonContentScheme } from 'features/Lesson/CreateLessonContentForm'
import { ICreateModuleSchema } from 'features/Module/CreateModuleForm'
import { IEditModuleSchema } from 'features/Module/EditModuleList'
import { IUpdateStudentDataSchema } from 'features/Profile/CreateProfileForm'
import { ICreateTaskAnswerSchema } from 'features/Task/CreateTaskAnswerForm'
import { ICreateTicketAnswerSchema } from 'features/Ticket/CreateTicketAnswerForm'
import { ICreateTicketSchema } from 'features/Ticket/CreateTicketForm/'

import { IListCourseDataSchema, IRetrieveCourseDataSchema } from 'entities/Course/CourseData'
import { IListGradeSchema } from 'entities/Grade/models/types/ListGradeSchema.type'
import { IGetLecturesSchema } from 'entities/Lecture'
import { ICreateLessonAboutData } from 'entities/Lesson/types'
import { IAllModuleDataSchema } from 'entities/Module/ModuleData'
import { IRetrieveTaskSchema } from 'entities/Task/TaskData'
import { IRetrieveTicketSchema } from 'entities/Ticket/AboutTicket'
import { IListTicketStudentSchema } from 'entities/Ticket/TicketStudentData'
import { ICustomUserSchema } from 'entities/Users/CustomUser'

import { IAPI } from 'shared/api/api'

export interface IStateSchema {
	customUser: ICustomUserSchema
	listCourseData: IListCourseDataSchema
	getAllModules: IAllModuleDataSchema
	retrieveCourseData: IRetrieveCourseDataSchema
	createLessonContent: ILessonContentScheme
	createLessonAbout: ICreateLessonAboutData
	createLessonAddition: ICreateAdditionSchema
	getCourseStudentList: ICourseStudentSchema
	getLecture: IGetLecturesSchema
	listGradeData: IListGradeSchema
	createTaskAnswer: ICreateTaskAnswerSchema

	//Асинхронные редьюсеры
	loginForm?: ILoginSchema
	enrollCouseStudent?: IEnrollCourseStudentSchema
	registrationForm?: IRegistrationSchema
	createCourseForm?: ICreateCourseSchema
	createTicketForm?: ICreateTicketSchema
	updateCourseData?: IUpdateCourseSchema
	createLesson?: ICreateLessonSchema
	createModuleData?: ICreateModuleSchema
	editModuleList?: IEditModuleSchema
	activateAccount?: IActivationSchema
	listTicketStudent?: IListTicketStudentSchema
	retrieveTicketData?: IRetrieveTicketSchema
	createTicketAnswer?: ICreateTicketAnswerSchema
	listAllStudentInCourse?: IListStudentsInGroupSchema
	updateStudentForm?: IUpdateStudentDataSchema
	retrieveTaskData?: IRetrieveTaskSchema
}

export interface IThunkExtraArg {
	$axios: AxiosInstance
	API: IAPI
	serverErrors: (error: any) => string
}

export type IStateSchemaKey = keyof IStateSchema

export interface IReducerManager {
	getReducerMap: () => ReducersMapObject<IStateSchema>
	reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>
	add: (key: IStateSchemaKey, reducer: Reducer) => void
	remove: (key: IStateSchemaKey) => void
}

export interface IStoreWithManager extends EnhancedStore<IStateSchema> {
	reducerManager: IReducerManager
}
