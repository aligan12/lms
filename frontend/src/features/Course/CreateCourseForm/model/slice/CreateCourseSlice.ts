import { createSlice } from '@reduxjs/toolkit'

import { createCourseRequest } from '../../services/CreateCourseRequest'
import { ICreateCourseSchema } from '../type/CreateCourseSchema'

const initialState: ICreateCourseSchema = {
	isLoading: false,
	successful: false,
}

export const createCourseSlice = createSlice({
	name: 'createCourseSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createCourseRequest.pending, (state: ICreateCourseSchema) => {
				state.isLoading = true
				state.error = undefined
				state.successful = false
			})
			.addCase(createCourseRequest.fulfilled, (state: ICreateCourseSchema) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(createCourseRequest.rejected, (state: ICreateCourseSchema, { payload }) => {
				state.isLoading = false
				state.error = payload
				state.successful = false
			})
	},
})

export const { actions: createCourseActions } = createCourseSlice
export const { reducer: createCourseReducer } = createCourseSlice
