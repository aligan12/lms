import React, { ErrorInfo, ReactNode, Suspense } from 'react'

import { ErrorPage } from 'pages/ErrorPage/ui/ErrorPage'

import { LoadingPage } from 'features/LoaderForPage'

interface IErrorBoundaryProps {
	children: ReactNode
}
interface IErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo)
	}

	render() {
		const { hasError } = this.state
		const { children } = this.props
		if (hasError) {
			// You can render any custom fallback UI
			// eslint-disable-next-line i18next/no-literal-string
			return (
				<Suspense fallback={<LoadingPage />}>
					<ErrorPage />
				</Suspense>
			)
		}

		return children
	}
}

export default ErrorBoundary
