import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { getCourseStudentRequest } from 'features/CustomUsers/Student'

export const enrollCourseStudentRequest = createAsyncThunk<
	void,
	{ course: number; student: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('enrollCourseStudentRequest', async (inputData, { extra, rejectWithValue, dispatch }) => {
	try {
		await extra.$axios.post(extra.API.course_students.create, inputData)
		dispatch(getCourseStudentRequest({ studentId: Number(inputData.student) }))
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
