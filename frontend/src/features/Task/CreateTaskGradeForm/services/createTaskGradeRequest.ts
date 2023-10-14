import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IUpdateGradeData } from 'entities/Grade/types/Grade'

export const createTaskGradeRequest = createAsyncThunk<
	void,
	{ gradeId: number; gradeForm: IUpdateGradeData },
	{ rejectValue: string; extra: IThunkExtraArg }
>('createTaskGradeRequest', async ({ gradeId, gradeForm }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.put(extra.API.grades.update + gradeId, gradeForm)
		console.log('response', response.data)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
