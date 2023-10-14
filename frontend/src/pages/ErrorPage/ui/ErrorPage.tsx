import { useTranslation } from 'react-i18next'

import classes from './ErrorPage.module.scss'

import { classnames as cn } from 'shared/lib'
import { Button } from 'shared/ui/'

export const ErrorPage = ({ style }: IErrorPageProps) => {
	const { t } = useTranslation()
	const reloadPage = () => {
		location.reload()
	}
	return (
		<div className={cn(classes.ErrorPage, [style])}>
			<h1>{t('proizoshla-nepredvidennaya-oshibka')}</h1>
			<Button onClick={() => reloadPage()}>{t('obnovit-stranicu')}</Button>
		</div>
	)
}

interface IErrorPageProps {
	style?: string
}
