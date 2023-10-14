import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom'

import {
	AdminRouteConfig,
	ERoutePath,
	NotAuthRouteConfig,
	StudentRouteConfig,
	TeacherRouteConfig,
} from '../config/routeConfig'
import { loginByToken } from '../services/loginByToken'

import { LoadingPage } from 'features/LoaderForPage'

import { IToken } from 'entities/Authorization/types'
import { getUserType } from 'entities/Users/CustomUser'

import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const'
import { useAppDispatch } from 'shared/lib'

export const AppRouters = () => {
	const dispatch = useAppDispatch()
	const user = useSelector(getUserType)

	useLayoutEffect(() => {
		dispatch(loginByToken())
	}, [])

	const renderRoute = (routes: Array<RouteProps>, redirect: ERoutePath | undefined = ERoutePath.HOME) => {
		return (
			<>
				{user && (
					<Routes>
						{routes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
						))}
						<Route
							path="*"
							element={
								<Navigate
									to={redirect}
									replace
								/>
							}
						/>
					</Routes>
				)}
			</>
		)
	}

	const SelectTypeUser = () => {
		switch (user) {
			case 'not-auth':
				return renderRoute(NotAuthRouteConfig, ERoutePath.AUTHORIZATION)
			case 'student':
				return renderRoute(StudentRouteConfig)
			case 'teacher':
				return renderRoute(TeacherRouteConfig)
			case 'super-admin':
				return renderRoute(AdminRouteConfig)
			case 'admin':
				return renderRoute(AdminRouteConfig)

			default:
				return renderRoute(NotAuthRouteConfig, ERoutePath.AUTHORIZATION)
		}
	}
	return <Suspense fallback={<LoadingPage />}>{SelectTypeUser()}</Suspense>
}
