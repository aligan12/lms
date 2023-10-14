import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { oneTaskGradeRequest } from 'entities/Grade'
import { ICreateTaskAnswerData } from 'entities/Task/types/Task.types'

export const createTaskAnswerRequest = createAsyncThunk<
	void,
	{ answerData: ICreateTaskAnswerData; props: { courseId: number; list_module_id: number; student: number } },
	{ rejectValue: string; extra: IThunkExtraArg }
>('createTaskAnswerRequest', async ({ answerData, props }, { extra, rejectWithValue, dispatch }) => {
	try {
		await extra.$axios.post(extra.API.file_tasks_answer.create, answerData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		dispatch(oneTaskGradeRequest({ listModuleId: Number(props.list_module_id), studentId: props.student }))
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
