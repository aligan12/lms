import { useTranslation } from 'react-i18next'

import classes from './CreateTaskPage.module.scss'

import { BackButton } from 'features/BackButton'
import { CreateTaskForm } from 'features/Task/CreateTaskForm'

import { classnames as cn } from 'shared/lib'
import { Button, Header, Htag, Icon, TextInput, UploadFile } from 'shared/ui'

export const CreateTaskPage = ({ styles }: ICreateTaskPageProps) => {
	const { t } = useTranslation('course')

	return (
		<div className={cn(classes.CreateTaskPage, [styles])}>
			<BackButton />
			<div className={classes.main}>
				<Header title={`${t('sozdanie-zadaniya')}`} />
				<div className={classes.wrapper}>
					<CreateTaskForm />
				</div>
			</div>
		</div>
	)
}
export default CreateTaskPage

interface ICreateTaskPageProps {
	styles?: string
}
