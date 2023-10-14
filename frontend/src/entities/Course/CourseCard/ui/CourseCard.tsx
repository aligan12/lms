import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classes from './CourseCard.module.scss'

import { ERoutePath, IABOUT_COURSE_Params } from 'app/providers/AppRouters'

import { IAboutCourseData } from 'entities/Course/types'

import { classnames as cn, deleteRouteId, setParamsInPath } from 'shared/lib'
import { Button, Icon } from 'shared/ui'
import { Htag } from 'shared/ui'
import { TextBox } from 'shared/ui'

export const CourseCard = ({ styles, data, buttons, price_view = true, link = true }: ICourseCardProps) => {
	const { t } = useTranslation()
	return (
		<div className={cn(classes.Card, [styles])}>
			{link ? (
				<Link
					className={classes.link}
					to={setParamsInPath<IABOUT_COURSE_Params>(ERoutePath.ABOUT_COURSE, {
						course_id: String(data.id),
					})}
				>
					<div className={classes.image}>
						<img
							className={classes.image}
							src={data.image}
							alt={data.title}
						/>
					</div>
				</Link>
			) : (
				<div className={classes.image}>
					<img
						className={classes.image}
						src={data.image}
						alt={data.title}
					/>
				</div>
			)}

			<div className={classes.title}>
				<Htag tag={'medium'}>{data.title}</Htag>
			</div>

			<TextBox size={'small'}>{data.description}</TextBox>

			<TextBox size={'medium'}>{price_view ? data.price + ' тг' : ''} </TextBox>

			{buttons && (
				<div className={classes.wrapper_button}>
					<div className={classes.button}>{buttons}</div>
				</div>
			)}
		</div>
	)
}

interface ICourseCardProps {
	styles?: string
	data: IAboutCourseData
	buttons?: ReactNode
	price_view?: boolean
	link?: boolean
}
