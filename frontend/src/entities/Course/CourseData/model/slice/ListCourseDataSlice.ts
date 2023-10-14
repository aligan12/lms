import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { listCourseRequest } from '../../services/ListCourseRequest'
import { IListCourseDataSchema } from '../type/ListCourseDataSchema'

import { ICourseData } from 'entities/Course/types'

const initialState: IListCourseDataSchema = {
	course_list: undefined,
	isLoading: false,
}

export const listCourseDataSlice = createSlice({
	name: 'listCourseDataSlice',
	initialState: initialState,
	reducers: {
		set_course_list: (state: IListCourseDataSchema, { payload }: PayloadAction<ICourseData[]>) => {
			state.course_list = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(listCourseRequest.pending, (state: IListCourseDataSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(listCourseRequest.fulfilled, (state: IListCourseDataSchema, action) => {
				state.course_list = action.payload
				state.isLoading = false
			})
			.addCase(listCourseRequest.rejected, (state: IListCourseDataSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: listCourseDataActions } = listCourseDataSlice
export const { reducer: listCourseDataReducer } = listCourseDataSlice
