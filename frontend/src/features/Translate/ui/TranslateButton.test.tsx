import { screen } from '@testing-library/react'

import { TranslateButton } from 'features/Translate'

import { renderWithTranslations } from 'shared/lib/renderWithTranslations/renderWithTranslations'

describe('TranslateButton.test.tsx', () => {
	test('', () => {
		renderWithTranslations(<TranslateButton />)
		expect(screen.getByTestId('TEST')).toBeInTheDocument()
	})
})
