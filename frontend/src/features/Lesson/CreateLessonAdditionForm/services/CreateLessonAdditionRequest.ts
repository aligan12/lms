import { createAsyncThunk } from '@reduxjs/toolkit'

import { IAdditionsDataSchema } from '../model/type/CreateAdditionSchema'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IAdditionData, ICreateAdditionData } from 'entities/Lesson/types'

import { serverErrors } from 'shared/lib'

export const createLessonAdditionRequest = createAsyncThunk<
	IAdditionData,
	IAdditionsDataSchema,
	{ rejectValue: string; extra: IThunkExtraArg }
>('createLessonAdditionRequest', async (addition, { extra, dispatch, rejectWithValue }) => {
	try {
		const response = await extra.$axios.post<IAdditionData>(extra.API.lectures.additions.create, addition, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	} catch (error: any) {
		return rejectWithValue(serverErrors(error))
	}
})
