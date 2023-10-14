import { createSlice } from '@reduxjs/toolkit'

import { getAllTaskOfCourse } from '../../services/getAllTaskOfCourse'
import { getTaskAnswerRequest } from '../../services/getTaskAnswerRequest'
import { retrieveTaskRequest } from '../../services/retrieveTaskRequest'
import { IRetrieveTaskSchema } from '../type/retrieveTaskSchema.type'

const initialState: IRetrieveTaskSchema = {
	isLoading: false,
	taskData: null,
	taskAnswerData: null,
	allTaskData: null,
}

export const retrieveTaskSlice = createSlice({
	name: 'retrieveTaskSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(retrieveTaskRequest.pending, (state: IRetrieveTaskSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(retrieveTaskRequest.fulfilled, (state: IRetrieveTaskSchema, action) => {
				state.taskData = action.payload
				state.isLoading = false
			})
			.addCase(retrieveTaskRequest.rejected, (state: IRetrieveTaskSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})

			.addCase(getTaskAnswerRequest.pending, (state: IRetrieveTaskSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(getTaskAnswerRequest.fulfilled, (state: IRetrieveTaskSchema, action) => {
				state.taskAnswerData = action.payload
				state.isLoading = false
			})
			.addCase(getTaskAnswerRequest.rejected, (state: IRetrieveTaskSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})

			.addCase(getAllTaskOfCourse.pending, (state: IRetrieveTaskSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(getAllTaskOfCourse.fulfilled, (state: IRetrieveTaskSchema, action) => {
				state.allTaskData = action.payload
				state.isLoading = false
			})
			.addCase(getAllTaskOfCourse.rejected, (state: IRetrieveTaskSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: retrieveTaskActions } = retrieveTaskSlice
export const { reducer: retrieveTaskReducer } = retrieveTaskSlice
