import { BaseSyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classes from './LessonContentList.module.scss'

import { IStateSchema } from 'app/providers/StoreProvider/config/StateSchema'

import { getLessonContents, lessonContentActions } from 'features/Lesson/CreateLessonContentForm'

import { getLectureRequest } from 'entities/Lecture'
import { ILessonContentData } from 'entities/Lesson/types'

import { classnames as cn } from 'shared/lib'
import { CodeBox, DeleteZone, Hr, Htag, List, TextBox } from 'shared/ui'

export const LessonContentList = ({ styles, data, editor = false }: ILessonContentListProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const renderContent = (content: ILessonContentData) => {
		return (
			<div className={classes.content_wrapper}>
				{content.title && (
					<>
						<Hr />
						<Htag tag={'large'}>{content.title}</Htag>
					</>
				)}
				{content.type === 'text' && <TextBox size={'medium'}>{content.content}</TextBox>}
				{content.type === 'code' && <CodeBox>{content.content}</CodeBox>}
			</div>
		)
	}
	const dispatch = useDispatch()
	const contentData = useSelector(getLessonContents)

	const [currentContent, setCurrentContent] = useState<ILessonContentData | undefined>(undefined)

	function dragStartHandler(e: BaseSyntheticEvent, content: ILessonContentData): void {
		setCurrentContent(content)
		setIsVisible(true)
	}
	function dragEndHandler(e: BaseSyntheticEvent): void {
		setIsVisible(false)
	}
	function dragLeaveHandler(e: BaseSyntheticEvent): void {
		e.target.style.background = 'none'
	}
	function dragOverHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
		e.target.style.background = 'var(--primary-color)'
	}
	function dragOverForDeleteHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
	}
	function dropHandler(e: BaseSyntheticEvent, content: ILessonContentData): void {
		e.preventDefault()
		e.target.style.background = 'none'
		if (currentContent) {
			const changedContent =
				contentData &&
				contentData.map((oldContent) => {
					if (oldContent.id === content.id) {
						return { ...oldContent, order: currentContent.order }
					}
					if (oldContent.id === currentContent.id) {
						return { ...oldContent, order: content.order }
					}
					return oldContent
				})
			console.log('changedContent', changedContent)

			changedContent && dispatch(lessonContentActions.change_sort_content(changedContent))
		}
	}

	function dropDeleteHandler(e: BaseSyntheticEvent) {
		e.preventDefault()
		setIsVisible(false)
		if (currentContent) {
			dispatch(lessonContentActions.delete_content(currentContent))
		}
	}

	if (editor === false) {
		return (
			<div className={cn(classes.LessonContentList, [styles])}>
				<List
					styles={classes.list}
					variation={'list'}
					items={data}
					renderItem={(content: ILessonContentData) => <div key={content.id}>{renderContent(content)}</div>}
				/>
			</div>
		)
	} else {
		return (
			<div className={cn(classes.LessonContentList, [styles])}>
				<DeleteZone
					onDragOver={(e) => dragOverForDeleteHandler(e)}
					onDrop={(e) => dropDeleteHandler(e)}
					isVisible={isVisible}
				/>
				<List
					variation={'list'}
					items={data}
					renderItem={(content: ILessonContentData) => (
						<div
							key={content.id}
							onDragStart={(e) => dragStartHandler(e, content)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDragEnd={(e) => dragEndHandler(e)}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dropHandler(e, content)}
							draggable={true}
							className={classes.drag_and_drop}
						>
							{renderContent(content)}
						</div>
					)}
				/>
			</div>
		)
	}
}

interface ILessonContentListProps {
	styles?: string
	data: ILessonContentData[] | ILessonContentData[]
	editor?: boolean
}
