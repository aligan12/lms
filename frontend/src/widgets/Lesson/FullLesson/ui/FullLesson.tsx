import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './FullLesson.module.scss'

import { ILAST_ID_Params } from 'app/providers/AppRouters'
import { ILESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { listStudentsGroupRequest } from 'widgets/Student/ListStudentsInGroup'

import { CreateAttendanceButton } from 'features/Lesson/CreateAttendanceButton'
import { getLessonAbout, getLessonAboutModuleList } from 'features/Lesson/CreateLessonAboutForm'
import { getLessonContents } from 'features/Lesson/CreateLessonContentForm'
import { LessonContentList } from 'features/Lesson/LessonContentList'
import { PreviousButton } from 'features/Lesson/PreviousButton'

import { listGradesForStudent, useLastAttendance } from 'entities/Grade'
import { getLectureRequest, getLecturesError } from 'entities/Lecture'
import { getUserInfo, getUserType } from 'entities/Users/CustomUser'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { ErrorText, Header, Htag, YouTubeVideo } from 'shared/ui'

export const FullLesson = ({ styles }: IFullLessonProps) => {
	// const data: ILectureData = {
	// 	id: 1,
	// 	course: 1,
	// 	description: 'Введение в программирование',
	// 	title: 'Введение в программирование',
	// 	video: 'https://www.youtube.com/embed/i-uvtDKeFgE',
	// 	additions: [
	// 		{ id: 1, title: 'Презентация', file: 'https://www.youtube.com/' },
	// 		{ id: 2, title: 'Регламент', file: 'https://www.youtube.com/' },
	// 		{ id: 3, title: 'Книга', file: 'https://www.youtube.com/' },
	// 	],

	// 	lesson: [
	// 		{
	// 			id: 1,
	// 			order: 1,
	// 			title: 'Python Install',
	// 			type: 'text',
	// 			content: `Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC,
	// 				search in the start bar for Python or run the following on the Command Line (cmd.exe):
	// 				To play your video on a web page, do the following:

	// 					Upload the video to YouTube
	// 					Take a note of the video id
	// 					Define an <iframe> element in your web page
	// 					Let the src attribute point to the video URL
	// 					Use the width and height attributes to specify the dimension of the player
	// 					Add any other parameters to the URL (see below)`,
	// 		},
	// 		{
	// 			id: 2,
	// 			order: 2,
	// 			title: '',
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			id: 3,
	// 			order: 3,
	// 			title: '',
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			id: 4,
	// 			order: 4,
	// 			title: 'Python',
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			id: 5,
	// 			order: 5,
	// 			title: '',
	// 			type: 'code',
	// 			content: 'C:UsersYour Name>python --version',
	// 		},
	// 	],
	// }
	const { list_module_id, course_id, module_index } = useParams<ILESSON_Params>()
	const lesson = useSelector(getLessonContents)
	const about = useSelector(getLessonAbout)
	const error = useSelector(getLecturesError)
	const userType = useSelector(getUserType)
	const userInfo = useSelector(getUserInfo)
	const moduleList = useSelector(getLessonAboutModuleList)
	const { lastAttendance, isDisabled, lastModuleIndex } = useLastAttendance(Number(module_index))

	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(listGradesForStudent({ courseId: Number(course_id), studentId: Number(userInfo.student) }))
		dispatch(getLectureRequest(Number(list_module_id)))
	}, [list_module_id])

	return (
		<>
			{moduleList && !isDisabled(moduleList, lastAttendance, lastModuleIndex) && (
				<>
					{error && <Htag tag={'large'}> {error}</Htag>}
					{about && (
						<div className={cn(classes.Lesson, [styles])}>
							<div>
								<Header
									line={false}
									title={about.title}
								/>

								{about.video && <YouTubeVideo video_link={about.video} />}
								{lesson && <LessonContentList data={lesson} />}
							</div>
							{userType === 'student' && (
								<div className={classes.navigateButton}>
									<PreviousButton />
									<CreateAttendanceButton />
								</div>
							)}
						</div>
					)}
				</>
			)}
		</>
	)
}

interface IFullLessonProps {
	styles?: string
}
