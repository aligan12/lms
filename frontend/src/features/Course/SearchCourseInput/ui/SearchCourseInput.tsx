import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { searchCourseListRequest } from '../services/searchCourseListRequest'
import classes from './SearchCourseInput.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, Icon, Input } from 'shared/ui'

export const SearchCourseInput = ({ styles }: ISearchCourseInputProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [value, setValue] = useState('')
	const handlerClick = () => {
		navigate(ERoutePath.COURSES)
		dispatch(searchCourseListRequest({ value }))
	}

	return (
		<div className={cn(classes.SearchCourseInput, [styles])}>
			<Input
				value={value}
				onChange={(event) => setValue(event.target.value)}
				variation={'clear'}
			>
				Найти курс
			</Input>
			<Button
				onClick={handlerClick}
				styles={classes.searchButton}
				variation="clear"
			>
				<Icon
					variation="gray"
					icon={'search'}
				/>
			</Button>
		</div>
	)
}

interface ISearchCourseInputProps {
	styles?: string
}
