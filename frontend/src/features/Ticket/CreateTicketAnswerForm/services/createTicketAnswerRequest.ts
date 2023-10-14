import { createAsyncThunk } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import { ERoutePath } from 'app/providers/AppRouters'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICreateTicketAnswerData } from 'entities/Ticket/types/Ticket.types'

export const createTicketAnswerRequest = createAsyncThunk<
	void,
	{ ticketId: number; answerData: ICreateTicketAnswerData; navigate: NavigateFunction },
	{ rejectValue: string; extra: IThunkExtraArg }
>('createTicketAnswerRequest', async ({ ticketId, answerData, navigate }, { extra, rejectWithValue, dispatch }) => {
	try {
		await extra.$axios.put(extra.API.ticket.rud + ticketId, answerData)
		navigate(ERoutePath.ALL_TICKETS)
	} catch (error: any) {
		return rejectWithValue(extra.serverErrors(error))
	}
})
