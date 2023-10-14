import { createAsyncThunk } from '@reduxjs/toolkit'

import { IGradeData } from '../types'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IPagination } from 'shared/types'

export const listGradesForStudent = createAsyncThunk<
	IGradeData[],
	{ studentId: number; courseId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('listGradesForStudent', async ({ studentId, courseId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IGradeData>>(
			extra.API.grades.grades_student + '?student=' + studentId + '&course=' + courseId,
		)
		console.log('GRADEDATA', response.data)
		return response.data.results
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
