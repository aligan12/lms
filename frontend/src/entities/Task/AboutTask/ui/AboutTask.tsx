import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classes from './AboutTask.module.scss'

import { DownloadingFileButton } from 'features/DownloadingFileButton'

import { getTaskData } from 'entities/Task/TaskData'

import { classnames as cn } from 'shared/lib'
import { Button, Header, Htag, Icon } from 'shared/ui'

export const AboutTask = ({ styles }: IAboutTaskProps) => {
	const taskData = useSelector(getTaskData)
	console.log('taskData', taskData)
	const { t } = useTranslation('admin')
	return (
		<>
			{taskData?.file_task_id && (
				<div className={cn(classes.AboutTask, [styles])}>
					<Header title={taskData?.file_task_id?.title} />
					<div className={classes.wrapper}>
						<div className={classes.message}>
							<Htag tag={'small'}>{taskData?.file_task_id?.description}</Htag>
						</div>
						{taskData?.file_task_id?.file && (
							<div className={classes.download}>
								<DownloadingFileButton
									file={taskData?.file_task_id?.file}
									title={'Задание'}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}

interface IAboutTaskProps {
	styles?: string
}
