import { createSelector } from '@reduxjs/toolkit'

import { IStateSchema } from 'app/providers/StoreProvider'

const getName = (state: IStateSchema) => state.registrationForm?.name
const getSurname = (state: IStateSchema) => state.registrationForm?.surname

export const getUserNameSurname =
	getName &&
	getSurname &&
	createSelector(getName, getSurname, (name: string | undefined, surname: string | undefined) => ({
		name,
		surname,
	}))
