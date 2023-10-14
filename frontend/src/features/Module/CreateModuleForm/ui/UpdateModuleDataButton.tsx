import { useSelector } from 'react-redux'

import { updateModuleRequest } from '../services/UpdateModuleRequest'

import {
	getChangedListModule,
	getChangedModule,
	getEditModuleTrashList,
	getEditModuleTrashModule,
} from 'features/Module/EditModuleList'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button } from 'shared/ui'

export const UpdateModuleDataButton = ({ styles }: IUpdateModuleDataButtonProps) => {
	const dispatch = useAppDispatch()
	const trash_listModule = useSelector(getEditModuleTrashList)
	const changed_listModule = useSelector(getChangedListModule)
	const changed_module = useSelector(getChangedModule)
	const trash_module = useSelector(getEditModuleTrashModule)

	const handleClick = () => {
		if (trash_listModule && changed_listModule && changed_module && trash_module) {
			dispatch(updateModuleRequest({ trash_listModule, changed_listModule, changed_module, trash_module }))
		}
	}

	return (
		<Button
			onClick={() => handleClick()}
			styles={cn('', [styles])}
		>
			Сохранить изменения
		</Button>
	)
}

interface IUpdateModuleDataButtonProps {
	styles?: string
}
