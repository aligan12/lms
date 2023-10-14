import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { createLessonAboutActions } from 'features/Lesson/CreateLessonAboutForm'
import { createLessonAdditionActions } from 'features/Lesson/CreateLessonAdditionForm'
import { lessonContentActions } from 'features/Lesson/CreateLessonContentForm'

import { IListModuleLectureData } from 'entities/Module/types/ListModule.types'

import { serverErrors } from 'shared/lib'

export const getLectureRequest = createAsyncThunk<void, number, { rejectValue: string; extra: IThunkExtraArg }>(
	'GetLecture',
	async (id, { extra, rejectWithValue, dispatch }) => {
		try {
			const response = await extra.$axios.get<IListModuleLectureData>(extra.API.list_modules.retrieve + id)
			const { lesson, additions, description, title, video } = response.data.lecture_id
			dispatch(lessonContentActions.initial_lesson(lesson))
			dispatch(createLessonAboutActions.change_about_lesson({ description, title, video }))
			dispatch(createLessonAboutActions.set_module_list(response.data))
			dispatch(createLessonAdditionActions.initial_addition(additions))
		} catch (error: any) {
			return rejectWithValue(serverErrors(error))
		}
	},
)
