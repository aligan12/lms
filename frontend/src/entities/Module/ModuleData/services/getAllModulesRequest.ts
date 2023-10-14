import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IModuleData } from 'entities/Module/types'

import { IPagination } from 'shared/types'

export const getAllListModulesRequest = createAsyncThunk<
	IModuleData[],
	number,
	{ rejectValue: string; extra: IThunkExtraArg }
>('getAllListModulesRequest', async (course_id, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IModuleData>>(
			extra.API.modules.list + '?course=' + course_id,
		)
		console.log('modules', response.data.results)
		return response.data.results
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
