import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { listTicketStudentRequest } from '../../services/listTicketStudentRequest'
import { IListTicketStudentSchema } from '../types/ListTicketStudentSchema.type'

const initialState: IListTicketStudentSchema = {
	isLoading: false,
	ticketStudentData: [],
}

export const listTicketStudentSlice = createSlice({
	name: 'listTicketStudentSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listTicketStudentRequest.pending, (state: IListTicketStudentSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(listTicketStudentRequest.fulfilled, (state: IListTicketStudentSchema, action) => {
				state.isLoading = false
				state.ticketStudentData = action.payload
			})
			.addCase(listTicketStudentRequest.rejected, (state: IListTicketStudentSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: listTicketStudentActions } = listTicketStudentSlice
export const { reducer: listTicketStudentReducer } = listTicketStudentSlice
