import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { start } from 'repl'

import { EditModuleCurrentId } from '../../const/currentId/dragAndDropCurrentId'
import { IChangedLesson, IChangedModule, IEditModuleSchema } from '../type/IEditModuleSchema.type'

import { getAllListModulesRequest } from 'entities/Module/ModuleData'
import { IListModule, IModuleData } from 'entities/Module/types'

import { StarFilled } from 'shared/ui/Icon/Icon.stories'

const initialState: IEditModuleSchema = {
	trash_module: [],
	current_id: undefined,
	trash_current: undefined,
	isLoading: false,
	module_data: [],
	changed_listModule: { module_index: -1, changedContent: [], listModule: [] },
	changed_module: { changedContent: [], module: [] },
	trash_listModule: [],
}

export const editModuleSlice = createSlice({
	name: 'editModuleList',
	initialState: initialState,
	reducers: {
		change_listModule: (state: IEditModuleSchema, { payload }: PayloadAction<IChangedLesson>) => {
			payload.listModule.map((list) => {
				const index = state.changed_listModule.listModule.findIndex((content) => content?.id === list.id)
				if (!index) {
					state.changed_listModule.listModule.push(list)
				} else {
					state.changed_listModule.listModule.splice(index, 1)
					state.changed_listModule.listModule.push(list)
				}
			})

			const sortedPayload = payload.changedContent.sort((a: IListModule, b: IListModule) => {
				if (a.order > b.order) {
					return 1
				} else {
					return -1
				}
			})

			state.module_data[payload.module_index].list_modules = sortedPayload
		},

		change_module: (state: IEditModuleSchema, { payload }: PayloadAction<IChangedModule>) => {
			payload.module.map((module) => {
				const index = state.changed_module.module.findIndex((content) => content?.id === module.id)
				if (!index) {
					state.changed_module.module.push(module)
				} else {
					state.changed_module.module.splice(index, 1)
					state.changed_module.module.push(module)
				}

				const sortedPayload = payload.changedContent.sort((a: IModuleData, b: IModuleData) => {
					if (a.order > b.order) {
						return 1
					} else {
						return -1
					}
				})

				state.module_data = sortedPayload
			})
		},

		delete_lesson: (
			state: IEditModuleSchema,
			{ payload }: PayloadAction<{ list_modules_id: number; moduleIndex: number }>,
		) => {
			//Поиск индекса list_modules
			const lessonIndex = state.module_data[payload.moduleIndex].list_modules.findIndex(
				(list_modules) => list_modules.id === payload.list_modules_id,
			)
			console.log('lessonIndex', lessonIndex)
			console.log('state', state.module_data[payload.moduleIndex].list_modules[lessonIndex])
			//Поиск добавление list_modules в корзину
			lessonIndex !== -1 &&
				state.trash_listModule.push(state.module_data[payload.moduleIndex].list_modules[lessonIndex])
			//Поиск удаление list_modules из module_data
			state.module_data[payload.moduleIndex].list_modules.splice(lessonIndex, 1)
		},

		delete_module: (state: IEditModuleSchema, { payload }: PayloadAction<{ moduleIndex: number }>) => {
			// Запись всех list_modules из модуля в корзину
			state.module_data[payload.moduleIndex].list_modules.map((lesson) => {
				state.trash_listModule.push(lesson)
			})
			//Добавление модуля в корзину
			state.trash_module.push(state.module_data[payload.moduleIndex].id)
			// Удаление модуля
			state.module_data.splice(payload.moduleIndex, 1)
		},

		set_trash_current: (state: IEditModuleSchema, { payload }: PayloadAction<IListModule>) => {
			state.trash_current = payload
		},

		remove_trash_current: (state: IEditModuleSchema, { payload }: PayloadAction<{ module_index: number }>) => {
			//Поиск в корзине индекс trash_current
			const trashIndex = state.trash_listModule.findIndex(
				(list_modules) => list_modules.id === state.trash_current?.id,
			)
			//Удаляем из корзины trash_current
			state.trash_listModule.splice(trashIndex, 1)
			//Возвращаем trash_current в модуль
			state.trash_current && state.module_data[payload.module_index].list_modules.push(state.trash_current)
			//Сбрасываем trash_current
			state.trash_current = undefined
		},

		set_current_id: (state: IEditModuleSchema, { payload }: PayloadAction<'module_id' | 'listModule_id'>) => {
			switch (payload) {
				case 'module_id':
					state.current_id = EditModuleCurrentId.MODULE_ID
					break
				case 'listModule_id':
					state.current_id = EditModuleCurrentId.LISTMODULE_id
					break

				default:
					break
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllListModulesRequest.pending, (state: IEditModuleSchema, action) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(getAllListModulesRequest.fulfilled, (state: IEditModuleSchema, action) => {
				state.isLoading = false
				state.module_data = action.payload
			})
			.addCase(getAllListModulesRequest.rejected, (state: IEditModuleSchema, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: editModuleSliceActions } = editModuleSlice
export const { reducer: editModuleSliceReducer } = editModuleSlice
