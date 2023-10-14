import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IAboutTicketData } from 'entities/Ticket/types'

import { IPagination } from 'shared/types'

export const listTicketStudentRequest = createAsyncThunk<
	IAboutTicketData[],
	{ studentId?: number; type: 'all' | 'one' },
	{ rejectValue: string; extra: IThunkExtraArg }
>('listTicketStudentRequest', async ({ studentId, type }, { extra, rejectWithValue, dispatch }) => {
	try {
		switch (type) {
			case 'one': {
				const response = await extra.$axios.get<IPagination<IAboutTicketData>>(
					extra.API.ticket.one_student + `?student=` + studentId,
				)
				return response.data.results
			}
			case 'all': {
				const response = await extra.$axios.get<IPagination<IAboutTicketData>>(extra.API.ticket.list)
				return response.data.results
			}
		}
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
