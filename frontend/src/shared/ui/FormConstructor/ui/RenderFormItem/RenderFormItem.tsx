import { useEffect, useState } from 'react'
import { Controller, DefaultValues, FieldValues, UseFormReset } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { rulesConstructor } from '../../lib/rulesConstructor/rulesConstructor'
import { IConbineFormConstructor } from '../../types/FormConstructor'
import classes from './RenderFormItem.module.scss'

import { CheckBox, Htag, Input, SelectOption, TextInput, UploadFile } from 'shared/ui'

export function RenderFormItem<T>({ formItem, control, register, getValues, watch, reset }: IRenderFormProps<T>) {
	const [file, setFile] = useState<string>()
	const rules = rulesConstructor(formItem.rules, watch)
	const { t } = useTranslation('')

	useEffect(() => {
		const defaultValue: Record<any, string | number | boolean | undefined> = {}

		defaultValue[formItem.key] = formItem.defaultValue

		console.log('defaultValue', defaultValue)
		reset((formValues: any) => ({
			...formValues,
			...defaultValue,
		}))
	}, [formItem.defaultValue])

	switch (formItem.type) {
		case 'password':
			return (
				<Input
					type={'password'}
					format={'large'}
					variation={'clear'}
					{...register(formItem.key, rules)}
				></Input>
			)
		case 'input':
			return (
				<Input
					format={'large'}
					variation={'clear'}
					{...register(formItem.key, rules)}
				></Input>
			)
		case 'text-input':
			return (
				<TextInput
					styles={classes.text_input}
					{...register(formItem.key, rules)}
				>
					{formItem.title}
				</TextInput>
			)

		case 'selector':
			return (
				<Controller
					name={String(formItem.key)}
					control={control}
					rules={rules}
					render={({ field }) => (
						<SelectOption
							{...field}
							options={formItem.options ? formItem.options : []}
						/>
					)}
				/>
			)

		case 'check-box':
			return (
				<CheckBox
					title={formItem.description}
					{...register(formItem.key, rules)}
				/>
			)

		case 'file-input':
			return (
				<div className={classes.upload}>
					<UploadFile
						{...register(formItem.key, {
							...rules,
							onChange: () => {
								const value = getValues(formItem.key)

								value[0] && setFile(value[0].name)
							},
						})}
					/>
					<Htag tag={'very-small'}> {t('ili-peretashite-fail-1')}</Htag>
					<div className={classes.file_name}>{file && file}</div>
				</div>
			)
		default:
			return <></>
	}
}

interface IRenderFormProps<T> {
	formItem: IConbineFormConstructor<T>
	control: any
	register: any
	getValues: any
	watch: any
	reset: any
}
