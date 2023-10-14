import { ICustomUserType } from 'entities/Users/CustomUser'

import { IFormConstructorData } from 'shared/ui'

export interface ICreateRegistrationData {
	email: string
	password: string
	re_password: string
	name: string
	surname: string
	type: ICustomUserType
}

interface ICreateRegistrationKeys {
	key: keyof ICreateRegistrationData
}

export interface IRegistrationFormConstructor
	extends IFormConstructorData,
		ICreateRegistrationKeys {}
