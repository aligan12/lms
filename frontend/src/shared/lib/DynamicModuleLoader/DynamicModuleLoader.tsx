import { Reducer } from '@reduxjs/toolkit'
import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import { IStoreWithManager } from 'app/providers/StoreProvider'
import { IStateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'

import { classnames as cn, useAppDispatch } from 'shared/lib'

export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = ({ children, reducerKey, reducer }) => {
	const store = useStore() as IStoreWithManager
	const dispatch = useAppDispatch()

	useEffect(() => {
		store.reducerManager.add(reducerKey, reducer)
		dispatch({ type: `@INIT ${reducerKey} reducer` })
		return () => {
			store.reducerManager.remove(reducerKey)
			dispatch({ type: `@DESTROY ${reducerKey} reducer` })
		}
	}, [])
	return <>{children}</>
}

interface IDynamicModuleLoaderProps {
	reducerKey: IStateSchemaKey
	reducer: Reducer
}
