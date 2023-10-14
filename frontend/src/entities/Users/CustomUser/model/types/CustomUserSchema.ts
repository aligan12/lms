import { ICustomUser } from '../../types/CustomUser.type'

import { IToken } from 'entities/Authorization/types'
import { IStudentData } from 'entities/Users/Student/types/Student/Student.type'

export type IUserType = 'student' | 'teacher' | 'admin' | 'super-admin' | 'not-auth'

export interface ICustomUserSchema {
	token: IToken
	userType: IUserType | null
	userInfo: IStudentData
	customUserInfo: ICustomUser | null
}
