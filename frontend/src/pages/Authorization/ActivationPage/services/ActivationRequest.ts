import { createAsyncThunk } from '@reduxjs/toolkit'

import { IActivationParams } from 'app/providers/AppRouters/config/routeConfig'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

export const activationRequest = createAsyncThunk<
	void,
	IActivationParams,
	{ rejectValue: string; extra: IThunkExtraArg }
>('activationRequest', async ({ token, uid }, { extra, rejectWithValue, dispatch }) => {
	try {
		await extra.$axios.get(extra.API.accounts.activate + `${uid}/${token}`)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
