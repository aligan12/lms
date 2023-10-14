import { createSlice } from '@reduxjs/toolkit'

import { enrollCourseStudentRequest } from '../../services/enrollCourseStudentRequest'
import { IEnrollCourseStudentSchema } from '../types/EnrollCourseStudentSchema.type'

const initialState: IEnrollCourseStudentSchema = {
	isLoading: false,
	successful: false,
}

export const enrollCourseStudentSlice = createSlice({
	name: 'enrollCourseStudentSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(enrollCourseStudentRequest.pending, (state: IEnrollCourseStudentSchema, action) => {
				state.error = undefined
				state.isLoading = true
				state.successful = false
			})
			.addCase(enrollCourseStudentRequest.fulfilled, (state: IEnrollCourseStudentSchema, action) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(enrollCourseStudentRequest.rejected, (state: IEnrollCourseStudentSchema, action) => {
				state.error = action.payload
				state.isLoading = false
				state.successful = false
			})
	},
})

export const { actions: enrollCourseStudentActions } = enrollCourseStudentSlice
export const { reducer: enrollCourseStudentReducer } = enrollCourseStudentSlice
