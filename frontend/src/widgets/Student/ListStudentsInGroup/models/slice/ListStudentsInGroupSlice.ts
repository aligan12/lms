import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { listStudentsGroupRequest } from '../../services/ListStudentsGroupRequest'
import { IListStudentsInGroupSchema } from '../types/ListStudentsInGroupSchema.type'

const initialState: IListStudentsInGroupSchema = {
	isLoading: false,
	listStudents: [],
}

export const listStudentsinGroup = createSlice({
	name: 'listStudentsinGroup',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listStudentsGroupRequest.pending, (state: IListStudentsInGroupSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(listStudentsGroupRequest.fulfilled, (state: IListStudentsInGroupSchema, action) => {
				state.isLoading = false
				state.listStudents = action.payload
			})
			.addCase(listStudentsGroupRequest.rejected, (state: IListStudentsInGroupSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: listStudentsinGroupActions } = listStudentsinGroup
export const { reducer: listStudentsinGroupReducer } = listStudentsinGroup
