import { IUserType } from '../model/types/CustomUserSchema'
import { ICustomUserType } from '../types/CustomUser.type'

export const getUserType = (type: ICustomUserType): IUserType => {
	switch (type) {
		case '1':
			return 'super-admin'
		case '2':
			return 'admin'
		case '3':
			return 'teacher'
		case '4':
			return 'student'
	}
}
