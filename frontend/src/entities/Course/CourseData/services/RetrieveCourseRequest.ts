import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICourseData } from 'entities/Course/types/Course.types'

export const retrieveCourseRequest = createAsyncThunk<
	ICourseData,
	number,
	{ rejectValue: string; extra: IThunkExtraArg }
>('retrieveCourseRequest', async (id, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<ICourseData>(extra.API.course.retrieve + id)
		console.log(response.data)
		return response.data
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
