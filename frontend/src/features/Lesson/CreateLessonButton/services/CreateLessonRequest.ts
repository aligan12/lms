import { createAsyncThunk } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import { ERoutePath } from 'app/providers/AppRouters'
import { ICREATE_MODULE_Params, IEDIT_LESSON_Params } from 'app/providers/AppRouters/config/routeConfig'
import { IThunkExtraArg } from 'app/providers/StoreProvider'

import {
	IAdditionData,
	ICreateLectureData,
	ICreateLessonAboutData,
	ICreateLessonContentData,
	ILectureData,
	ILessonContentData,
} from 'entities/Lesson/types'
import { createListModuleRequest } from 'entities/Module/CreateListModule/services/createListModuleRequest'
import { IListModule } from 'entities/Module/types'
import { EListModuleType, ICreateListModule } from 'entities/Module/types/'

import { serverErrors, setParamsInPath } from 'shared/lib'

interface ICreateLessonProps {
	props: {
		course_id: number
	}
	about: ICreateLessonAboutData
	contents: ICreateLessonContentData[]
	additions: IAdditionData[]
	navigate: NavigateFunction
}

export const createLessonRequest = createAsyncThunk<
	void,
	ICreateLessonProps,
	{ rejectValue: string; extra: IThunkExtraArg }
>(
	'createLessonRequest',
	async ({ about, contents, additions, props, navigate }, { rejectWithValue, extra, dispatch }) => {
		try {
			const contents_id = []
			for (const content of contents) {
				const response = await extra.$axios.post<ILessonContentData>(extra.API.lectures.lesson.create, content)
				contents_id.push(response.data.id)
			}

			const additions_id = additions.map((addition) => addition.id)

			const lectureData: ICreateLectureData = {
				...about,
				additions: additions_id,
				lesson: contents_id,
			}

			const lectureResponse = await extra.$axios.post<ILectureData>(extra.API.lectures.create, lectureData)

			if (about.module_id) {
				const listModuelData: ICreateListModule = {
					course: props.course_id,
					lecture_id: lectureResponse.data.id,
					module_type: EListModuleType.LECTURE,
					module: about.module_id,
				}
				await dispatch(createListModuleRequest(listModuelData))
				navigate && navigate(-1)
			} else {
				throw new Error()
			}
		} catch (error) {
			return rejectWithValue(serverErrors(error))
		}
	},
)
