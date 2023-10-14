import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getAboutTicketData } from '../models/selectors/getAboutTicketData'
import { retrieveTicketReducer } from '../models/slice/retrieveTicketSlice'
import { retrieveTicketRequest } from '../services/retrieveTicketRequest'
import classes from './AboutTicket.module.scss'

import { ILAST_ID_Params } from 'app/providers/AppRouters'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, CircleForIcon, Hr, Htag, Icon, TextBox } from 'shared/ui'

export const AboutTicket = ({ styles }: IAboutTicketProps) => {
	const { t } = useTranslation('ticket')
	const { id } = useParams<ILAST_ID_Params>()
	const dispatch = useAppDispatch()
	const data = useSelector(getAboutTicketData)
	useEffect(() => {
		id && dispatch(retrieveTicketRequest({ ticketId: Number(id) }))
	}, [])

	return (
		<DynamicModuleLoader
			reducer={retrieveTicketReducer}
			reducerKey="retrieveTicketData"
		>
			{data && (
				<div className={cn(classes.AboutTicket, [styles])}>
					<div className={classes.grid_block}>
						<div className={classes.indicator_block}>
							{data.completed ? (
								<Htag
									tag={'large'}
									styles={classes.green}
								>
									Решено
								</Htag>
							) : (
								<Htag
									tag={'large'}
									styles={classes.red}
								>
									В обработке
								</Htag>
							)}
						</div>

						<div className={classes.title}>
							<Htag tag={'medium'}>{data.title}</Htag>
						</div>
						<div className={classes.message}>
							<TextBox size={'medium'}>{data.description}</TextBox>
						</div>
					</div>

					<div className={classes.download}>
						{data.file && (
							<a href={data.file}>
								<Button
									variation="primary"
									styles={classes.button}
									format={'small'}
								>
									{t('skachat-0')}
									<Icon
										icon={'file'}
										variation={'white'}
									></Icon>
								</Button>
							</a>
						)}
					</div>
					<div className={classes.hr}>
						<Hr />
					</div>
					{data.answer && (
						<>
							<div className={classes.title}>
								<Htag tag={'medium'}>Ответ</Htag>
							</div>
							<div className={classes.message}>
								<TextBox size={'medium'}>{data.answer}</TextBox>
							</div>
						</>
					)}
				</div>
			)}
		</DynamicModuleLoader>
	)
}

interface IAboutTicketProps {
	styles?: string
}
