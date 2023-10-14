import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ITicketData } from 'entities/Ticket/types'

export const retrieveTicketRequest = createAsyncThunk<
	ITicketData,
	{ ticketId: number },
	{ rejectValue: string; extra: IThunkExtraArg }
>('retrieveTicketRequest', async ({ ticketId }, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.get<ITicketData>(extra.API.ticket.retrieve + ticketId)
		return response.data
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
