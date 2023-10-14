import { useNavigate, useParams } from 'react-router-dom'

import classes from './PreviousButton.module.scss'

import { ERoutePath, ILESSON_Params } from 'app/providers/AppRouters/config/routeConfig'

import { useListModuleFindId } from 'features/Lesson/CreateAttendanceButton'

import { classnames as cn, setParamsInPath } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

export const PreviousButton = ({ styles }: IPreviousButtonProps) => {
	const { course_id, module_index, list_module_id } = useParams<ILESSON_Params>()
	const navigate = useNavigate()
	const nextAndPrevious = useListModuleFindId(Number(module_index), Number(list_module_id))
	const handleClick = () => {
		if (nextAndPrevious?.previous) {
			navigate(
				setParamsInPath<ILESSON_Params>(ERoutePath.LESSON, {
					course_id: String(course_id),
					list_module_id: String(nextAndPrevious?.previous.id),
					module_index: String(module_index),
				}),
			)
		}
	}
	return (
		<div className={cn(classes.PreviousButton, [styles])}>
			{nextAndPrevious?.previous && (
				<Button onClick={handleClick}>
					<Icon
						icon="left"
						variation="white"
					/>
					Предыдущий
				</Button>
			)}
		</div>
	)
}

interface IPreviousButtonProps {
	styles?: string
}
