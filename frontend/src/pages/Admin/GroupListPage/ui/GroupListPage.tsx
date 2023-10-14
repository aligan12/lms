import classes from './GroupListPage.module.scss'

import { ListStudentsInGroup } from 'widgets/Student/ListStudentsInGroup'

import { BackButton } from 'features/BackButton'

import { IAboutCourseData } from 'entities/Course/types'
import { IAboutGroupData } from 'entities/Users/Student/types'

import { classnames as cn } from 'shared/lib'
import { Header, Htag, List } from 'shared/ui'

const GroupListPage = ({ styles }: IGroupListPageProps) => {
	const data: IAboutGroupData[] = [
		{
			group_number: 1,
			end_date: '01.01.2024',
			start_date: '01.01.2023',
			course: 1,
		},
		{
			group_number: 2,
			end_date: '01.01.2024',
			start_date: '01.01.2023',
			course: 1,
		},
		{
			group_number: 3,
			end_date: '01.01.2024',
			start_date: '01.01.2023',
			course: 1,
		},
		{
			group_number: 4,
			end_date: '01.01.2024',
			start_date: '01.01.2023',
			course: 1,
		},
	]

	const courseData: IAboutCourseData = {
		id: 1,
		description: '',
		image: 'asdfsd',
		price: 1,
		title: 'Название Курса',
	}

	return (
		<div className={cn(classes.GroupListPage, [styles])}>
			<BackButton />
			<div>
				<Header
					line={false}
					title={courseData.title}
				/>
				{/* <List
					items={data}
					variation={'list'}
					renderItem={(group: IAboutGroupData) => (
						<ListStudentsInGroup groupData={group} />
					)}
				/> */}
				<ListStudentsInGroup />
			</div>
		</div>
	)
}

export default GroupListPage

interface IGroupListPageProps {
	styles?: string
}
