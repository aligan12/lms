import { createContext } from 'react'

export enum ETheme {
	DARK = 'dark',
	LIGHT = 'light',
}

interface IThemeContext {
	theme: ETheme
	setTheme: (theme: ETheme) => void
}

export const ThemeContext = createContext<IThemeContext>({
	theme: ETheme.LIGHT,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setTheme: (theme) => {},
})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
