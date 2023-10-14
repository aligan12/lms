import { useContext } from 'react'

import { ETheme, LOCAL_STORAGE_THEME_KEY, ThemeContext } from './ThemeContext'

// Hook для изменения глобальной темы , тема записыватся в Local storage

interface IUseThemeResult {
	theme: ETheme
	changeTheme: () => void
}

export const useTheme = (): IUseThemeResult => {
	const { setTheme, theme } = useContext(ThemeContext)

	const changeTheme = () => {
		const changedTheme = theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK
		setTheme(changedTheme)
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, changedTheme)
	}

	return { theme, changeTheme }
}
