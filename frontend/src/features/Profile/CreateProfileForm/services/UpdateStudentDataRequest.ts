import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICreateProfileData } from 'entities/Profile/types'
import { ICustomUser, customUserSliceActions } from 'entities/Users/CustomUser'
import { IStudentData } from 'entities/Users/Student/types'

export const UpdateStudentDataRequest = createAsyncThunk<
	void,
	{ studentId: number; formData: ICreateProfileData },
	{ rejectValue: string; extra: IThunkExtraArg }
>('UpdateStudentDataRequest', async ({ studentId, formData }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.put<IStudentData>(extra.API.students.rud + studentId, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		dispatch(customUserSliceActions.userInfo(response.data))
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
