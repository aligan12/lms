import { useTranslation } from 'react-i18next'

import classes from './Grade.module.scss'

import { classnames as cn } from 'shared/lib'
import { Htag } from 'shared/ui/Htag/Htag'

export const Grade = ({ styles }: IGradeProps) => {
	const { t } = useTranslation('home')
	return (
		<div className={cn(classes.Grade, [styles])}>
			<Htag tag={'small'}>4.1</Htag>

			<Htag tag={'very-small'}>{t('ball')}</Htag>
		</div>
	)
}

interface IGradeProps {
	styles?: string
}
