import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import classes from './BackButton.module.scss'

import { classnames as cn } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

export const BackButton = ({ styles }: IBackButtonProps) => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
		<div className={cn(classes.BackButton, [styles])}>
			<Button
				onClick={() => navigate(-1)}
				variation="primary"
				styles={classes.button}
				format={'small'}
			>
				<Icon
					variation={'secondary'}
					icon={'left'}
				/>

				{t('nazad')}
			</Button>
		</div>
	)
}

interface IBackButtonProps {
	styles?: string
}
