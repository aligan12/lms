import { useTranslation } from 'react-i18next'

import classes from './NotFoundPage.module.scss'

import { classnames as cn } from 'shared/lib'

export const NotFoundPage = ({ style }: INotFoundProps) => {
	const { t } = useTranslation()
	return (
		<div className={cn(classes.NotFound, [style])}>
			<h1>{t('stranica-ne-naidena')}</h1>
		</div>
	)
}

interface INotFoundProps {
	style?: string
}
