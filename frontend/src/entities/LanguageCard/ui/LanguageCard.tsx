import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './LanguageCard.module.scss'

import { classnames as cn } from 'shared/lib'
import { ListItem } from 'shared/ui'

export const LanguageCard = ({ styles, setLanguage }: ILanguageCardProps) => {
	const { t } = useTranslation()
	return (
		<div className={cn(classes.LanguageCard, [styles])}>
			<ListItem
				hover={'hover_inverted-secondary'}
				variation={'clear'}
				styles={classes.butn}
				onClick={() => setLanguage('ru')}
			>
				{t('russkii')}
			</ListItem>
			<ListItem
				hover={'hover_inverted-secondary'}
				variation={'clear'}
				styles={classes.butn}
				onClick={() => setLanguage('kz')}
			>
				{t('kazakhskii')}
			</ListItem>
			<ListItem
				hover={'hover_inverted-secondary'}
				variation={'clear'}
				styles={classes.butn}
				onClick={() => setLanguage('en')}
			>
				{t('angliiskii')}
			</ListItem>
		</div>
	)
}

interface ILanguageCardProps {
	styles?: string
	setLanguage: Dispatch<SetStateAction<'ru' | 'en' | 'kz'>>
}
