import { createAsyncThunk } from '@reduxjs/toolkit'

import { IGradeData } from '../types'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IPagination } from 'shared/types'

export const oneTaskGradeRequest = createAsyncThunk<
	IGradeData | null,
	{ listModuleId: number; studentId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('oneTaskGradeRequest', async ({ listModuleId, studentId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IGradeData>>(
			extra.API.grades.grades_student + '?student=' + studentId + '&list_modules=' + listModuleId,
		)
		if (response.data.results[0]) {
			return response.data.results[0]
		} else {
			return null
		}
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
