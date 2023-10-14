import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICreateRegistrationData } from 'entities/Authorization/types'
import { ICreateTicketData } from 'entities/Ticket/types'
import { ICustomUser } from 'entities/Users/CustomUser'

import { serverErrors } from 'shared/lib'

export const createTicketRequest = createAsyncThunk<
	void,
	ICreateTicketData,
	{ rejectValue: string; extra: IThunkExtraArg }
>('createTicketRequest', async (ticketData, { extra, rejectWithValue, dispatch }) => {
	try {
		const response = await extra.$axios.post(extra.API.ticket.create, ticketData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	} catch (error: any) {
		return rejectWithValue(serverErrors(error))
	}
})
