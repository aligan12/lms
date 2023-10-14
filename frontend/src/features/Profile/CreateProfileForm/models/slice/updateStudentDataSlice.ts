import { createSlice } from '@reduxjs/toolkit'

import { UpdateStudentDataRequest } from '../../services/UpdateStudentDataRequest'
import { IUpdateStudentDataSchema } from '../types/UpdateStudentDataSchema.type'

const initialState: IUpdateStudentDataSchema = {
	isLoading: false,
}

export const updateStudentDataSlice = createSlice({
	name: 'updateStudentDataSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(UpdateStudentDataRequest.pending, (state: IUpdateStudentDataSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(UpdateStudentDataRequest.fulfilled, (state: IUpdateStudentDataSchema, action) => {
				state.isLoading = false
			})
			.addCase(UpdateStudentDataRequest.rejected, (state: IUpdateStudentDataSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: updateStudentDataActions } = updateStudentDataSlice
export const { reducer: updateStudentDataReducer } = updateStudentDataSlice
