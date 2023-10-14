import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { getCourseStudentRequest } from 'features/CustomUsers/Student'

import { ICreateLoginData, IToken } from 'entities/Authorization/types'
import { ICustomUser, customUserSliceActions } from 'entities/Users/CustomUser'
import { getUserType } from 'entities/Users/CustomUser/lib/getUserType'
import { IStudentData } from 'entities/Users/Student/types'

import { TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'shared/const'
import { serverErrors } from 'shared/lib'

export const loginByToken = createAsyncThunk<void, void, { rejectValue: string; extra: IThunkExtraArg }>(
	'login/loginByToken',
	async (_, { rejectWithValue, dispatch, extra }) => {
		try {
			const token: IToken = JSON.parse(String(localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)))

			if (token) {
				const customUser = await extra.$axios.get<ICustomUser>(extra.API.auth.users.me, {
					headers: { Authorization: `Bearer ${token?.access}` },
				})
				if (!customUser.data) {
					throw new Error()
				}
				let userInfo
				switch (customUser.data.type) {
					case '2': {
						const adminInfo = await extra.$axios.get(extra.API.admin.rud + customUser.data.id, {
							headers: { Authorization: `Bearer ${token?.access}` },
						})
						userInfo = adminInfo.data
						break
					}
					case '3': {
						const teacherInfo = await extra.$axios.get(extra.API.teachers.id + customUser.data.id, {
							headers: { Authorization: `Bearer ${token?.access}` },
						})
						userInfo = teacherInfo.data
						break
					}
					case '4': {
						const studentInfo = await extra.$axios.get<IStudentData>(
							extra.API.students.id + customUser.data.id,
							{
								headers: { Authorization: `Bearer ${token?.access}` },
							},
						)
						userInfo = studentInfo.data
						dispatch(getCourseStudentRequest({ studentId: customUser.data.id }))
						break
					}
				}

				if (!userInfo) {
					throw new Error()
				}

				dispatch(customUserSliceActions.setToken(token))
				dispatch(customUserSliceActions.userType(getUserType(customUser.data.type)))
				dispatch(customUserSliceActions.userInfo(userInfo))
			} else {
				localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY)
				dispatch(customUserSliceActions.userType('not-auth'))
			}
		} catch (error: any) {
			localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY)
			dispatch(customUserSliceActions.userType('not-auth'))
			return rejectWithValue(serverErrors(error))
		}
	},
)
