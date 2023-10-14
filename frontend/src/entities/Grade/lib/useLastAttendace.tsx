import { useState } from 'react'
import { useSelector } from 'react-redux'

import { getListGradeData } from '../models/selectors/getListGradeData'
import { IGradeData } from '../types'

import { useListModuleFindId } from 'features/Lesson/CreateAttendanceButton'

import { getAllModuleData } from 'entities/Module/ModuleData'
import { IListModule } from 'entities/Module/types'
import { IListModuleLectureData } from 'entities/Module/types/ListModule.types'
import { getUserType } from 'entities/Users/CustomUser'

export const useLastAttendance = (module_index: number): IOutput => {
	const userType = useSelector(getUserType)
	const grades = useSelector(getListGradeData)
	const modules = useSelector(getAllModuleData)
	const grade = grades[grades.length - 1]
	const nextAndPrevious = useListModuleFindId(grade?.module_index, grade?.list_modules?.id)

	const isDisabled = (
		data: IListModule | IListModuleLectureData,
		lastAttendance: IGradeData | null | undefined,
		lastModuleIndex: number,
	) => {
		console.log(
			'MODULE ',
			module_index,
			' LASTMODULE ',
			lastModuleIndex,
			' LESSON ',
			data.lecture_id?.title,
			' lastModuleIndex ',
			lastModuleIndex,
		)
		if (userType !== 'admin' && userType !== 'super-admin') {
			if (module_index < lastModuleIndex) {
				return false
			} else if (module_index === lastModuleIndex) {
				if (lastAttendance) {
					if (lastAttendance?.list_modules?.order >= data.order) {
						return false
					} else {
						return true
					}
				} else if (lastAttendance === null) {
					console.log('isDisabled 2')

					if (modules[lastModuleIndex]?.list_modules[0]?.id === data.id) {
						return false
					} else {
						return true
					}
				} else {
					return true
				}
			} else {
				return true
			}
		} else {
			return false
		}
	}

	if (grades.length >= 1 && nextAndPrevious?.next) {
		return {
			lastAttendance: { ...grade, list_modules: nextAndPrevious.next },
			isDisabled: isDisabled,
			lastModuleIndex: grade.module_index,
		}
	} else if (grades.length === 0) {
		return { lastAttendance: null, isDisabled: isDisabled, lastModuleIndex: 0 }
	} else if (nextAndPrevious?.next === false) {
		return {
			lastAttendance: null,
			lastModuleIndex: grade.module_index + 1,
			isDisabled: isDisabled,
		}
	}
	return { lastAttendance: undefined, isDisabled: isDisabled, lastModuleIndex: 0 }
}

interface IOutput {
	lastModuleIndex: number
	lastAttendance: IGradeData | null | undefined
	isDisabled: (
		data: IListModule | IListModuleLectureData,
		lastAttendance: IGradeData | null | undefined,
		moduleIndex: number,
	) => boolean
}
