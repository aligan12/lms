import { BaseSyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { createTaskGradeRequest } from '../services/createTaskGradeRequest'
import classes from './CreateTaskGradeForm.module.scss'

import { getOneGradeData } from 'entities/Grade'
import { IUpdateGradeData } from 'entities/Grade/types/Grade'
import { StarsGroup } from 'entities/StarsGroup'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, ErrorText, Header, Htag, Icon, TextInput } from 'shared/ui'

export const CreateTaskGradeForm = ({ styles }: ICreateTaskGradeFormProps) => {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState<string>('')
	const [error, setError] = useState<null | string>(null)
	const { t } = useTranslation('admin')
	const dispatch = useAppDispatch()
	const hasGrade = useSelector(getOneGradeData)

	const handleClick = () => {
		if (rating !== 0) {
			const gradeForm: IUpdateGradeData = {}
			gradeForm.grade = rating
			gradeForm.teacher_comment = comment
			console.log(gradeForm)
			hasGrade && dispatch(createTaskGradeRequest({ gradeId: hasGrade.id, gradeForm }))
		} else {
			setError('Оцените ответ')
		}
	}
	return (
		<div className={cn(classes.CreateTaskGradeForm, [styles])}>
			<Header
				title={`${t('vasha-ocenka')}`}
				styles={classes.head}
			/>
			<Htag tag={'small'}>{t('ocenka-zadaniya')}</Htag>
			<div className={classes.stars}>
				<StarsGroup
					rating={rating}
					changeable={true}
					setRating={setRating}
				></StarsGroup>
			</div>
			<Htag tag={'small'}>{t('kommentarii-k-ocenke')}</Htag>
			<Htag tag={'very-small'}>До 300 символов</Htag>

			<TextInput
				value={comment}
				onChange={(e: BaseSyntheticEvent) => setComment(e.target.value)}
				styles={classes.your_message}
			>
				{t('kommentarii')}
			</TextInput>
			{error && <ErrorText>{error}</ErrorText>}
			<Button
				onClick={handleClick}
				variation="primary"
				styles={classes.button}
				format={'small'}
			>
				{t('ocenit')}
				<Icon
					icon={'done'}
					variation={'white'}
				></Icon>
			</Button>
		</div>
	)
}

interface ICreateTaskGradeFormProps {
	styles?: string
}
