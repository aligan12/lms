import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUpdateStudentError } from '../models/selectors/getUpdateStudentError'
import { getUpdateStudentLoading } from '../models/selectors/getUpdateStudentLoading'
import { updateStudentDataReducer } from '../models/slice/updateStudentDataSlice'
import { UpdateStudentDataRequest } from '../services/UpdateStudentDataRequest'
import classes from './CreateProfileForm.module.scss'

import { FileUploader } from 'entities/FileUploader'
import { IProfileFormConstructor } from 'entities/Profile/types'
import { ICreateProfileData } from 'entities/Profile/types/Profile.types'
import { getCustomUserInfo, getUserInfo } from 'entities/Users/CustomUser'

import { DynamicModuleLoader, classnames as cn, useAppDispatch } from 'shared/lib'
import { FormConstructor, Header, Hr } from 'shared/ui'

export const CreateProfileForm = ({ styles }: ICreateProfileFormProps) => {
	const { t } = useTranslation('')

	const profileInfo = useSelector(getUserInfo)
	const error = useSelector(getUpdateStudentError)
	const isLoading = useSelector(getUpdateStudentLoading)
	const [image, setImage] = useState<File | undefined | null>()
	const dispatch = useAppDispatch()
	console.log('profileInfo', profileInfo)

	const onSubmit: SubmitHandler<ICreateProfileData> = (formData: ICreateProfileData, event) => {
		event?.preventDefault()
		if (formData.age === '') {
			formData.age = null
		}
		if (image !== undefined) {
			formData.avatar = image
		}
		if (formData.phone === '') {
			formData.phone = null
		}

		profileInfo.student &&
			dispatch(UpdateStudentDataRequest({ formData: formData, studentId: profileInfo.student }))
	}

	const data: IProfileFormConstructor[] = [
		{
			type: 'input',
			title: `${t('familiya')}`,
			description: `${t('do')}` + 40 + `${t('simvolov')}`,
			key: 'surname',
			rules: {
				required: true,
				maxLength: 40,
			},
			defaultValue: profileInfo.surname,
		},
		{
			type: 'input',
			title: `${t('imya')}`,
			description: `${t('do')}` + 40 + `${t('simvolov')}`,
			key: 'name',
			rules: {
				required: true,
				maxLength: 40,
			},
			defaultValue: profileInfo.name,
		},
		{
			type: 'input',
			title: `${t('otchestvo')}`,
			description: `${t('do')}` + 40 + `${t('simvolov')}`,
			key: 'patronymic',
			rules: {
				maxLength: 40,
			},
			defaultValue: profileInfo.patronymic ? profileInfo.patronymic : '',
		},
		{
			type: 'input',
			title: `${t('telefon')}`,

			key: 'phone',
			rules: {
				maxLength: 12,
				pattern: 'number',
			},
			defaultValue: profileInfo?.phone ? profileInfo?.phone : '',
		},
		{
			type: 'text-input',
			title: `${t('o-sebe')}`,
			key: 'about',
			rules: {
				required: false,
			},
			defaultValue: profileInfo.about ? profileInfo.about : '',
		},
		{
			type: 'selector',
			options: [
				{ title: `${t('muzhskoi')}`, value: 'Мужской' },
				{ title: `${t('zhenskii')}`, value: 'Женский' },
			],
			title: `${t('pol-0')}`,
			key: 'sex',
			rules: {},
			defaultValue: profileInfo.sex ? profileInfo.sex : '',
		},
		{
			type: 'input',
			title: `${t('vozrast-0')}`,
			key: 'age',
			rules: {
				maxLength: 2,
				pattern: 'number',
			},
			defaultValue: profileInfo.age ? profileInfo.age : '',
		},
		{
			type: 'input',
			title: `${t('strana-0')}`,
			description: `${t('do')}` + 80 + `${t('simvolov')}`,
			key: 'country',
			rules: {
				maxLength: 80,
			},
			defaultValue: profileInfo.country ? profileInfo.country : '',
		},
		{
			type: 'input',
			title: `${t('universitet-0')}`,
			description: `${t('do')}` + 80 + `${t('simvolov')}`,
			key: 'university',
			rules: {
				maxLength: 80,
			},
			defaultValue: profileInfo.university ? profileInfo.university : '',
		},
	]

	return (
		<DynamicModuleLoader
			reducer={updateStudentDataReducer}
			reducerKey="updateStudentForm"
		>
			<div className={cn(classes.CreateProfileForm, [styles])}>
				<div className={classes.wrapper}>
					<FormConstructor<ICreateProfileData>
						isLoading={isLoading}
						serverError={error}
						onSubmit={onSubmit}
						data={data}
						button={`${t('sokhranit-0')}`}
						styles={classes.form}
					/>
				</div>
				<div>
					<FileUploader
						initialImage={profileInfo?.avatar}
						title="Фото профиля"
						setImage={setImage}
						image={image}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	)
}

interface ICreateProfileFormProps {
	styles?: string
}
