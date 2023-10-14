import { IFormConstructorData } from 'shared/ui'

export interface ICreateProfileData {
	avatar: File | null
	surname: string
	name: string
	patronymic: string
	phone: string | null
	about: string
	sex: string
	age: number | string | null
	country: string
	university: string
}

interface ICreateProfileKeys {
	key: keyof ICreateProfileData
}

export interface IProfileFormConstructor extends IFormConstructorData, ICreateProfileKeys {}
