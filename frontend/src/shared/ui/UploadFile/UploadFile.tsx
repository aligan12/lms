import {
	BaseSyntheticEvent,
	ChangeEvent,
	DetailedHTMLProps,
	Dispatch,
	ForwardedRef,
	HtmlHTMLAttributes,
	SetStateAction,
	forwardRef,
} from 'react'
import { useTranslation } from 'react-i18next'

import classes from './UploadFile.module.scss'

import { classnames as cn } from 'shared/lib'
import { Button, Icon } from 'shared/ui'

export const UploadFile = forwardRef(({ styles, ...props }: IUploadFileProps, ref: ForwardedRef<HTMLInputElement>) => {
	const { t } = useTranslation()

	return (
		<Button
			styles={classes.button}
			disabled={true}
		>
			<label className={cn(classes.UploadFile, [styles])}>
				<input
					multiple
					ref={ref}
					type="file"
					className={classes.input}
					{...props}
				/>
				{t('prikrepit-fail')}
				<Icon
					variation={'white'}
					icon={'save'}
				/>
			</label>
		</Button>
	)
})

interface IUploadFileProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	styles?: string
	// dragFileOver?: (event: BaseSyntheticEvent) => void
	// dragFileDrop?: (event: any) => void
}
