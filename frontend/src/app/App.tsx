import { Suspense } from 'react'

import { AppRouters } from './providers/AppRouters'
import { Layout } from './providers/Layout'
import { useTheme } from './providers/ThemeProvider'
import './styles/index.scss'

import { LoadingPage } from 'features/LoaderForPage'

import { classnames } from 'shared/lib'

const App = () => {
	const { theme } = useTheme()
	return (
		<div className={classnames('app', [theme])}>
			<Suspense fallback={<LoadingPage />}>
				<Layout>
					<AppRouters />
				</Layout>
			</Suspense>
		</div>
	)
}

export default App
