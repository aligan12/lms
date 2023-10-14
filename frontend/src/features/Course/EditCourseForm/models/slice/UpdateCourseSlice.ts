import { createSlice } from '@reduxjs/toolkit'

import { updateCourseRequest } from '../../services/UpdateCourseRequest'
import { IUpdateCourseSchema } from '../type/UpdateCourseSchema.type'

const initialState: IUpdateCourseSchema = {
	successful: false,
	isLoading: false,
}

export const updateCourseSlice = createSlice({
	name: 'updateCourseSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateCourseRequest.pending, (state: IUpdateCourseSchema) => {
				state.error = undefined
				state.isLoading = true
				state.successful = false
			})
			.addCase(updateCourseRequest.fulfilled, (state: IUpdateCourseSchema) => {
				state.successful = true
				state.isLoading = false
			})
			.addCase(updateCourseRequest.rejected, (state: IUpdateCourseSchema, action) => {
				state.error = action.payload
				state.successful = false
				state.isLoading = false
			})
	},
})

export const { actions: UpdateCourseActions } = updateCourseSlice
export const { reducer: UpdateCourseReducer } = updateCourseSlice
