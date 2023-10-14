import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { IFullStudentData } from '../../types/Student/Student.type'
import classes from './AboutStudentList.module.scss'

import { Avatar } from 'entities/Avatar'
import { StarsGroup } from 'entities/StarsGroup'
import { IColumnNames, IStudentAboutData } from 'entities/Users/Student/types'

import { classnames as cn } from 'shared/lib'
import { Button, Htag, Icon } from 'shared/ui'

export const AboutStudentList = ({ styles, data, isColumnNames, link }: IAboutStudentListProps) => {
	const { t } = useTranslation('admin')

	const columnNames: IColumnNames = {
		student: {
			id: 1,
			email: 'Email',
			is_active: 'Статус',
		},
		phone: 'Телефон',
		avatar: null,
		name: 'Имя',
		surname: '',
		patronymic: '',
		grade: 'Оценка',
	}

	if (isColumnNames) {
		return (
			<div className={cn(classes.AboutStudentList, [styles])}>
				<div></div>
				<Htag tag={'small'}>{columnNames.student.email}</Htag>
				<Htag tag={'small'}>{columnNames.surname}</Htag>
				<Htag tag={'small'}>{columnNames.phone}</Htag>
				<Htag tag={'small'}>{columnNames.student.is_active}</Htag>
				<Htag tag={'small'}>{columnNames.grade}</Htag>
				<div></div>
			</div>
		)
	}

	return (
		<div className={cn(classes.AboutStudentList, [styles])}>
			<Avatar
				image={data?.avatar}
				size="small"
			/>
			<Htag tag={'small'}>{data?.student.email}</Htag>
			<Htag tag={'small'}>{`${data?.surname} ${data?.name} ${data?.patronymic}`}</Htag>
			<Htag tag={'small'}>{data?.phone}</Htag>
			<Htag tag={'small'}>{data?.student.is_active && t('aktivnyi')}</Htag>
			{/* <div>
				{data?.grade && (
					<StarsGroup
						rating={data?.grade}
						changeable={false}
					/>
				)}
			</div> */}
			{link && (
				<Link to={link}>
					<Button
						variation="primary"
						styles={classes.button}
						format={'small'}
					>
						{t('pereiti-0')}
						<Icon
							variation={'secondary'}
							icon={'link'}
						/>
					</Button>
				</Link>
			)}
		</div>
	)
}

interface IAboutStudentListProps {
	link?: string
	styles?: string
	data?: IStudentAboutData
	isColumnNames?: boolean
}
