import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { activationRequest } from '../../services/ActivationRequest'
import { IActivationSchema } from '../type/ActivationSchema.type'

const initialState: IActivationSchema = {
	isLoading: false,
	successful: false,
}

export const activationSlice = createSlice({
	name: 'activationSlice',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(activationRequest.pending, (state: IActivationSchema, action) => {
				state.error = undefined
				state.isLoading = true
				state.successful = false
			})
			.addCase(activationRequest.fulfilled, (state: IActivationSchema, action) => {
				state.isLoading = false
				state.successful = true
			})
			.addCase(activationRequest.rejected, (state: IActivationSchema, action) => {
				state.error = action.payload
				state.isLoading = false
				state.successful = false
			})
	},
})

export const { actions: ActivationActions } = activationSlice
export const { reducer: ActivationReducer } = activationSlice
