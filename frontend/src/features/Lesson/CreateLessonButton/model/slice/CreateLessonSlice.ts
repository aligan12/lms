import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { createLessonRequest } from '../../services/CreateLessonRequest'
import { ICreateLessonSchema } from '../type/CreateLessonSchema.type'

const initialState: ICreateLessonSchema = {
	isLoading: false,
}

export const createLessonSlice = createSlice({
	name: 'createLessonSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createLessonRequest.pending, (state: ICreateLessonSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(createLessonRequest.fulfilled, (state: ICreateLessonSchema, action) => {
				state.isLoading = false
			})
			.addCase(createLessonRequest.rejected, (state: ICreateLessonSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: createLessonSliceActions } = createLessonSlice
export const { reducer: createLessonSliceReducer } = createLessonSlice
