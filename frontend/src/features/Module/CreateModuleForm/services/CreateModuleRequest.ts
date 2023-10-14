import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICreateModuleData, IModuleData } from 'entities/Module/types'

export const createModuleRequest = createAsyncThunk<
	void,
	ICreateModuleData,
	{ rejectValue: string; extra: IThunkExtraArg }
>('CreateModuleRequest', async (moduleData, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.post<IModuleData>(extra.API.modules.create, moduleData)

		console.log('response', response.data)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
