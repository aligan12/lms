import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import classes from './TeacherRoomPage.module.scss'

import { ERoutePath, IABOUT_COURSE_Params } from 'app/providers/AppRouters'
import {
	IALL_TASK_Params,
	IGROUP_LIST_Params,
	ITASK_VIEW_ANSWER_Params,
} from 'app/providers/AppRouters/config/routeConfig'

import { CourseCard } from 'entities/Course/CourseCard'
import { getListCourseData, listCourseRequest } from 'entities/Course/CourseData'
import { IAboutCourseData } from 'entities/Course/types'

import { classnames as cn, deleteRouteId, setParamsInPath, useAppDispatch } from 'shared/lib'
import { Button, CircleForIcon, Header, Htag, Icon, List } from 'shared/ui'

export const TeacherRoomPage = ({ styles }: ITeacherRoomPageProps) => {
	const { t } = useTranslation('admin')
	const dispatch = useAppDispatch()
	const data = useSelector(getListCourseData)
	useEffect(() => {
		dispatch(listCourseRequest())
	}, [])
	// const data = [
	// 	{
	// 		id: 1,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 100000,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 1200000,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 1200000,
	// 	},
	// 	{
	// 		id: 1,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 100000,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Python-разработчик с нуля  ',
	// 		description: 'Разработчик на Python создает сайты и приложения, которыми вы пользуетесь каждый день.',
	// 		price: 1200000,
	// 	},
	// ]
	return (
		<div className={cn(classes.TeacherRoomPage, [styles])}>
			<div className={classes.course_card}>
				<div className={classes.title}>
					<Header
						title={'Админ панель'}
						line={false}
						buttons={
							<Link to={ERoutePath.CREATE_COURSE}>
								<Button
									variation="primary"
									styles={classes.button}
									format={'small'}
								>
									{t('dobavit-kurs')}
								</Button>
							</Link>
						}
					/>
				</div>
				{data && (
					<List
						items={data}
						variation={'card'}
						renderItem={(info: IAboutCourseData) => (
							<div className={classes.card_wrapper}>
								<Link
									className={classes.edit_button}
									to={deleteRouteId(ERoutePath.EDIT_COURSE) + info.id}
								>
									<CircleForIcon
										fill={'primary'}
										variation={'primary'}
										styles={classes.circle}
									>
										<Icon
											variation={'white'}
											icon={'edit'}
										/>
									</CircleForIcon>
								</Link>

								<CourseCard
									key={info.id}
									data={info}
									price_view={false}
									buttons={
										<>
											<Link
												to={setParamsInPath<IGROUP_LIST_Params>(ERoutePath.GROUP_LIST, {
													course_id: String(info.id),
												})}
											>
												<Button
													variation="clear"
													styles={classes.button}
													format={'small'}
												>
													{t('gruppy')}
													<Icon
														variation={'primary'}
														icon={'link'}
													/>
												</Button>
											</Link>
											<Link
												to={setParamsInPath<IALL_TASK_Params>(ERoutePath.ALL_TASK_OF_COURSE, {
													course_id: String(info.id),
												})}
											>
												<Button
													variation="clear"
													styles={classes.button}
													format={'small'}
												>
													Задания
													<Icon
														variation={'primary'}
														icon={'link'}
													/>
												</Button>
											</Link>
										</>
									}
								/>
							</div>
						)}
					/>
				)}
			</div>
		</div>
	)
}
export default TeacherRoomPage

interface ITeacherRoomPageProps {
	styles?: string
}
