import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { listCourseDataActions } from 'entities/Course/CourseData'
import { IAboutCourseData, ICourseData } from 'entities/Course/types'

import { IPagination } from 'shared/types'

export const searchCourseListRequest = createAsyncThunk<
	void,
	{ value: string },
	{ rejectValue: string; extra: IThunkExtraArg }
>('searchCourseListRequest', async ({ value }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<ICourseData>>(extra.API.course.list + '?search=' + value)
		dispatch(listCourseDataActions.set_course_list(response.data.results))
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
