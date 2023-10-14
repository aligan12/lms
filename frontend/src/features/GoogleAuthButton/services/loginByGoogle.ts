import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

export const loginByGoogle = createAsyncThunk<
	void,
	{ state: string; code: string },
	{ rejectValue: string; extra: IThunkExtraArg }
>('loginByGoogle', async ({ state, code }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.post(extra.API.auth.google.auth + '?state=' + state + '&code=' + code, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		console.log('DATA', response.data)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
