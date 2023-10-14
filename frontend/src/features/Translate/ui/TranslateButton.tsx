import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './TranslateButton.module.scss'

import { LanguageCard } from 'entities/LanguageCard'

import { Icon } from 'shared/ui'

export const TranslateButton = () => {
	const [language, setLanguage] = useState<'ru' | 'en' | 'kz'>('ru')
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { i18n } = useTranslation()
	console.log(language)
	const toggle = async () => {
		await i18n.changeLanguage(language)
	}
	useEffect(() => {
		toggle()
	}, [language])
	return (
		<>
			<Icon
				icon={'language'}
				data-testid="TEST"
				onClick={() => setIsOpen(!isOpen)}
			/>
			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className={classes.language}
				>
					<LanguageCard setLanguage={setLanguage} />
				</div>
			)}
		</>
	)
}
