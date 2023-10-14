import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IStateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'

export const StoreProvider = ({ children, initialState }: IStoreProviderProps) => {
	const store = createReduxStore(initialState)

	return <Provider store={store}>{children}</Provider>
}

interface IStoreProviderProps {
	children: ReactNode
	initialState?: IStateSchema
}
