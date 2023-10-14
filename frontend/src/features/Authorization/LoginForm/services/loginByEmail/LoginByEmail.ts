import { createAsyncThunk } from '@reduxjs/toolkit'

import { ERoutePath } from 'app/providers/AppRouters'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { getCourseStudentRequest } from 'features/CustomUsers/Student'

import { ICreateLoginData, IToken } from 'entities/Authorization/types'
import { ICustomUser, customUserSliceActions } from 'entities/Users/CustomUser'
import { getUserType } from 'entities/Users/CustomUser/lib/getUserType'
import { IStudentData } from 'entities/Users/Student/types'

import { TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'shared/const'
import { serverErrors } from 'shared/lib'

export const loginByEmail = createAsyncThunk<void, ICreateLoginData, { rejectValue: string; extra: IThunkExtraArg }>(
	'login/loginByEmail',
	async ({ navigate, ...authData }, { rejectWithValue, dispatch, extra }) => {
		try {
			const token = await extra.$axios.post<IToken>(extra.API.auth.jwt.create, authData)

			if (!token.data) {
				throw new Error()
			}
			localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(token.data))

			document.location.reload()

			// const customUser = await extra.$axios.get<ICustomUser>(extra.API.auth.users.me, {
			// 	headers: { Authorization: `Bearer ${token?.data.access}` },
			// })
			// if (!customUser.data) {
			// 	throw new Error()
			// }
			// let userInfo
			// switch (customUser.data.type) {
			// 	case '2': {
			// 		const adminInfo = await extra.$axios.get(extra.API.admin.rud + customUser.data.id, {
			// 			headers: { Authorization: `Bearer ${token?.data.access}` },
			// 		})
			// 		userInfo = adminInfo.data
			// 		break
			// 	}
			// 	case '3': {
			// 		const teacherInfo = await extra.$axios.get(extra.API.teachers.id + customUser.data.id, {
			// 			headers: { Authorization: `Bearer ${token?.data.access}` },
			// 		})
			// 		userInfo = teacherInfo.data
			// 		break
			// 	}
			// 	case '4': {
			// 		const studentInfo = await extra.$axios.get<IStudentData>(
			// 			extra.API.students.id + customUser.data.id,
			// 			{
			// 				headers: { Authorization: `Bearer ${token?.data.access}` },
			// 			},
			// 		)
			// 		dispatch(getCourseStudentRequest({ studentId: customUser.data.id }))

			// 		userInfo = studentInfo.data
			// 		break
			// 	}
			// }

			// if (!userInfo) {
			// 	throw new Error()
			// }

			// dispatch(customUserSliceActions.setToken(token.data))
			// dispatch(customUserSliceActions.userType(getUserType(customUser.data.type)))
			// dispatch(customUserSliceActions.userInfo(userInfo))
		} catch (error: any) {
			return rejectWithValue(serverErrors(error))
		}
	},
)
