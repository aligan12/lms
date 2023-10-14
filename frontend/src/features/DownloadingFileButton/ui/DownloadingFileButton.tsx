import classes from './DownloadingFileButton.module.scss'

import { IAdditionData } from 'entities/Lesson/types'

import { Button, Icon } from 'shared/ui'

export const DownloadingFileButton = ({ styles, file, title }: IDownloadingFileButtonProps) => {
	return (
		<a
			className={classes.link}
			href={file}
		>
			<Button
				format={'small'}
				styles={[styles, classes.button].join(' ')}
			>
				{title}
				<Icon
					variation={'secondary'}
					icon={'file'}
				/>
			</Button>
		</a>
	)
}

interface IDownloadingFileButtonProps {
	styles?: string
	file: string
	title: string
}
