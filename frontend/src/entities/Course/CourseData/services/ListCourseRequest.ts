import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICourseData } from 'entities/Course/types/Course.types'

import { IPagination } from 'shared/types'

export const listCourseRequest = createAsyncThunk<ICourseData[], void, { rejectValue: string; extra: IThunkExtraArg }>(
	'listCourseRequest',
	async (id, { extra, rejectWithValue, dispatch }) => {
		try {
			const response = await extra.$axios.get<IPagination<ICourseData>>(extra.API.course.list)
			console.log(response.data.results)
			return response.data.results
		} catch (error: any) {
			return rejectWithValue(extra.serverErrors(error))
		}
	},
)
