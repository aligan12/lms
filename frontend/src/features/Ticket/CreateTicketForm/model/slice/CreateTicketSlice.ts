import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { createTicketRequest } from '../../services/CreateTicketRequest'
import { ICreateTicketSchema } from '../type/CreateTicketSchema'

const initialState: ICreateTicketSchema = {
	isLoading: false,
	successful: false,
}

export const createTicketSlice = createSlice({
	name: 'createTicketSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createTicketRequest.pending, (state: ICreateTicketSchema) => {
				state.isLoading = true
				state.error = undefined
				state.successful = false
			})
			.addCase(createTicketRequest.fulfilled, (state: ICreateTicketSchema) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(createTicketRequest.rejected, (state: ICreateTicketSchema, { payload }) => {
				state.isLoading = false
				state.error = payload
				state.successful = false
			})
	},
})

export const { actions: CreateTicketActions } = createTicketSlice
export const { reducer: CreateTicketReducer } = createTicketSlice
