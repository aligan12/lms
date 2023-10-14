import { useTranslation } from 'react-i18next'

import classes from './AfterRegistrationPage.module.scss'

import { classnames as cn } from 'shared/lib'
import { Htag } from 'shared/ui'

export const AfterRegistrationPage = ({ styles }: IAfterRegistrationPageProps) => {
	const { t } = useTranslation('admin')

	return (
		<div className={cn(classes.AfterRegistrationPage, [styles])}>
			<div className={classes.text}>
				<Htag tag={'very-large'}>
					{t('dlya-zaversheniya-registracii-aktiviruite-akkaunt')}
				</Htag>
				<Htag
					tag={'large'}
					styles={classes.small_text}
				>
					{t('na-vashu-pochtu-otpravleno-pismo')}
				</Htag>
			</div>
			<div className={classes.bottom}></div>
		</div>
	)
}
export default AfterRegistrationPage

interface IAfterRegistrationPageProps {
	styles?: string
}
