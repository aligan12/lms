import { useTranslation } from 'react-i18next'

import classes from './CourseMiniCard.module.scss'

import { IAboutCourseData } from 'entities/Course/types'

import { classnames as cn } from 'shared/lib'
import { Icon } from 'shared/ui'
import { Htag } from 'shared/ui'
import { TextBox } from 'shared/ui'

export const CourseMiniCard = ({ styles, data }: ICourseMiniCardProps) => {
	const { t } = useTranslation('course')
	return (
		<div className={cn(classes.mini_card, [styles])}>
			<div className={classes.image_wrapper}>
				<img
					className={classes.image}
					src={data.image}
				/>
			</div>

			<div className={classes.tegs}>
				<div className={cn(classes.first_teg, [classes.teg])}>
					<Icon
						icon={'clock'}
						cursor="cursor_none"
					/>
					<Htag tag={'very-small'}>2 {t('mesyaca')}</Htag>
				</div>
				<div className={cn(classes.second_teg, [classes.teg])}>
					<Icon
						icon={'video'}
						cursor="cursor_none"
					/>
					<Htag tag={'very-small'}>16 {t('urokov')}</Htag>
				</div>
				<div className={cn(classes.third_teg, [classes.teg])}>
					<Icon
						icon={'file'}
						cursor="cursor_none"
					/>
					<Htag tag={'very-small'}>24 {t('materiala')}</Htag>
				</div>
			</div>

			<TextBox size={'medium'}>{data.price + `${t(' tg')}`} </TextBox>
		</div>
	)
}

interface ICourseMiniCardProps {
	styles?: string
	data: IAboutCourseData
}
