import { useSelector } from 'react-redux'

import classes from './CreateLessonAdditionList.module.scss'

import { getAdditionsData } from 'features/Lesson/CreateLessonAdditionForm'

import { IAdditionData } from 'entities/Lesson/types'

import { classnames as cn } from 'shared/lib'
import { Icon, List, ListItem } from 'shared/ui'

export const CreateLessonAdditionList = ({ styles }: ICreateLessonAdditionListProps) => {
	const additionsData = useSelector(getAdditionsData)

	return (
		<div className={cn(classes.CreateLessonAdditionList, [styles])}>
			{additionsData && (
				<List
					variation={'list'}
					items={additionsData}
					renderItem={(addition: IAdditionData) => (
						<div className={classes.list_item}>
							<ListItem
								styles={classes.item}
								key={addition.id}
								variation={'clear'}
								hover={'hover_inverted-secondary'}
								right={<Icon icon={'file'} />}
							>
								{addition.title}
							</ListItem>
						</div>
					)}
				/>
			)}
		</div>
	)
}

interface ICreateLessonAdditionListProps {
	styles?: string
}
