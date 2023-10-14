import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getCourseStudentRequest } from '../../services/getCourseStudentRequest'
import { ICourseStudentSchema } from '../types/CourseStudentSchema.type'

const initialState: ICourseStudentSchema = {
	courseStudentList: [],
}

export const courseStudentSlice = createSlice({
	name: 'courseStudentSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCourseStudentRequest.fulfilled, (state: ICourseStudentSchema, action) => {
			state.courseStudentList = action.payload
		})
	},
})

export const { actions: courseStudentActions } = courseStudentSlice
export const { reducer: courseStudentReducer } = courseStudentSlice
