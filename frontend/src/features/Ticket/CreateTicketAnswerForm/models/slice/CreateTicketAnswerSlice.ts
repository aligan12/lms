import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { createTicketAnswerRequest } from '../../services/createTicketAnswerRequest'
import { ICreateTicketAnswerSchema } from '../types/CreateTicketAnswerSchema.type'

const initialState: ICreateTicketAnswerSchema = {
	isLoading: false,
}

export const createTicketAnswer = createSlice({
	name: 'createTicketAnswer',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createTicketAnswerRequest.pending, (state: ICreateTicketAnswerSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(createTicketAnswerRequest.fulfilled, (state: ICreateTicketAnswerSchema, action) => {
				state.isLoading = false
			})
			.addCase(createTicketAnswerRequest.rejected, (state: ICreateTicketAnswerSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: createTicketAnswerActions } = createTicketAnswer
export const { reducer: createTicketAnswerReducer } = createTicketAnswer
