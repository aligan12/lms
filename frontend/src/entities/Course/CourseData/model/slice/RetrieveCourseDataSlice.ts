import { createSlice } from '@reduxjs/toolkit'

import { retrieveCourseRequest } from '../../services/RetrieveCourseRequest'
import { IRetrieveCourseDataSchema } from '../type/RetrieveCourseDataSliceSchema'

const initialState: IRetrieveCourseDataSchema = {
	course_data: undefined,
	isLoading: false,
}

export const RetrieveCourseDataSlice = createSlice({
	name: 'RetrieveCourseDataSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(retrieveCourseRequest.pending, (state: IRetrieveCourseDataSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(retrieveCourseRequest.fulfilled, (state: IRetrieveCourseDataSchema, action) => {
				state.course_data = action.payload
				state.isLoading = false
			})
			.addCase(retrieveCourseRequest.rejected, (state: IRetrieveCourseDataSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: retrieveCourseDataActions } = RetrieveCourseDataSlice
export const { reducer: retrieveCourseDataReducer } = RetrieveCourseDataSlice
