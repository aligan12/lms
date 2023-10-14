import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classes from './ProfileStudentInfo.module.scss'

import { getUserInfo } from 'entities/Users/CustomUser'

import { classnames as cn } from 'shared/lib'
import { Button, Header, Htag, Icon, TextBox } from 'shared/ui'

export const ProfileStudentInfo = ({ styles }: IProfileStudentInfoProps) => {
	const { t } = useTranslation('')
	const studentInfo = useSelector(getUserInfo)
	console.log(studentInfo)
	return (
		<div className={cn(classes.ProfileStudentInfo, [styles])}>
			<div className={classes.information}>
				<Htag tag={'medium'}>
					{t('pol')} {studentInfo.sex}
				</Htag>
				<Htag tag={'medium'}>
					{t('vozrast')} {studentInfo.age}
				</Htag>
				<Htag tag={'medium'}>
					{t('strana')} {studentInfo.country}
				</Htag>
				<Htag tag={'medium'}>
					{t('universitet')} {studentInfo.university}
				</Htag>
				<Htag tag={'medium'}>{t('o-sebe')}</Htag>
				{studentInfo.about && (
					<TextBox
						size={'medium'}
						styles={classes.about_box}
					>
						{studentInfo.about}
					</TextBox>
				)}
			</div>
		</div>
	)
}

interface IProfileStudentInfoProps {
	styles?: string
}
