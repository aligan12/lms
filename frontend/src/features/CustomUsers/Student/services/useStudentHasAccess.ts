import { useSelector } from 'react-redux'

import { getCourseStudentData } from '../models/selectors/getCourseStudentData'

export const useStudentHasAccess = (courseId: number | string): boolean | string => {
	if (courseId) {
		const courseStudentData = useSelector(getCourseStudentData)

		const studentHasCourse = courseStudentData.find((course) => course.course === Number(courseId))

		return studentHasCourse ? true : false
	}
	return false
}
