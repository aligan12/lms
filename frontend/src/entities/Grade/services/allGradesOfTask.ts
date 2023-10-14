import { createAsyncThunk } from '@reduxjs/toolkit'

import { IGradeData } from '../types'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IPagination } from 'shared/types'

export const allGradesOfTask = createAsyncThunk<
	IGradeData[],
	{ list_modules: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('allGradesOfTask', async ({ list_modules }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IGradeData>>(
			extra.API.grades.with_student_info + '?list_modules=' + list_modules,
		)
		return response.data.results
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
