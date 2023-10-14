import classes from './Logo.module.scss'

import { ETheme, useTheme } from 'app/providers/ThemeProvider'

import LogoIcon from 'shared/assets/svg/Logo.svg'
import { classnames as cn } from 'shared/lib'

export const Logo = ({ styles }: ILogoProps) => {
	const { theme } = useTheme()
	return (
		<div className={cn(classes.Logo, [styles], { [classes.dark]: theme === ETheme.DARK })}>
			<LogoIcon />
		</div>
	)
}

interface ILogoProps {
	styles?: string
}
