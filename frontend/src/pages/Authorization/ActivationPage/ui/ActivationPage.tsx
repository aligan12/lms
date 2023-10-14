import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getActivationError } from '../models/selectors/getActivationError'
import { getActivationLoading } from '../models/selectors/getActivationLoading'
import { getActivationSuccessful } from '../models/selectors/getActivationSuccessful'
import { ActivationReducer } from '../models/slice/ActivationSlice'
import { activationRequest } from '../services/ActivationRequest'
import classes from './ActivationPage.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'
import { IActivationParams } from 'app/providers/AppRouters/config/routeConfig'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, Header, Htag, Icon, LoadingDiv } from 'shared/ui'

export const ActivationPage = ({ styles }: IActivationPageProps) => {
	const { t } = useTranslation('admin')
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getActivationLoading)
	const successful = useSelector(getActivationSuccessful)
	const error = useSelector(getActivationError)
	const { token, uid } = useParams<IActivationParams>()

	useEffect(() => {
		token && uid && dispatch(activationRequest({ token, uid }))
	}, [])

	return (
		<DynamicModuleLoader
			reducer={ActivationReducer}
			reducerKey="activateAccount"
		>
			<div className={cn(classes.ActivationPage, [styles])}>
				{isLoading && <LoadingDiv />}
				{successful && (
					<div className={classes.text}>
						<Htag tag={'very-large'}>{t('registraciya-zavershena')}</Htag>
						<Htag
							tag={'large'}
							styles={classes.small_text}
						>
							{t('vy-uspeshno-aktivirovali-akkaunt')}
						</Htag>
					</div>
				)}
				{error && (
					<div className={classes.text}>
						<Htag tag={'very-large'}>Произошла ошибка </Htag>
						<Htag
							tag={'large'}
							styles={classes.small_text}
						>
							{error}
						</Htag>
					</div>
				)}
				<div className={classes.buttons}>
					<Link to={ERoutePath.AUTHORIZATION}>
						<Button
							variation="clear"
							styles={classes.button}
							format={'small'}
						>
							{t('voiti')}
							<Icon
								icon={'lock'}
								variation={'primary'}
							></Icon>
						</Button>
					</Link>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}
export default ActivationPage

interface IActivationPageProps {
	styles?: string
}
