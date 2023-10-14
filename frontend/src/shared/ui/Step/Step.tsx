import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import { CircleForIcon } from '../CircleForIcon/CircleForIcon'
import classes from './Step.module.scss'

import { classnames as cn } from 'shared/lib'

export const Step = ({
	styles,
	variation = 'primary',
	format = 'second',
	children,
	stepNumber,
	...props
}: IStepProps) => {
	return (
		<div
			className={cn(classes.Step, [styles], {
				[classes.primary]: variation === 'primary',
				[classes.secondary]: variation === 'secondary',
				[classes.first_step_primary]: variation === 'primary' && format === 'first',
				[classes.first_step_secondary]: variation === 'secondary' && format === 'first',
				[classes.second_step_primary]: variation === 'primary' && format === 'second',
				[classes.second_step_secondary]: variation === 'secondary' && format === 'second',
				[classes.last_step_primary]: variation === 'primary' && format === 'last',
				[classes.last_step_secondary]: variation === 'secondary' && format === 'last',
			})}
			{...props}
		>
			<div className={classes.children}>
				<CircleForIcon
					format={'small'}
					variation={variation === 'primary' ? 'white' : 'gray'}
				>
					{stepNumber}
				</CircleForIcon>
				{children}
			</div>
		</div>
	)
}

interface IStepProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	variation: 'primary' | 'secondary'
	format: 'first' | 'second' | 'last'
	stepNumber: number
}
