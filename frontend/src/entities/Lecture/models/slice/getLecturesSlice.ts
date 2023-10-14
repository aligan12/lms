import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IGetLecturesSchema } from '../types/GetLecturesSchema.type'

import { getLectureRequest } from 'entities/Lecture/service/getLectureRequest'

const initialState: IGetLecturesSchema = {
	isLoading: false,
	successful: false,
}

export const getLecturesSlice = createSlice({
	name: 'getLecturesSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLectureRequest.pending, (state: IGetLecturesSchema, action) => {
				state.error = undefined
				state.isLoading = true
				state.successful = false
			})
			.addCase(getLectureRequest.fulfilled, (state: IGetLecturesSchema, action) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(getLectureRequest.rejected, (state: IGetLecturesSchema, action) => {
				state.error = action.payload
				state.isLoading = false
				state.successful = false
			})
	},
})

export const { actions: getLectureActions } = getLecturesSlice
export const { reducer: getLectureReducer } = getLecturesSlice
