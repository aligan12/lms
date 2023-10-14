import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { loginByEmail } from '../../services/loginByEmail/LoginByEmail'
import { ILoginSchema } from '../types/loginSchema.type'

const initialState: ILoginSchema = {
	isLoading: false,
}

export const loginSlice = createSlice({
	name: 'loginForm',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginByEmail.pending, (state: ILoginSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(loginByEmail.fulfilled, (state: ILoginSchema, action) => {
				state.isLoading = false
			})
			.addCase(loginByEmail.rejected, (state: ILoginSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: loginSliceActions } = loginSlice
export const { reducer: loginSliceReducer } = loginSlice
