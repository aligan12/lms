import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IOnlyStudentsInGroupData } from 'entities/Users/Student/types'
import { IFullStudentData } from 'entities/Users/Student/types/Student/Student.type'

import { IPagination } from 'shared/types'

export const listStudentsGroupRequest = createAsyncThunk<
	IFullStudentData[],
	{ courseId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('ListStudentsGroupRequest', async ({ courseId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<IPagination<IOnlyStudentsInGroupData>>(
			extra.API.course.only_students + '?id=' + courseId,
		)
		return response.data.results[0].student
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
