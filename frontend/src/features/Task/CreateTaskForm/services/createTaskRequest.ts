import { createAsyncThunk } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { createListModuleRequest } from 'entities/Module/CreateListModule'
import { EListModuleType, ICreateListModule } from 'entities/Module/types'
import { ICreateTaskData } from 'entities/Task/types'

export const createTaskRequest = createAsyncThunk<
	void,
	{ formData: ICreateTaskData; props: { module_id: number; course_id: number; navigate: NavigateFunction } },
	{ rejectValue: string; extra: IThunkExtraArg }
>('createTaskRequest', async ({ formData, props }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.post(extra.API.file_tasks.create, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		if (props.module_id) {
			const listModuelData: ICreateListModule = {
				course: props.course_id,
				file_task_id: response.data.id,
				module_type: EListModuleType.FILE_TASK,
				module: props.module_id,
			}
			await dispatch(createListModuleRequest(listModuelData))
			props.navigate && props.navigate(-1)
		}
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
