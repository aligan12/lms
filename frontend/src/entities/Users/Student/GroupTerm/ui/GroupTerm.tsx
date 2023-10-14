import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './GroupTerm.module.scss'

import { IAboutGroupData } from 'entities/Users/Student/types'

import { classnames as cn } from 'shared/lib'
import { AccordionButton, CircleForIcon, Htag, Icon, Tag } from 'shared/ui'
import { ListItem } from 'shared/ui/ListItem/ListItem'

export const GroupTerm = ({ styles, data }: IGroupTermProps) => {
	const { t } = useTranslation('admin')
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={cn(classes.GroupTerm, [styles])}
		>
			<ListItem
				styles={classes.wrapper}
				hover={'none'}
				variation={'inverted-secondary'}
				mid_up={
					<Htag tag={'very-small'}>
						{data.start_date} - {data.end_date}
					</Htag>
				}
				mid_down={
					<div className={classes.tags}>
						<Tag
							size="small"
							variation={'primary'}
						></Tag>
						<Tag
							size="small"
							variation={'clear'}
						></Tag>
					</div>
				}
				right={
					<div className={classes.buttons}>
						<AccordionButton isOpen={isOpen} />
					</div>
				}
			>
				<Htag
					styles={classes.title}
					tag={'medium'}
				>
					{t('gruppa')} №{data.group_number}
				</Htag>
			</ListItem>
		</div>
	)
}

interface IGroupTermProps {
	data: IAboutGroupData
	styles?: string
}
