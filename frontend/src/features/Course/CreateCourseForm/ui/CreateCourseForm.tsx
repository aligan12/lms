import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getCreateCourseError } from '../model/selectors/getCreateCourseError'
import { getCreateCourseLoading } from '../model/selectors/getCreateCourseLoading'
import { getCreateCourseSuccessful } from '../model/selectors/getCreateCourseSuccessful'
import { createCourseReducer } from '../model/slice/CreateCourseSlice'
import { createCourseRequest } from '../services/CreateCourseRequest'
import classes from './CreateCourseForm.module.scss'

import { ICourseFormConstructor, ICreateCourseData } from 'entities/Course/types/Course.types'
import { FileUploader } from 'entities/FileUploader'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor, Icon } from 'shared/ui'

export const CreateCourseForm = ({ styles }: ICreateCourseFormProps) => {
	const { t } = useTranslation('course')
	const isLoading = useSelector(getCreateCourseLoading)
	const error = useSelector(getCreateCourseError)
	const successful = useSelector(getCreateCourseSuccessful)
	const dispatch = useAppDispatch()
	const [image, setImage] = useState<File | undefined | null>(undefined)
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ICreateCourseData> = (formData: ICreateCourseData, event) => {
		if (image) {
			event?.preventDefault()
			formData.image = image
			console.log(formData)
			dispatch(createCourseRequest({ courseData: formData, navigate }))
		}
	}

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
		},
		// {
		// 	type: 'selector',
		// 	options: [
		// 		{ title: '1 ' + `${t('mesyac')}`, value: '1' },
		// 		{ title: '2 ' + `${t('mesyaca-0')}`, value: '2' },
		// 	],
		// 	title: `${t('dlitelnost-kursa')}`,
		// 	key: 'course_duration',
		// 	rules: {
		// 		required: true,
		// 	},
		// },
		{
			type: 'selector',
			options: [
				{ title: `${t('razrabotka')}`, value: '1' },
				{ title: 'Дизайн', value: '2' },
			],
			title: `${t('napravlenie-obucheniya')}`,
			key: 'category',
			rules: {
				required: true,
			},
		},
		{
			type: 'input',
			title: 'Цена',
			key: 'price',
			rules: {
				required: true,
				pattern: 'number',
			},
		},
	]

	return (
		<DynamicModuleLoader
			reducer={createCourseReducer}
			reducerKey={'createCourseForm'}
		>
			<div className={cn(classes.CreateCourseForm, [styles])}>
				<div className={classes.left_block}>
					<FormConstructor<ICreateCourseData>
						successful={successful}
						serverError={error}
						isLoading={isLoading}
						onSubmit={onSubmit}
						data={data}
						button={
							<>
								{t('sokhranit')}
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
						setImage={setImage}
						image={image}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface ICreateCourseFormProps {
	styles?: string
}
