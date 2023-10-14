import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './FileUploader.module.scss'

import { classnames as cn } from 'shared/lib'
import { ErrorText, Htag, Icon, UploadFile } from 'shared/ui'

export const FileUploader = ({ styles, setImage, image, initialImage, title }: IFileUploaderProps) => {
	const [error, setImageError] = useState<boolean>(false)
	const [imageSrc, setImageScr] = useState('')
	const { t } = useTranslation('course')
	const handleClick = (event: BaseSyntheticEvent) => {
		event.preventDefault()
		setImage && setImage(event.target.files[0])
	}
	useEffect(() => {
		if (initialImage) {
			setImageScr(initialImage)
			setImageError(false)
			setImage && setImage(null)
		}
	}, [initialImage])
	useEffect(() => {
		if (image !== undefined) {
			setImageError(false)
			image && setImageScr(URL.createObjectURL(image))
		} else {
			setImageError(true)
		}
	}, [image])

	const handleDragOver = (event: BaseSyntheticEvent) => {
		event.preventDefault()
	}

	const handleDrop = (event: any) => {
		event.preventDefault()
		console.log('event', event)
		setImage && event.dataTransfer && setImage(event.dataTransfer.files[0])
	}
	return (
		<div className={cn(classes.FileUploader, [styles])}>
			<div className={classes.top_block}>
				<Htag tag={'small'}>{title}</Htag>
				<Htag
					tag={'very-small'}
					styles={classes.top_block}
				>
					{t('jpeg-do-5-mb')}
				</Htag>
			</div>
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className={classes.bottom_block}
			>
				{imageSrc && (
					<div className={classes.img_wrapper}>
						<img
							className={classes.img}
							src={imageSrc}
						/>
					</div>
				)}
				<div></div>
				{!imageSrc && (
					<div className={classes.file_icon}>
						<Icon
							variation={'inverted-secondary'}
							icon={'file'}
							styles={classes.icon_size}
						/>
					</div>
				)}
				<div className={classes.text}>
					<UploadFile onChange={handleClick} />
					<Htag tag={'very-small'}>{t('ili-peretashite-fail')}</Htag>
				</div>
			</div>

			{error && <ErrorText>Выберите обложку </ErrorText>}
		</div>
	)
}
interface IFileUploaderProps {
	styles?: string
	setImage?: Dispatch<SetStateAction<File | undefined | null>>
	error?: boolean
	image?: File | undefined | null
	initialImage?: string | null
	title: string
}
