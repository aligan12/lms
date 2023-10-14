import { BaseSyntheticEvent } from 'react'
import { useSelector } from 'react-redux'

import classes from './ModuleTrashList.module.scss'

import { getEditModuleTrashList } from 'features/Module/EditModuleList'
import { editModuleSliceActions } from 'features/Module/EditModuleList/models/slice/EditModuleSlice'

import { IListModule } from 'entities/Module/types'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { DragAndDropDiv, Htag, Icon, List, ListItem } from 'shared/ui'

export const ModuleTrashList = ({ styles }: IModuleTrashListProps) => {
	const trashData = useSelector(getEditModuleTrashList)
	const dispatch = useAppDispatch()
	const startHandler = (e: BaseSyntheticEvent, content: IListModule) => {
		dispatch(editModuleSliceActions.set_current_id('module_id'))
		dispatch(editModuleSliceActions.set_trash_current(content))
	}

	console.log('trashData', trashData)
	return (
		<div className={cn(classes.ModuleTrashList, [styles])}>
			<div className={classes.header}>
				<Htag tag="medium">Корзина </Htag> <Icon icon={'trash'} />
			</div>
			<div className={classes.trashItems}>
				{trashData && (
					<List
						styles={classes.list}
						variation={'list'}
						items={trashData}
						renderItem={(item: IListModule) => (
							<DragAndDropDiv
								startHandler={startHandler}
								item={item}
								childrenId={classes.item}
							>
								<ListItem
									styles={classes.item}
									key={item.id}
									variation="clear"
									hover="none"
								>
									{item.lecture_id && item.lecture_id.title}
								</ListItem>
							</DragAndDropDiv>
						)}
					/>
				)}
			</div>
		</div>
	)
}

interface IModuleTrashListProps {
	styles?: string
}
