import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { NavigateFunction } from 'react-router-dom'

import { ERoutePath } from 'app/providers/AppRouters'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { ICreateRegistrationData } from 'entities/Authorization/types'
import { ICustomUser } from 'entities/Users/CustomUser'

import { serverErrors } from 'shared/lib'

interface IRegistartionByEmail {
	registrationData: ICreateRegistrationData
	navigate: NavigateFunction
}

export const registrationByEmail = createAsyncThunk<
	ICustomUser,
	IRegistartionByEmail,
	{ rejectValue: string; extra: IThunkExtraArg }
>('hello', async ({ registrationData, navigate }, { extra, rejectWithValue }) => {
	try {
		const newUser = await axios.post<ICustomUser>(extra.API.auth.users.create, registrationData)
		navigate(ERoutePath.AFTER_REGISTRATION)
		return newUser.data
	} catch (error: any) {
		return rejectWithValue(serverErrors(error))
	}
})
