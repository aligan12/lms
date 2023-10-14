import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { useListModuleFindId } from '../lib/useListModuleFindId'
import { CreateAttendanceRequest } from '../services/CreateAttendanceRequest'
import classes from './CreateAttendanceButton.module.scss'

import { ERoutePath, IABOUT_COURSE_Params, ILESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { useLastAttendance } from 'entities/Grade'
import { getUserInfo } from 'entities/Users/CustomUser'

import { classnames as cn, setParamsInPath, useAppDispatch } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

export const CreateAttendanceButton = ({ styles }: ICreateAttendanceButtonProps) => {
	const dispatch = useAppDispatch()

	const { course_id, module_index, list_module_id } = useParams<ILESSON_Params>()
	const { lastAttendance } = useLastAttendance(Number(module_index))
	const nextAndPrevious = useListModuleFindId(Number(module_index), Number(list_module_id))
	const navigate = useNavigate()
	const renderNavigate = () => {
		if (nextAndPrevious?.next) {
			navigate(
				setParamsInPath<ILESSON_Params>(ERoutePath.LESSON, {
					course_id: String(course_id),
					list_module_id: String(nextAndPrevious.next.id),
					module_index: String(module_index),
				}),
			)
		} else {
			navigate(
				setParamsInPath<IABOUT_COURSE_Params>(ERoutePath.ABOUT_COURSE, {
					course_id: String(course_id),
				}),
			)
		}
	}
	console.log('nextAndPrevious', nextAndPrevious)
	const handleClick = () => {
		if (course_id && list_module_id) {
			if (lastAttendance?.list_modules.id === Number(list_module_id) || lastAttendance === null) {
				dispatch(
					CreateAttendanceRequest({
						course: Number(course_id),
						attendance: true,
						list_modules: Number(list_module_id),
						navigate: renderNavigate,
						module_index: Number(module_index),
					}),
				)
			} else {
				renderNavigate()
			}
		}
	}

	return (
		<div className={cn(classes.CreateAttendanceButton, [styles])}>
			<Button onClick={handleClick}>
				{nextAndPrevious?.next ? (
					<>
						Следующий
						<Icon
							icon="right"
							variation="white"
						/>
					</>
				) : (
					'Завершить модуль'
				)}
			</Button>
		</div>
	)
}

interface ICreateAttendanceButtonProps {
	styles?: string
}
