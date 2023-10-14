import { createAsyncThunk } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import { ERoutePath } from 'app/providers/AppRouters'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICourseData, ICreateCourseData } from 'entities/Course/types/Course.types'

import { deleteRouteId, serverErrors } from 'shared/lib'

interface ICreateCourseRequest {
	courseData: ICreateCourseData
	navigate: NavigateFunction
}

export const createCourseRequest = createAsyncThunk<
	void,
	ICreateCourseRequest,
	{ rejectValue: string; extra: IThunkExtraArg }
>('createCourseRequest', async ({ courseData, navigate }, { extra, rejectWithValue }) => {
	try {
		const response = await extra.$axios.post<ICourseData>(extra.API.course.create, courseData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		navigate && navigate(deleteRouteId(ERoutePath.EDIT_COURSE) + response.data.id)
	} catch (error: any) {
		return rejectWithValue(serverErrors(error))
	}
})
