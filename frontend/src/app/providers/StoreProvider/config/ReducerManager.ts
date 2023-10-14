import { AnyAction, CombinedState, Reducer, ReducersMapObject, combineReducers } from '@reduxjs/toolkit'

import { IStateSchema } from '..'
import { IReducerManager, IStateSchemaKey } from './StateSchema'

export function createReducerManager(initialReducers: ReducersMapObject<IStateSchema>): IReducerManager {
	const reducers = { ...initialReducers }

	let combinedReducer = combineReducers(reducers)

	let keysToRemove: IStateSchemaKey[] = []

	return {
		getReducerMap: () => reducers,

		reduce: (state: IStateSchema, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state }
				for (const key of keysToRemove) {
					delete state[key]
				}
				keysToRemove = []
			}

			return combinedReducer(state, action)
		},

		add: (key: IStateSchemaKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return
			}

			reducers[key] = reducer

			combinedReducer = combineReducers(reducers)
		},

		remove: (key: IStateSchemaKey) => {
			if (!key || !reducers[key]) {
				return
			}

			delete reducers[key]

			keysToRemove.push(key)

			combinedReducer = combineReducers(reducers)
		},
	}
}
