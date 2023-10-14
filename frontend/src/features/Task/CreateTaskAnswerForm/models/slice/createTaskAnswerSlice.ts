import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { createTaskAnswerRequest } from '../../services/createTaskAnswerRequest'
import { ICreateTaskAnswerSchema } from '../types/createTaskAnswerSchema.type'

const initialState: ICreateTaskAnswerSchema = {
	isLoading: false,
	successful: false,
}

export const createTaskAnswerSlice = createSlice({
	name: 'createTaskAnswerSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createTaskAnswerRequest.pending, (state: ICreateTaskAnswerSchema, action) => {
				state.error = undefined
				state.isLoading = true
				state.successful = false
			})
			.addCase(createTaskAnswerRequest.fulfilled, (state: ICreateTaskAnswerSchema, action) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(createTaskAnswerRequest.rejected, (state: ICreateTaskAnswerSchema, action) => {
				state.error = action.payload
				state.isLoading = false
				state.successful = false
			})
	},
})

export const { actions: createTaskAnswerActions } = createTaskAnswerSlice
export const { reducer: createTaskAnswerReducer } = createTaskAnswerSlice
