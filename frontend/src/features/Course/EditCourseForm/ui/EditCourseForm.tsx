import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUpdateCourseError } from '../models/selectors/getUpdateCourseError'
import { getUpdateCourseIsLoading } from '../models/selectors/getUpdateCourseIsLoading'
import { getUpdateCourseSuccessful } from '../models/selectors/getUpdateCourseSuccessful'
import { UpdateCourseReducer } from '../models/slice/UpdateCourseSlice'
import { updateCourseRequest } from '../services/UpdateCourseRequest'
import classes from './EditCourseForm.module.scss'

import { getRetrieveCourseData } from 'entities/Course/CourseData'
import { ICourseFormConstructor, ICreateCourseData } from 'entities/Course/types/Course.types'
import { FileUploader } from 'entities/FileUploader'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor, Icon } from 'shared/ui'

export const EditCourseForm = ({ styles }: IEditCourseFormProps) => {
	const courseData = useSelector(getRetrieveCourseData)
	const isLoading = useSelector(getUpdateCourseIsLoading)
	const successful = useSelector(getUpdateCourseSuccessful)
	const error = useSelector(getUpdateCourseError)
	const [image, setImage] = useState<File | undefined | null>()
	const dispatch = useAppDispatch()
	const { id } = useParams()

	const onSubmit: SubmitHandler<ICreateCourseData> = (formData: ICreateCourseData, event) => {
		if (image !== undefined) {
			event?.preventDefault()
			if (image) {
				formData.image = image
			}
			dispatch(updateCourseRequest({ id: Number(id), courseData: formData }))
		}
	}
	const { t } = useTranslation('course')
	const data: ICourseFormConstructor[] = [
		{
			type: 'input',
			title: `${t('nazvanie-kursa')}`,
			description: `${t('do-20-simvolov-0')}`,
			key: 'title',
			rules: {
				required: true,
				maxLength: 35,
			},
			defaultValue: courseData?.title,
		},
		{
			type: 'text-input',
			title: `${t('opisanie-kursa')}`,
			description: `${t('do-80-simvolov')}`,
			key: 'description',
			rules: {
				required: true,
				maxLength: 110,
			},
			defaultValue: courseData?.description,
		},

		{
			type: 'selector',
			options: [
				{ title: `${t('razrabotka')}`, value: 1 },
				{ title: 'Дизайн', value: 2 },
			],
			title: `${t('napravlenie-obucheniya')}`,
			key: 'category',
			rules: {
				required: true,
			},
			defaultValue: courseData?.category,
		},
		{
			type: 'input',
			title: 'Цена',
			key: 'price',
			rules: {
				required: true,
				pattern: 'number',
			},
			defaultValue: courseData?.price,
		},
	]

	return (
		<DynamicModuleLoader
			reducer={UpdateCourseReducer}
			reducerKey="updateCourseData"
		>
			<div className={cn(classes.EditCourseForm, [styles])}>
				<div className={classes.left_block}>
					<FormConstructor<ICreateCourseData>
						successful={successful}
						serverError={error}
						isLoading={isLoading}
						onSubmit={onSubmit}
						data={data}
						button={
							<>
								{t('primenit-izmeneniya')}
								<Icon
									variation={'secondary'}
									icon={'save'}
								/>
							</>
						}
					/>
				</div>
				<div>
					<FileUploader
						title={t('oblozhka-kursa')}
						initialImage={courseData?.image}
						setImage={setImage}
						image={image}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface IEditCourseFormProps {
	styles?: string
}
