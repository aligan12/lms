import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IListModuleLectureData, IListModuleTaskData } from 'entities/Module/types/ListModule.types'
import { ITaskData } from 'entities/Task/types'

export const retrieveTaskRequest = createAsyncThunk<
	IListModuleTaskData,
	{ list_module_id: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('retrieveTaskRequest', async ({ list_module_id }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IListModuleTaskData>(extra.API.list_modules.retrieve + list_module_id)

		return response.data
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
