import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { access } from 'fs'

import { ICustomUser } from '../../types/CustomUser.type'
import { ICustomUserSchema, IUserType } from '../types/CustomUserSchema'

import { IToken } from 'entities/Authorization/types'
import { IStudentData } from 'entities/Users/Student/types'

import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const'

const initialState: ICustomUserSchema = {
	token: { access: '', refresh: '' },
	userInfo: {
		about: '',
		age: null,
		country: null,
		name: '',
		patronymic: null,
		sex: null,
		student: null,
		surname: '',
		university: null,
		avatar: null,
		phone: null,
	},
	userType: null,
	customUserInfo: null,
}

export const CustomUserSlice = createSlice({
	name: 'customUserSlice',
	initialState: initialState,
	reducers: {
		setToken: (state: ICustomUserSchema, { payload }: PayloadAction<IToken>) => {
			state.token.access = payload.access
			state.token.refresh = payload.refresh
		},
		userType: (state: ICustomUserSchema, { payload }: PayloadAction<IUserType>) => {
			state.userType = payload
		},
		set_customUserInfo: (state: ICustomUserSchema, { payload }: PayloadAction<ICustomUser>) => {
			state.customUserInfo = payload
		},
		userInfo: (state: ICustomUserSchema, { payload }: PayloadAction<IStudentData>) => {
			state.userInfo.about = payload.about
			state.userInfo.age = payload.age
			state.userInfo.country = payload.country
			state.userInfo.name = payload.name
			state.userInfo.patronymic = payload.patronymic
			state.userInfo.sex = payload.sex
			state.userInfo.student = payload.student
			state.userInfo.surname = payload.surname
			state.userInfo.university = payload.university
			state.userInfo.phone = payload.phone
			state.userInfo.avatar = payload.avatar
		},
		signOut: (state: ICustomUserSchema, { payload }: PayloadAction<void>) => {
			state.token.access = ''
			state.token.refresh = ''
			state.userType = 'not-auth'
			state.userInfo.about = ''
			state.userInfo.age = null
			state.userInfo.country = null
			state.userInfo.name = ''
			state.userInfo.patronymic = null
			state.userInfo.sex = null
			state.userInfo.student = null
			state.userInfo.surname = ''
			state.userInfo.university = null
			state.userInfo.phone = null
			state.userInfo.avatar = null

			localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY)
		},
	},
})

export const { actions: customUserSliceActions } = CustomUserSlice
export const { reducer: customUserSliceReducer } = CustomUserSlice
