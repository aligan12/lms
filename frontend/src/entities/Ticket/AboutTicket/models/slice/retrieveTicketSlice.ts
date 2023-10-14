import { createSlice } from '@reduxjs/toolkit'

import { retrieveTicketRequest } from '../../services/retrieveTicketRequest'
import { IRetrieveTicketSchema } from '../types/RetrieveTicketSchema.type'

const initialState: IRetrieveTicketSchema = {
	isLoading: false,
	ticketData: null,
}

export const retrieveTicketSlice = createSlice({
	name: 'retrieveTicketSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(retrieveTicketRequest.pending, (state: IRetrieveTicketSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(retrieveTicketRequest.fulfilled, (state: IRetrieveTicketSchema, action) => {
				state.isLoading = false
				state.ticketData = action.payload
			})
			.addCase(retrieveTicketRequest.rejected, (state: IRetrieveTicketSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: retrieveTicketActions } = retrieveTicketSlice
export const { reducer: retrieveTicketReducer } = retrieveTicketSlice
