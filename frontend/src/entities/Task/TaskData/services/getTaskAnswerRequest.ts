import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ITaskAnswer } from 'entities/Task/types'

import { IPagination } from 'shared/types'

export const getTaskAnswerRequest = createAsyncThunk<
	ITaskAnswer,
	{ studentId: number; listModulesId: number; courseId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('getTaskAnswerRequest', async ({ listModulesId, studentId, courseId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<ITaskAnswer>>(
			extra.API.file_tasks_answer.list +
				'?list_modules=' +
				listModulesId +
				'&student=' +
				studentId +
				'&course=' +
				courseId,
		)
		return response.data.results[0]
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
