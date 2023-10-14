import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import { createReducerManager } from './ReducerManager'
import { IStateSchema } from './StateSchema'

import { courseStudentReducer } from 'features/CustomUsers/Student'
import { createLessonAboutReducer } from 'features/Lesson/CreateLessonAboutForm'
import { createLessonAdditionReducer } from 'features/Lesson/CreateLessonAdditionForm'
import { lessonContentReducer } from 'features/Lesson/CreateLessonContentForm'
import { createTaskAnswerReducer } from 'features/Task/CreateTaskAnswerForm/'

import { listCourseDataReducer, retrieveCourseDataReducer } from 'entities/Course/CourseData'
import { listGradeReducer } from 'entities/Grade'
import { getLectureReducer } from 'entities/Lecture'
import { allModuleDataReducer } from 'entities/Module/ModuleData'
import { customUserSliceReducer } from 'entities/Users/CustomUser'

import { $api, API } from 'shared/api'
import { serverErrors } from 'shared/lib'

export function createReduxStore(initialState?: IStateSchema) {
	const rootReducers: ReducersMapObject<IStateSchema> = {
		customUser: customUserSliceReducer,
		listCourseData: listCourseDataReducer,
		getAllModules: allModuleDataReducer,
		retrieveCourseData: retrieveCourseDataReducer,
		createLessonAbout: createLessonAboutReducer,
		createLessonContent: lessonContentReducer,
		createLessonAddition: createLessonAdditionReducer,
		getCourseStudentList: courseStudentReducer,
		getLecture: getLectureReducer,
		listGradeData: listGradeReducer,
		createTaskAnswer: createTaskAnswerReducer,
	}

	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<IStateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						$axios: $api,
						API: API,
						serverErrors: serverErrors,
					},
				},
			}),
	})
	//@ts-ignore
	store.reducerManager = reducerManager
	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
