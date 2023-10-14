import { useEffect, useState } from 'react'
import { FieldError } from 'react-hook-form'

import classes from './StarsGroup.module.scss'

import { classnames as cn } from 'shared/lib'
import { Icon } from 'shared/ui'

export const StarsGroup = ({
	styles,
	error,
	changeable,
	rating,
	quantity = 5,
	setRating,
}: IStarsGroupProps) => {
	const [totalStars, setTotalStars] = useState(new Array(quantity).fill(<></>))

	useEffect(() => {
		changeRating(rating)
	}, [rating])

	const changeRating = (currentRating: number) => {
		const updatedRating = totalStars.map((star, index) => {
			if (changeable && setRating !== undefined) {
				if (index < currentRating) {
					return (
						<Icon
							icon={'star_filled'}
							cursor={'cursor_pointer'}
							onMouseLeave={() => changeRating(rating)}
							onMouseEnter={() => changeRating(index + 1)}
							onClick={() => setRating(index + 1)}
							key={index}
							variation={'primary'}
						/>
					)
				} else {
					return (
						<Icon
							icon={'star'}
							cursor={'cursor_pointer'}
							onMouseLeave={() => changeRating(rating)}
							onMouseEnter={() => changeRating(index + 1)}
							onClick={() => setRating(index + 1)}
							key={index}
							variation={'primary'}
						/>
					)
				}
			} else {
				if (index < currentRating) {
					return (
						<Icon
							icon={'star_filled'}
							key={index}
							variation={'primary'}
						/>
					)
				} else {
					return (
						<Icon
							icon={'star'}
							key={index}
							variation={'primary'}
						/>
					)
				}
			}
		})

		setTotalStars(updatedRating)
	}

	return (
		<div className={cn(classes.StarsGroup, [styles])}>
			<div className={classes.stars}>
				{totalStars.map((star, index: number) => (
					<span key={index}>{star}</span>
				))}
			</div>
			{error && <span className={classes.error}>{error.message}</span>}
		</div>
	)
}

interface IStarsGroupProps {
	styles?: string
	quantity?: number
	rating: number
	setRating?: (rating: number) => void
	changeable: boolean
	error?: FieldError
}
