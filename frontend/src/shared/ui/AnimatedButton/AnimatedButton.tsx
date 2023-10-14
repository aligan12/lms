import { DetailedHTMLProps, HtmlHTMLAttributes, useState } from 'react'

import { Button } from '../Button/Button'
import { IIconType, Icon } from '../Icon/Icon'
import classes from './AnimatedButton.module.scss'

import { classnames as cn } from 'shared/lib'

export const AnimatedButton = ({ styles, children, icon, variation = 'primary' }: IAnimatedButtonProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	const renderIcon = () => {
		switch (variation) {
			case 'primary':
				return (
					<Icon
						variation={'secondary'}
						icon={icon}
					/>
				)
			case 'clear':
				return (
					<Icon
						variation={'primary'}
						icon={icon}
					/>
				)

			default:
				break
		}
	}
	return (
		<div
			className={cn(classes.AnimatedButton, [styles, classes.right_block])}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Button
				variation={variation}
				styles={isHovered ? classes.hover_button : classes.button}
				format={'small'}
			>
				<div className={classes.button_children}>
					{isHovered && <div className={classes.go_text}> {children}</div>}
				</div>
				{renderIcon()}
			</Button>
		</div>
	)
}

interface IAnimatedButtonProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	icon: IIconType
	variation?: 'primary' | 'secondary' | 'clear'
}
