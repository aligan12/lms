import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getTaskAnswerData } from '../../models/selectors/getTaskAnswerData'
import classes from './StudentAnswer.module.scss'

import { DownloadingFileButton } from 'features/DownloadingFileButton'

import { classnames as cn } from 'shared/lib'
import { Button, Header, Htag, Icon, TextBox } from 'shared/ui'

export const StudentAnswer = ({ styles }: IStudentAnswerProps) => {
	const studentAnswer = useSelector(getTaskAnswerData)
	const { t } = useTranslation('admin')
	return (
		<>
			{studentAnswer && (
				<>
					<div className={classes.datetime}>
						{studentAnswer.is_late ? (
							<Htag
								tag={'small'}
								styles={classes.red}
							>
								С опозданием
							</Htag>
						) : (
							<Htag tag={'very-small'}></Htag>
						)}
						<Htag tag={'very-small'}> {studentAnswer.data}</Htag>
					</div>
					<div className={classes.message}>
						<Htag tag={'small'}>{studentAnswer.description}</Htag>
					</div>
					{studentAnswer.file && (
						<DownloadingFileButton
							styles={classes.button}
							file={studentAnswer.file}
							title={'Ваш ответ'}
						/>
					)}
				</>
			)}
		</>
	)
}

interface IStudentAnswerProps {
	styles?: string
}
