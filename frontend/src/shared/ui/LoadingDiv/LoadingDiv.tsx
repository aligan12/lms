import { Loader } from '../Loader/Loader'
import classes from './LoadingDiv.module.scss'

import { classnames as cn } from 'shared/lib'

export const LoadingDiv = ({ styles }: ILoadingDivProps) => {
	return (
		<div className={cn(classes.LoadingDiv, [styles])}>
			<Loader
				width={20}
				height={20}
			/>
		</div>
	)
}

interface ILoadingDivProps {
	styles?: string
}
