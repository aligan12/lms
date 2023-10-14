import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ILessonContentScheme } from '../type/LessonContentScheme'

import { ILessonContentData } from 'entities/Lesson/types'

const initialState: ILessonContentScheme = { lesson_data: [] }

export const LessonContentSlice = createSlice({
	name: 'lessonContentSlice',
	initialState: initialState,
	reducers: {
		delete_content: (state: ILessonContentScheme, { payload }: PayloadAction<ILessonContentData>) => {
			if (state.lesson_data.length !== 0) {
				const index = state.lesson_data.findIndex((content) => content?.id === payload.id)
				state.lesson_data.splice(index, 1)
			}
		},
		add_content: (state: ILessonContentScheme, { payload }: PayloadAction<ILessonContentData>) => {
			state.lesson_data.push(payload)
		},
		initial_lesson: (state: ILessonContentScheme, { payload }: PayloadAction<ILessonContentData[]>) => {
			state.lesson_data = payload
		},
		change_sort_content: (state: ILessonContentScheme, { payload }: PayloadAction<ILessonContentData[]>) => {
			const sortedPayload = payload.sort((a: ILessonContentData, b: ILessonContentData) => {
				if (a.order > b.order) {
					return 1
				} else {
					return -1
				}
			})

			state.lesson_data = sortedPayload
		},
	},
})

export const { actions: lessonContentActions } = LessonContentSlice
export const { reducer: lessonContentReducer } = LessonContentSlice
