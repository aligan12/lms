import React, { FC, ReactNode, useMemo, useState } from 'react'

import { ETheme, LOCAL_STORAGE_THEME_KEY, ThemeContext } from '../lib/ThemeContext'

// Берем значение из Local storage
const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ETheme) || ETheme.LIGHT

export const ThemeProvider: FC = ({ children }) => {
	const [theme, setTheme] = useState<ETheme>(defaultTheme)

	const defaultProviderValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	)

	return <ThemeContext.Provider value={defaultProviderValue}>{children}</ThemeContext.Provider>
}
