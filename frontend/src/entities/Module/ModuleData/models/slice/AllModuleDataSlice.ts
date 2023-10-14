import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getAllListModulesRequest } from '../../services/getAllModulesRequest'
import { IAllModuleDataSchema } from '../type/AllModuleDataSchema.type'

const initialState: IAllModuleDataSchema = {
	isLoading: false,
	allModuleData: [],
}

export const allModuleDataSlice = createSlice({
	name: 'allModuleDataSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllListModulesRequest.pending, (state: IAllModuleDataSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(getAllListModulesRequest.fulfilled, (state: IAllModuleDataSchema, action) => {
				state.isLoading = false
				state.allModuleData = action.payload
			})
			.addCase(getAllListModulesRequest.rejected, (state: IAllModuleDataSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: allModuleDataActions } = allModuleDataSlice
export const { reducer: allModuleDataReducer } = allModuleDataSlice
