import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { listCourseDataActions } from 'entities/Course/CourseData'
import { ICourseData } from 'entities/Course/types'

interface IOnlyCourseData {
	courses: ICourseData[]
}
export const retrieveHasAccessCourses = createAsyncThunk<
	void,
	{ studentId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('retrieveHasAccessCourses', async ({ studentId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IOnlyCourseData>(extra.API.students.only_courses + studentId)
		dispatch(listCourseDataActions.set_course_list(response.data.courses))
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
