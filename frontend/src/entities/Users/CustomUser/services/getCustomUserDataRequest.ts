import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICustomUser, customUserSliceActions } from 'entities/Users/CustomUser'

export const getCustomUserDataRequest = createAsyncThunk<void, void, { rejectValue: string; extra: IThunkExtraArg }>(
	'getStudentDataRequest',
	async (_, { extra, rejectWithValue, dispatch }) => {
		try {
			const response = await extra.$axios.get<ICustomUser>(extra.API.auth.users.me)
			dispatch(customUserSliceActions.set_customUserInfo(response.data))
		} catch (error: any) {
			return rejectWithValue(extra.serverErrors(error))
		}
	},
)
