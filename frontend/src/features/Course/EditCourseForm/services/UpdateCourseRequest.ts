import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICourseData, IUpdateCourseData } from 'entities/Course/types/'

interface IUpdateCourseRequest {
	id: number
	courseData: IUpdateCourseData
}
export const updateCourseRequest = createAsyncThunk<
	void,
	IUpdateCourseRequest,
	{ rejectValue: string; extra: IThunkExtraArg }
>('updateCourseRequest', async (data, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.put<ICourseData>(
			extra.API.course.update + data.id,
			data.courseData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		console.log('updated', response.data)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
