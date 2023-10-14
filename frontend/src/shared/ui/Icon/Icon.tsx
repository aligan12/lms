import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

import classes from './Icon.module.scss'

import BookIcon from 'shared/assets/svg/BookIcon.svg'
import CalendarIconIcon from 'shared/assets/svg/CalendarIconIcon.svg'
import ChatIcon from 'shared/assets/svg/ChatIcon.svg'
import CircleFilledIcon from 'shared/assets/svg/CircleFilledIcon.svg'
import CircleIcon from 'shared/assets/svg/CircleIcon.svg'
import ClockIcon from 'shared/assets/svg/ClockIcon.svg'
import CloseIcon from 'shared/assets/svg/CloseIcon.svg'
import CoursesIcon from 'shared/assets/svg/CoursesIcon.svg'
import DoneIcon from 'shared/assets/svg/DoneIcon.svg'
import DownIcon from 'shared/assets/svg/DownIcon.svg'
import EditIcon from 'shared/assets/svg/EditIcon.svg'
import FileIcon from 'shared/assets/svg/FileIcon.svg'
import HomeIcon from 'shared/assets/svg/HomeIcon.svg'
import LanguageIcon from 'shared/assets/svg/LanguageIcon.svg'
import LeftIcon from 'shared/assets/svg/LeftIcon.svg'
import LinkIcon from 'shared/assets/svg/LinkIcon.svg'
import LockIcon from 'shared/assets/svg/LockIcon.svg'
import MailIcon from 'shared/assets/svg/MailIcon.svg'
import MoonIcon from 'shared/assets/svg/MoonIcon.svg'
import NotificationIcon from 'shared/assets/svg/NotificationIcon.svg'
import PlusIcon from 'shared/assets/svg/PlusIcon.svg'
import RegistrationIcon from 'shared/assets/svg/RegistrationIcon.svg'
import RightIcon from 'shared/assets/svg/RightIcon.svg'
import SaveIcon from 'shared/assets/svg/SaveIcon.svg'
import SearchIcon from 'shared/assets/svg/SearchIcon.svg'
import SettingsIcon from 'shared/assets/svg/SettingsIcon.svg'
import ShieldIcon from 'shared/assets/svg/ShieldIcon.svg'
import StarFilledIcon from 'shared/assets/svg/StarFilledIcon.svg'
import StarIcon from 'shared/assets/svg/StarIcon.svg'
import SunIcon from 'shared/assets/svg/SunIcon.svg'
import TeacherIcon from 'shared/assets/svg/TeacherIcon.svg'
import ToolIcon from 'shared/assets/svg/ToolIcon.svg'
import TrashIcon from 'shared/assets/svg/TrashIcon.svg'
import UpIcon from 'shared/assets/svg/UpIcon.svg'
import VideoIcon from 'shared/assets/svg/VideoIcon.svg'
import { classnames as cn } from 'shared/lib'

export const Icon = ({
	styles,
	variation = 'inverted-secondary',
	icon,
	cursor = 'cursor_pointer',
	size = 'medium',
	...props
}: IIconProps) => {
	const styleMod = {
		[classes.primary]: variation === 'primary',
		[classes.secondary]: variation === 'secondary',
		[classes.red]: variation === 'red',
		[classes.white]: variation === 'white',
		[classes.gray]: variation === 'gray',
		[classes.inverted_secondary]: variation === 'inverted-secondary',
		[classes.cursor_pointer]: cursor === 'cursor_pointer',
		[classes.cursor_none]: cursor === 'cursor_none',
		[classes.small]: size === 'small',
		[classes.medium]: size === 'medium',
	}

	return (
		<div
			className={classes.wrapper}
			{...props}
		>
			{icon === 'home' && <HomeIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'book' && <BookIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'calendar' && <CalendarIconIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'chat' && <ChatIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'circle_filled' && <CircleFilledIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'circle' && <CircleIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'clock' && <ClockIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'close' && <CloseIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'courses' && <CoursesIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'done' && <DoneIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'down' && <DownIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'edit' && <EditIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'file' && <FileIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'language' && <LanguageIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'left' && <LeftIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'link' && <LinkIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'lock' && <LockIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'mail' && <MailIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'notification' && <NotificationIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'plus' && <PlusIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'right' && <RightIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'save' && <SaveIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'search' && <SearchIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'settings' && <SettingsIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'shield' && <ShieldIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'star_filled' && <StarFilledIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'star' && <StarIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'teacher' && <TeacherIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'tool' && <ToolIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'up' && <UpIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'video' && <VideoIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'moon' && <MoonIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'sun' && <SunIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'trash' && <TrashIcon className={cn(classes.Icon, [styles], styleMod)} />}
			{icon === 'registration' && <RegistrationIcon className={cn(classes.Icon, [styles], styleMod)} />}
		</div>
	)
}

interface IIconProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	styles?: string
	variation?: 'primary' | 'secondary' | 'red' | 'inverted-secondary' | 'white' | 'gray'
	cursor?: 'cursor_pointer' | 'cursor_none'
	size?: 'small' | 'medium' | 'large'
	icon: IIconType
}

export type IIconType =
	| 'home'
	| 'book'
	| 'calendar'
	| 'chat'
	| 'circle_filled'
	| 'circle'
	| 'clock'
	| 'close'
	| 'courses'
	| 'done'
	| 'down'
	| 'edit'
	| 'file'
	| 'language'
	| 'left'
	| 'link'
	| 'lock'
	| 'mail'
	| 'notification'
	| 'plus'
	| 'right'
	| 'save'
	| 'search'
	| 'settings'
	| 'shield'
	| 'star_filled'
	| 'star'
	| 'teacher'
	| 'tool'
	| 'up'
	| 'video'
	| 'moon'
	| 'sun'
	| 'trash'
	| 'registration'
