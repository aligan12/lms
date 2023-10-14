import { BaseSyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classes from './LessonConstructor.module.scss'

import { IStateSchema } from 'app/providers/StoreProvider/config/StateSchema'

import { createLessonAboutActions } from 'features/Lesson/CreateLessonAboutForm'
import { getLessonContents } from 'features/Lesson/CreateLessonContentForm'
import { LessonContentList } from 'features/Lesson/LessonContentList'

import { ICreateLessonAboutData } from 'entities/Lesson/types'

import { classnames as cn } from 'shared/lib'
import { DeleteZone, Header, YouTubeVideo } from 'shared/ui'

export const LessonConstructor = ({ styles }: ILessonConstructorProps) => {
	const about_lesson = useSelector((state: IStateSchema) => state.createLessonAbout)
	const lesson = useSelector(getLessonContents)

	const dispatch = useDispatch()
	const [isVisible, setIsVisible] = useState(false)
	const [currentContent, setCurrentContent] = useState<keyof ICreateLessonAboutData | null>(null)

	function dragStartHandler(e: BaseSyntheticEvent): void {
		if (e.target.className === classes.title_wrapper) {
			setCurrentContent('title')
		} else if (e.target.className === classes.video_wrapper) {
			setCurrentContent('video')
		}

		setIsVisible(true)
	}

	function dragEndHandler(e: BaseSyntheticEvent): void {
		setIsVisible(false)
	}
	function dragOverHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
		if (e.target.id === 'delete_title') e.target.style.background = 'var(--primary-color)'
	}
	function dropHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
		setIsVisible(false)
		console.log('DROP')
		if (currentContent) {
			dispatch(createLessonAboutActions.delete_field_about_lesson(currentContent))
		}
	}

	return (
		<div className={cn(classes.Lesson, [styles])}>
			{about_lesson?.title && (
				<div
					className={classes.title_wrapper}
					draggable={true}
					onDragEnd={(e) => dragEndHandler(e)}
					onDragStart={(e) => dragStartHandler(e)}
				>
					<Header
						line={false}
						styles={classes.no_drag}
						title={about_lesson.title}
					/>
				</div>
			)}
			{about_lesson?.video && (
				<div
					className={classes.video_wrapper}
					draggable={true}
					onDragEnd={(e) => dragEndHandler(e)}
					onDragStart={(e) => dragStartHandler(e)}
				>
					<YouTubeVideo
						styles={classes.no_drag}
						video_link={about_lesson.video}
					/>
				</div>
			)}

			<DeleteZone
				onDragOver={(e) => dragOverHandler(e)}
				onDrop={(e) => dropHandler(e)}
				isVisible={isVisible}
			/>

			{lesson && (
				<LessonContentList
					editor={true}
					data={lesson}
				/>
			)}
		</div>
	)
}

interface ILessonConstructorProps {
	styles?: string
}
