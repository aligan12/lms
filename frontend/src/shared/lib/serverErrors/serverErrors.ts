export const serverErrors = (error: any): string => {
	switch (error.request.status) {
		case 400: {
			const errorData = error.response.data
			let errorMessage = ''
			for (const key in errorData) {
				errorMessage = [String(key).toUpperCase(), errorData[key]].join(' : ')
			}
			return errorMessage
		}
		case 401: {
			if (error.response.data) {
				const errorData = error.response.data
				let errorMessage = ''
				for (const key in errorData) {
					errorMessage = [String(key).toUpperCase(), errorData[key]].join(' : ')
				}
				return errorMessage
			} else {
				return 'Вы не авторизованы'
			}
		}
		case 403: {
			return 'У Вас нет доступа '
		}
		case 0:
			return 'Сервер не отвечает, попробуйте позже'

		default:
			return 'Что то пошло не так, попробуйте позже'
	}
}
