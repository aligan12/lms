import { NavigateFunction } from 'react-router-dom'

import { IFormConstructorData } from 'shared/ui'

export interface ICreateLoginData {
	email: string
	password: string
	rememberMe?: boolean
	navigate?: NavigateFunction
}

interface ICreateLoginKeys {
	key: keyof ICreateLoginData
}

export interface ILoginFormConstructor extends IFormConstructorData, ICreateLoginKeys {}
