import { RouteProps } from 'react-router-dom'

import { GroupListPage } from 'pages/Admin/GroupListPage'
import { TeacherRoomPage } from 'pages/Admin/TeacherRoomPage'
import { ViewAnswerPage } from 'pages/Admin/ViewAnswerPage'
import { ActivationPage } from 'pages/Authorization/ActivationPage'
import { AfterRegistrationPage } from 'pages/Authorization/AfterRegistrationPage'
import { AuthorizationPage } from 'pages/Authorization/AuthorizationPage'
import { AboutCoursePage } from 'pages/Course/AboutCoursePage'
import { CoursesPage } from 'pages/Course/CoursesPage'
import { CreateCoursePage } from 'pages/Course/CreateCoursePage'
import { EditCoursePage } from 'pages/Course/EditCoursePage'
import { MyCoursesPage } from 'pages/Course/MyCoursesPage'
import { HomePage } from 'pages/HomePage'
import { CreateLessonPage } from 'pages/Lesson/CreateLessonPage'
import { LessonPage } from 'pages/Lesson/LessonPage'
import { CreateModulePage } from 'pages/Module/CreateModulePage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { AllTaskOfCoursePage } from 'pages/Task/AllTaskOfCoursePage'
import { CreateAnswerPage } from 'pages/Task/CreateAnswerPage'
import { CreateTaskPage } from 'pages/Task/CreateTaskPage'
import { TaskAnswersPage } from 'pages/Task/TaskAnswersPage'
import { AboutTicketPage } from 'pages/Ticket/AboutTicketPage'
import { AllTicketsPage } from 'pages/Ticket/AllTicketsPage'
import { CreateTicketAnswerPage } from 'pages/Ticket/CreateTicketAnswerPage'
import { CreateTicketPage } from 'pages/Ticket/CreateTicketPage'
import { TicketsPage } from 'pages/Ticket/TicketsPage'

export enum ERoutePath {
	HOME = '/',
	NOT_FOUND = '*',
	COURSES = '/courses',
	ABOUT_COURSE = '/course/:course_id/about/',
	LESSON = '/course/:course_id/module/:module_index/list_modules/:list_module_id/',

	MY_COURSES = '/my_courses/',
	CREATE_COURSE = '/create_course',
	EDIT_COURSE = '/edit_course/:id',

	CREATE_MODULE = '/course/:course_id/create_module',
	CREATE_LESSON = '/course/:course_id/module/:module_id/create_lesson',
	EDIT_LESSON = '/module/:module_id/edit_lesson/:list_module_id',

	CREATE_TASK = '/course/:course_id/module/:module_id/create_task',
	TASK_VIEW_ANSWER = '/course/:course_id/list_modules/:list_module_id/student/:student_id/task_view_answer',
	TASK_CREATE_ANSWER = '/course/:course_id/module/:module_index/list_modules/:list_module_id/task_create_answer/',
	ALL_TASK_OF_COURSE = '/course/:course_id/all_task/',
	TASK_ANSWERS = '/course/:course_id/list_module/:list_module_id/task_answers',

	TEACHER_ROOM = '/teacher_room',

	GROUP_LIST = '/course/:course_id/group_list',
	AUTHORIZATION = '/authorization',
	ACTIVATION = '/activation/:uid/:token',
	AFTER_REGISTRATION = '/after_registration',

	PROFILE = '/profile/:id',
	TICKETS = '/tickets',
	CREATE_TICKET = '/create_ticket',
	CREATE_TICKET_ANSWER = '/create_ticket_answer/:id',
	ALL_TICKETS = '/all_tickets',
	ABOUT_TICKET = '/about_ticket/:id',
}

export type ITASK_ANSWERS_Params = {
	list_module_id: string
	course_id: string
}

export type IALL_TASK_Params = {
	course_id: string
}

export type ITASK_CREATE_ANSWER_Params = {
	module_index: string
	list_module_id: string
	course_id: string
}

export type ITASK_VIEW_ANSWER_Params = {
	student_id: string
	list_module_id: string
	course_id: string
}

export type ILESSON_Params = {
	module_index: string
	list_module_id: string
	course_id: string
}
export type IGROUP_LIST_Params = {
	course_id: string
}
export type ILAST_ID_Params = {
	id: string
}
export type IActivationParams = {
	uid: string
	token: string
}

export type IEDIT_LESSON_Params = {
	module_id: string
	list_module_id: string
}

export type ICREATE_LESSON_Params = {
	course_id: string
	module_id: string
}

export type ICREATE_TASK_Params = {
	course_id: string
	module_id: string
}

export type ICREATE_MODULE_Params = {
	course_id: string
}
export type IABOUT_COURSE_Params = {
	course_id: string
}

export const NotAuthRouteConfig: Array<RouteProps> = [
	{
		path: ERoutePath.HOME,
		element: <HomePage />,
	},
	// {
	// 	path: ERoutePath.NOT_FOUND,
	// 	element: <NotFoundPage />,
	// },
	{
		path: ERoutePath.COURSES,
		element: <CoursesPage />,
	},
	{
		path: ERoutePath.TICKETS,
		element: <TicketsPage />,
	},
	{
		path: ERoutePath.ABOUT_COURSE,
		element: <AboutCoursePage />,
	},
	{
		path: ERoutePath.CREATE_TICKET,
		element: <CreateTicketPage />,
	},

	{
		path: ERoutePath.TASK_VIEW_ANSWER,
		element: <ViewAnswerPage />,
	},
	{
		path: ERoutePath.AUTHORIZATION,
		element: <AuthorizationPage />,
	},
	{
		path: ERoutePath.ACTIVATION,
		element: <ActivationPage />,
	},
	{
		path: ERoutePath.AFTER_REGISTRATION,
		element: <AfterRegistrationPage />,
	},
]

export const StudentRouteConfig: Array<RouteProps> = [
	{
		path: ERoutePath.HOME,
		element: <HomePage />,
	},
	// {
	// 	path: ERoutePath.NOT_FOUND,
	// 	element: <NotFoundPage />,
	// },
	{
		path: ERoutePath.COURSES,
		element: <CoursesPage />,
	},
	{
		path: ERoutePath.TICKETS,
		element: <TicketsPage />,
	},
	{
		path: ERoutePath.ABOUT_COURSE,
		element: <AboutCoursePage />,
	},
	{
		path: ERoutePath.LESSON,
		element: <LessonPage />,
	},
	{
		path: ERoutePath.CREATE_TICKET,
		element: <CreateTicketPage />,
	},
	{
		path: ERoutePath.TASK_VIEW_ANSWER,
		element: <ViewAnswerPage />,
	},
	{
		path: ERoutePath.TASK_CREATE_ANSWER,
		element: <CreateAnswerPage />,
	},
	{
		path: ERoutePath.PROFILE,
		element: <ProfilePage />,
	},
	{
		path: ERoutePath.ABOUT_TICKET,
		element: <AboutTicketPage />,
	},
	{
		path: ERoutePath.MY_COURSES,
		element: <MyCoursesPage />,
	},
]

export const TeacherRouteConfig: Array<RouteProps> = [
	{
		path: ERoutePath.HOME,
		element: <HomePage />,
	},
	// {
	// 	path: ERoutePath.NOT_FOUND,
	// 	element: <NotFoundPage />,
	// },
	{
		path: ERoutePath.COURSES,
		element: <CoursesPage />,
	},
	{
		path: ERoutePath.TICKETS,
		element: <TicketsPage />,
	},
	{
		path: ERoutePath.ABOUT_COURSE,
		element: <AboutCoursePage />,
	},
	{
		path: ERoutePath.LESSON,
		element: <LessonPage />,
	},
	{
		path: ERoutePath.CREATE_COURSE,
		element: <CreateCoursePage />,
	},
	{
		path: ERoutePath.CREATE_TICKET,
		element: <CreateTicketPage />,
	},
	{
		path: ERoutePath.CREATE_LESSON,
		element: <CreateLessonPage />,
	},
	{
		path: ERoutePath.EDIT_COURSE,
		element: <EditCoursePage />,
	},
	{
		path: ERoutePath.TEACHER_ROOM,
		element: <TeacherRoomPage />,
	},
	{
		path: ERoutePath.TASK_VIEW_ANSWER,
		element: <ViewAnswerPage />,
	},
	{
		path: ERoutePath.EDIT_LESSON,
		element: <CreateLessonPage />,
	},
	{
		path: ERoutePath.GROUP_LIST,
		element: <GroupListPage />,
	},
	{
		path: ERoutePath.CREATE_MODULE,
		element: <CreateModulePage />,
	},
	{
		path: ERoutePath.PROFILE,
		element: <ProfilePage />,
	},
	{
		path: ERoutePath.CREATE_TASK,
		element: <CreateTaskPage />,
	},
	{
		path: ERoutePath.ALL_TASK_OF_COURSE,
		element: <AllTaskOfCoursePage />,
	},
	{
		path: ERoutePath.TASK_ANSWERS,
		element: <TaskAnswersPage />,
	},
]

export const AdminRouteConfig: Array<RouteProps> = [
	{
		path: ERoutePath.HOME,
		element: <HomePage />,
	},
	// {
	// 	path: ERoutePath.NOT_FOUND,
	// 	element: <NotFoundPage />,
	// },
	{
		path: ERoutePath.COURSES,
		element: <CoursesPage />,
	},
	{
		path: ERoutePath.TICKETS,
		element: <TicketsPage />,
	},
	{
		path: ERoutePath.ABOUT_COURSE,
		element: <AboutCoursePage />,
	},
	{
		path: ERoutePath.LESSON,
		element: <LessonPage />,
	},
	{
		path: ERoutePath.CREATE_COURSE,
		element: <CreateCoursePage />,
	},
	{
		path: ERoutePath.CREATE_TICKET,
		element: <CreateTicketPage />,
	},
	{
		path: ERoutePath.CREATE_TICKET_ANSWER,
		element: <CreateTicketAnswerPage />,
	},
	{
		path: ERoutePath.CREATE_LESSON,
		element: <CreateLessonPage />,
	},
	{
		path: ERoutePath.EDIT_COURSE,
		element: <EditCoursePage />,
	},
	{
		path: ERoutePath.TEACHER_ROOM,
		element: <TeacherRoomPage />,
	},
	{
		path: ERoutePath.TASK_VIEW_ANSWER,
		element: <ViewAnswerPage />,
	},
	{
		path: ERoutePath.EDIT_LESSON,
		element: <CreateLessonPage />,
	},
	{
		path: ERoutePath.GROUP_LIST,
		element: <GroupListPage />,
	},
	{
		path: ERoutePath.TASK_CREATE_ANSWER,
		element: <CreateAnswerPage />,
	},

	{
		path: ERoutePath.ACTIVATION,
		element: <ActivationPage />,
	},
	{
		path: ERoutePath.AFTER_REGISTRATION,
		element: <AfterRegistrationPage />,
	},
	{
		path: ERoutePath.CREATE_MODULE,
		element: <CreateModulePage />,
	},
	{
		path: ERoutePath.PROFILE,
		element: <ProfilePage />,
	},
	{
		path: ERoutePath.ALL_TICKETS,
		element: <AllTicketsPage />,
	},
	{
		path: ERoutePath.CREATE_TASK,
		element: <CreateTaskPage />,
	},
	{
		path: ERoutePath.ALL_TASK_OF_COURSE,
		element: <AllTaskOfCoursePage />,
	},
	{
		path: ERoutePath.TASK_ANSWERS,
		element: <TaskAnswersPage />,
	},
]
