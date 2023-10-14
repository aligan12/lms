import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

export const CreateAttendanceRequest = createAsyncThunk<
	void,
	{ module_index: number; course: number; attendance: boolean; list_modules: number; navigate: () => void },
	{ rejectValue: string; extra: IThunkExtraArg }
>(
	'CreateAttendanceRequest',
	async ({ attendance, course, list_modules, module_index, navigate }, { extra, rejectWithValue, dispatch }) => {
		try {
			await extra.$axios.post(extra.API.attendance.create, { attendance, course, list_modules, module_index })

			navigate()
		} catch (error: any) {
			return rejectWithValue(extra.serverErrors(error))
		}
	},
)
