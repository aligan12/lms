import './Loader.scss'

import { classnames as cn } from 'shared/lib'

export const Loader = ({ style, width = 13, height = 13 }: ILoaderProps) => {
	return (
		<div className={cn('lds-ellipsis', [style])}>
			<div style={{ width: width, height: height }}></div>
			<div style={{ width: width, height: height }}></div>
			<div style={{ width: width, height: height }}></div>
			<div style={{ width: width, height: height }}></div>
		</div>
	)
}

interface ILoaderProps {
	style?: string
	width?: number
	height?: number
}
