import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classes from './ProfilePage.module.scss'

import { ProfileStudentInfo } from 'widgets/Student/ProfileUserInfo'

import { CreateProfileForm } from 'features/Profile/CreateProfileForm'

import { Avatar } from 'entities/Avatar'
import { getCustomUserDataRequest, getCustomUserInfo, getUserInfo } from 'entities/Users/CustomUser'
import { IStudentAboutData } from 'entities/Users/Student/types'

import { classnames as cn, useAppDispatch } from 'shared/lib'
import { Button, Header, Htag, Icon, TextBox, TextInput } from 'shared/ui'

export const ProfilePage = ({ styles, data }: IProfilePageProps) => {
	const { t } = useTranslation('')
	const [isEdit, setIsEdit] = useState(false)
	const dispatch = useAppDispatch()
	const profileInfo = useSelector(getUserInfo)
	const userInfo = useSelector(getCustomUserInfo)

	useEffect(() => {
		dispatch(getCustomUserDataRequest())
	}, [])
	return (
		<div className={cn(classes.ProfilePage, [styles])}>
			<div className={classes.main}>
				<div className={classes.wrapper}>
					<Header
						title={isEdit ? `${t('redaktirovanie')}` : `${t('lichnyi-kabinet')}`}
						buttons={
							<Button
								onClick={() => setIsEdit(!isEdit)}
								variation="primary"
								styles={classes.button}
								format={'small'}
							>
								{!isEdit ? `${t('redaktirovat')}` : `${t('lichnyi-kabinet')}`}

								<Icon
									icon={!isEdit ? `settings` : `left`}
									variation={'white'}
								></Icon>
							</Button>
						}
					/>
				</div>
				{!isEdit ? (
					<div className={classes.card}>
						<div className={classes.ava}>
							<Avatar size="large" />
						</div>

						<div className={classes.full_name}>
							<Htag tag={'large'}>{profileInfo.surname}</Htag>
							<Htag tag={'large'}>{profileInfo.name}</Htag>
							<Htag tag={'large'}>{profileInfo.patronymic}</Htag>
						</div>
						{userInfo && (
							<div className={classes.contacts}>
								<Htag tag={'medium'}>{userInfo.email}</Htag>
								<Htag tag={'small'}>{profileInfo.phone}</Htag>
							</div>
						)}
						<div className={classes.information}>
							<ProfileStudentInfo />
						</div>
					</div>
				) : (
					<div className={classes.edit_wrapper}>
						<CreateProfileForm />
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfilePage

interface IProfilePageProps {
	styles?: string
	data?: IStudentAboutData
}
