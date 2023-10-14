import { createAsyncThunk } from '@reduxjs/toolkit'

import { IThunkExtraArg } from 'app/providers/StoreProvider'

import { IChangedLesson, IChangedModule } from 'features/Module/EditModuleList/'

import { IListModule } from 'entities/Module/types'

interface UpdateModuleProps {
	trash_listModule: IListModule[]
	changed_module: IChangedModule
	changed_listModule: IChangedLesson
	trash_module: number[]
}

export const updateModuleRequest = createAsyncThunk<
	void,
	UpdateModuleProps,
	{ rejectValue: string; extra: IThunkExtraArg }
>(
	'updateModuleRequest',
	async (
		{ changed_listModule, changed_module, trash_module, trash_listModule },
		{ extra, rejectWithValue, dispatch },
	) => {
		try {
			for (const listModule of trash_listModule) {
				await extra.$axios.delete(extra.API.list_modules.rud + listModule.id)
			}

			for (const listModule of changed_listModule.listModule) {
				await extra.$axios.put<IListModule>(extra.API.list_modules.rud + listModule.id, {
					order: listModule.order,
				})
			}

			for (const moduel_id of trash_module) {
				await extra.$axios.delete<IListModule>(extra.API.modules.rud + moduel_id)
			}

			for (const module of changed_module.module) {
				await extra.$axios.put<IListModule>(extra.API.modules.rud + module.id, {
					order: module.order,
				})
			}
			console.log('OK')
		} catch (error: any) {
			return rejectWithValue(extra.serverErrors(error))
		}
	},
)
