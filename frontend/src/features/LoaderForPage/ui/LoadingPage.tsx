/* eslint-disable i18next/no-literal-string */
import classes from './LoadingPage.module.scss'

import { classnames as cn } from 'shared/lib'
import { Htag, Loader } from 'shared/ui'

export const LoadingPage = ({ styles }: ILoadingPageProps) => {
	return (
		<div className={cn(classes.LoadingPage, [styles])}>
			<h1>Loading</h1>
			<Loader
				width={20}
				height={20}
			/>
		</div>
	)
}

interface ILoadingPageProps {
	styles?: string
}
