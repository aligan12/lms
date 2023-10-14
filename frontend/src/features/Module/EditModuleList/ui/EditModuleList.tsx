import {
	BaseSyntheticEvent,
	DetailedHTMLProps,
	Dispatch,
	HtmlHTMLAttributes,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { EditModuleCurrentId } from '../const/currentId/dragAndDropCurrentId'
import { getEditModuleCurrentId } from '../models/selectors/getEditModuleCurrentId'
import { getEditModuleTrashCurrent } from '../models/selectors/getEditModuleTrashCurrent'
import { editModuleSliceActions, editModuleSliceReducer } from '../models/slice/EditModuleSlice'
import classes from './EditModuleList.module.scss'

import {
	ERoutePath,
	ICREATE_LESSON_Params,
	ICREATE_MODULE_Params,
	IEDIT_LESSON_Params,
	ILAST_ID_Params,
} from 'app/providers/AppRouters'
import { ICREATE_TASK_Params, ILESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { LessonListItem } from 'entities/Lesson/LessonListItem'
import { ModuleListItem } from 'entities/Module/ModuleListItem'
import { IListModule, IModuleData, instanceOfIModuleData, instanceOfListModule } from 'entities/Module/types'

import {
	DynamicModuleLoader,
	classnames as cn,
	setParamsInPath,
	swapOrderForDragAndDrop,
	useAppDispatch,
	useDragAndDropOrdering,
} from 'shared/lib'
import { AnimatedButton, Button, DeleteZone, DragAndDropDiv, Htag, Icon, List } from 'shared/ui'
import { AccordionWrapper } from 'shared/ui'

export const EditModuleList = ({
	styles,
	module,

	setCurrentContent,
	currentContent,
	moduledata,
	moduleIndex,
}: IEditModuleListProps) => {
	const dispatch = useAppDispatch()
	const currentId = useSelector(getEditModuleCurrentId)
	const lesson_id = EditModuleCurrentId.LISTMODULE_id
	const module_id = EditModuleCurrentId.MODULE_ID

	const [isVisible, setIsVisible] = useState(false)
	const trashCurrent = useSelector(getEditModuleTrashCurrent)

	function lessonDropHandler(e: BaseSyntheticEvent, content: IListModule): void {
		if (instanceOfListModule(currentContent)) {
			const { status, changedContent, changedItems } = swapOrderForDragAndDrop<IListModule>(
				module.list_modules,
				content,
				currentContent,
			)

			status &&
				dispatch(
					editModuleSliceActions.change_listModule({
						changedContent: changedContent,
						listModule: changedItems,
						module_index: moduleIndex,
					}),
				)
		}
	}

	function lessonStartHandler(e: BaseSyntheticEvent, content: IListModule): void {
		console.log(content)
		dispatch(editModuleSliceActions.set_current_id('listModule_id'))
		setCurrentContent && setCurrentContent(content)
	}

	function moduleDropHandler(e: BaseSyntheticEvent, content: IModuleData): void {
		console.log('step2')
		if (trashCurrent) {
			dispatch(editModuleSliceActions.remove_trash_current({ module_index: moduleIndex }))
		} else if (moduledata) {
			if (instanceOfIModuleData(currentContent)) {
				const { status, changedContent, changedItems } = swapOrderForDragAndDrop<IModuleData>(
					moduledata,
					content,
					currentContent,
				)
				status &&
					dispatch(
						editModuleSliceActions.change_module({ changedContent: changedContent, module: changedItems }),
					)
			}
		}
	}
	const lessonDrag = useDragAndDropOrdering<IListModule>({
		currentId: currentId,
		drop: lessonDropHandler,
		start: lessonStartHandler,
		setIsVisible,
	})

	function moduleStartHandler(e: BaseSyntheticEvent, content: IModuleData): void {
		console.log(content)
		dispatch(editModuleSliceActions.set_current_id('module_id'))
		setCurrentContent && setCurrentContent(content)
	}
	const modelDrag = useDragAndDropOrdering({
		currentId: currentId,
		drop: moduleDropHandler,
		start: moduleStartHandler,
		setIsVisible,
	})

	function dragOverForDeleteHandler(e: BaseSyntheticEvent): void {
		e.preventDefault()
	}

	function dropDeleteHandler(e: BaseSyntheticEvent) {
		e.preventDefault()
		setIsVisible(false)
		if (currentContent) {
			if (currentId === lesson_id) {
				console.log('Deleted lesson')
				dispatch(
					editModuleSliceActions.delete_lesson({
						list_modules_id: currentContent.id,
						moduleIndex: moduleIndex,
					}),
				)
			} else if (currentId === module_id) {
				console.log('Deleted module')
				dispatch(editModuleSliceActions.delete_module({ moduleIndex: moduleIndex }))
			}
		}
	}

	return (
		<div
			className={cn(classes.EditModuleList, [styles])}
			key={module.id}
		>
			<DeleteZone
				onDragOver={(e) => dragOverForDeleteHandler(e)}
				onDrop={(e) => dropDeleteHandler(e)}
				isVisible={isVisible}
			/>
			<AccordionWrapper
				main={
					<DragAndDropDiv
						dropHandler={modelDrag.dropHandler}
						endHandler={modelDrag.endHandler}
						leaveHandler={modelDrag.leaveHandler}
						overHandler={modelDrag.overHandler}
						startHandler={modelDrag.startHandler}
						childrenId={module_id}
						item={module}
					>
						<ModuleListItem data={module} />
					</DragAndDropDiv>
				}
				renderItems={
					<>
						<List
							styles={classes.lesson_list}
							items={module.list_modules}
							variation={'list'}
							renderItem={(data: IListModule) => (
								<div
									key={data.id}
									className={classes.list_wrapper}
								>
									<DragAndDropDiv
										dropHandler={lessonDrag.dropHandler}
										endHandler={lessonDrag.endHandler}
										leaveHandler={lessonDrag.leaveHandler}
										overHandler={lessonDrag.overHandler}
										startHandler={lessonDrag.startHandler}
										childrenId={lesson_id}
										item={data}
									>
										<LessonListItem
											moduleIndex={moduleIndex}
											hasButton={false}
											data={data}
											key={data.id}
											disabled={true}
										/>
									</DragAndDropDiv>
									<div className={classes.buttons}>
										<Link
											to={setParamsInPath<ILESSON_Params>(ERoutePath.LESSON, {
												module_index: String(moduleIndex),
												list_module_id: String(data.id),
												course_id: String(module.course),
											})}
										>
											<AnimatedButton
												variation="clear"
												icon={'right'}
											>
												Пререйти
											</AnimatedButton>
										</Link>
										<Link
											to={setParamsInPath<IEDIT_LESSON_Params>(ERoutePath.EDIT_LESSON, {
												list_module_id: String(data.id),
												module_id: String(module.id),
											})}
										>
											<AnimatedButton
												variation="clear"
												icon={'edit'}
											>
												Редактировать
											</AnimatedButton>
										</Link>
									</div>
								</div>
							)}
						/>
						<div className={classes.add_buttons}>
							<Htag tag={'medium'}>Добавить :</Htag>
							<Link
								to={setParamsInPath<ICREATE_LESSON_Params>(ERoutePath.CREATE_LESSON, {
									module_id: String(module.id),
									course_id: String(module.course),
								})}
							>
								<Button format={'small'}>
									Лекцию
									<Icon
										variation={'secondary'}
										icon={'plus'}
									/>
								</Button>
							</Link>
							<Link
								to={setParamsInPath<ICREATE_TASK_Params>(ERoutePath.CREATE_TASK, {
									course_id: String(module.course),
									module_id: String(module.id),
								})}
							>
								<Button format={'small'}>
									Задание
									<Icon
										variation={'secondary'}
										icon={'plus'}
									/>
								</Button>
							</Link>

							<Button format={'small'}>
								Тест
								<Icon
									variation={'secondary'}
									icon={'plus'}
								/>
							</Button>
						</div>
					</>
				}
			/>
		</div>
	)
}

interface IEditModuleListProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	module: IModuleData
	currentId?: string
	moduledata?: IModuleData[]
	setCurrentId?: Dispatch<SetStateAction<string | undefined>>
	setCurrentContent?: Dispatch<SetStateAction<IModuleData | IListModule | undefined>>
	currentContent?: IModuleData | IListModule | undefined
	moduleIndex: number
	DataOrdering?: <T extends { id?: number | undefined; order?: number | undefined }>(
		contentData: T[],
		content: T,
	) => void
}
