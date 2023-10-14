import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { IAboutTicketData } from '../../../../entities/Ticket/types/Ticket.types'
import classes from './TicketList.module.scss'

import { ERoutePath, ILAST_ID_Params } from 'app/providers/AppRouters'

import { TicketItem } from 'entities/Ticket/TicketItem'
import {
	getTicketStudentData,
	listTicketStudentReducer,
	listTicketStudentRequest,
} from 'entities/Ticket/TicketStudentData'
import { getUserInfo, getUserType } from 'entities/Users/CustomUser'

import { DynamicModuleLoader, classnames as cn, setParamsInPath, useAppDispatch } from 'shared/lib'
import { List } from 'shared/ui'

export const TicketList = ({ styles }: ITicketListProps) => {
	// const data = [
	// 	{
	// 		id: 1,
	// 		date: '01.01.2023',
	// 		title: 'Не отправляется ДЗ',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: 2,
	// 		date: '01.01.2023',
	// 		title: 'Я ничего не понимаю =(',
	// 		completed: true,
	// 	},
	// 	{
	// 		id: 3,
	// 		date: '01.01.2023',
	// 		title: 'У меня нет задания ',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: 4,
	// 		date: '01.01.2023',
	// 		title: 'Материал не открывается',
	// 		completed: false,
	// 	},
	// ]
	const dispatch = useAppDispatch()
	const user = useSelector(getUserInfo)
	const userType = useSelector(getUserType)
	const tiketsList = useSelector(getTicketStudentData)
	useEffect(() => {
		if (userType === 'student') {
			user.student && dispatch(listTicketStudentRequest({ studentId: user.student, type: 'one' }))
		} else if (userType === 'admin' || userType === 'super-admin') {
			dispatch(listTicketStudentRequest({ type: 'all' }))
		}
	}, [])
	return (
		<DynamicModuleLoader
			reducer={listTicketStudentReducer}
			reducerKey={'listTicketStudent'}
		>
			{tiketsList && (
				<div className={cn(classes.TicketList, [styles])}>
					<List
						items={tiketsList}
						renderItem={(info: IAboutTicketData) => (
							<>
								{userType === 'student' && (
									<Link
										to={setParamsInPath<ILAST_ID_Params>(ERoutePath.ABOUT_TICKET, {
											id: String(info.id),
										})}
									>
										<TicketItem
											key={info.id}
											data={info}
										/>
									</Link>
								)}
								{(userType === 'admin' || userType === 'super-admin') && (
									<>
										{!info.completed && (
											<Link
												to={setParamsInPath<ILAST_ID_Params>(ERoutePath.CREATE_TICKET_ANSWER, {
													id: String(info.id),
												})}
											>
												<TicketItem
													key={info.id}
													data={info}
												/>
											</Link>
										)}
									</>
								)}
							</>
						)}
						variation={'list'}
					/>
				</div>
			)}
		</DynamicModuleLoader>
	)
}

interface ITicketListProps {
	styles?: string
}
