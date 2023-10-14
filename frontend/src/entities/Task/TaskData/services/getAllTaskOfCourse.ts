import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IListModuleTaskData } from 'entities/Module/types'

import { IPagination } from 'shared/types'

export const getAllTaskOfCourse = createAsyncThunk<
	IListModuleTaskData[],
	{ courseId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('getAllTaskOfCourse', async ({ courseId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IListModuleTaskData>>(
			extra.API.list_modules.list + '?course=' + courseId + '&module_type=3',
		)
		return response.data.results
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
