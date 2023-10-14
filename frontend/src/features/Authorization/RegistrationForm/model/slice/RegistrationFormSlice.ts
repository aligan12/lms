import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { registrationByEmail } from '../../services/RegistrationByEmail'
import { IRegistrationSchema } from '../type/RegistrationFormSchema'

const initialState: IRegistrationSchema = {
	isLoading: false,
	name: '',
	surname: '',
}

const RegistrationFormSlice = createSlice({
	name: 'registrationFormSlice',
	initialState: initialState,
	reducers: {
		setName: (state: IRegistrationSchema, { payload }: PayloadAction<string>) => {
			state.name = payload
		},
		setSurname: (state: IRegistrationSchema, { payload }: PayloadAction<string>) => {
			state.surname = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registrationByEmail.pending, (state: IRegistrationSchema) => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(registrationByEmail.fulfilled, (state: IRegistrationSchema, action) => {
				state.isLoading = false
			})
			.addCase(registrationByEmail.rejected, (state: IRegistrationSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: registrationFormSliceActions } = RegistrationFormSlice
export const { reducer: registrationFormSliceReducer } = RegistrationFormSlice
