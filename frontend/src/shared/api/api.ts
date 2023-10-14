export const API = {
	auth: {
		jwt: {
			create: '/auth/jwt/create/',
		},
		users: {
			create: '/auth/users/',
			me: '/auth/users/me/',
		},
		google: {
			auth: '/auth/o/google-oauth2/',
		},
	},
	accounts: { activate: '/accounts/activate/' },
	custom_user: {
		update: '/auth/users/me/',
	},
	lectures: {
		additions: {
			create: '/lectures-additions/create/',
		},
		lesson: {
			create: '/lectures-lesson/create/',
		},
		create: '/lectures/create/',
		retrieve: '/lectures/id/',
	},
	teachers: {
		id: '/teachers/id/',
	},
	admin: {
		rud: '/admins/rud/',
	},
	students: {
		rud: '/students/rud/',
		id: '/students/id/',
		only_courses: '/only_courses_student/id/',
	},
	course_students: {
		list: '/course_student/list/',
		create: '/students_course/create/',
	},
	attendance: {
		create: '/attendance/create/',
	},
	grades: {
		with_student_info: '/grades_with_student_info/list/',
		grades_student: '/grades_student/list/',
		update: '/grades/update/',
	},

	course: {
		create: '/course/create/',
		retrieve: '/course/id/',
		update: '/course/update/',
		list: '/course/list/',
		only_students: '/course_students/list/',
	},
	ticket: {
		list: '/student_ticket/list/',
		create: '/student_ticket/create/',
		one_student: '/one_student_ticket/list/', // требует /?student=<id>
		retrieve: '/student_ticket/id/',
		rud: '/student_ticket/rud/',
	},
	modules: {
		list: '/modules/list/',
		retrieve: '/modules/id/',
		create: '/modules/create/',
		rud: '/modules/rud/',
	},
	list_modules: {
		retrieve: '/list_modules/id/',
		rud: '/list_modules/rud/',
		create: '/list_modules/create/',
		list: '/list_modules/list/',
	},
	file_tasks: {
		create: '/file_tasks/create/',
		retrieve: '/file_tasks/id/',
	},
	file_tasks_answer: {
		create: '/file_tasks_answer/create/',
		list: '/file_tasks_answer/list/',
	},
}

export type IAPI = typeof API
