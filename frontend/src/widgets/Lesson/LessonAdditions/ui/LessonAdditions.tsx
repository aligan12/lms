import { useSelector } from 'react-redux'

import classes from './LessonAdditions.module.scss'

import { DownloadingFileButton } from 'features/DownloadingFileButton'
import { getAdditionsData } from 'features/Lesson/CreateLessonAdditionForm'

import { IAdditionData } from 'entities/Lesson/types'

import { classnames as cn } from 'shared/lib'
import { Htag, List } from 'shared/ui'

export const LessonAdditions = ({ styles }: ILessonAdditionsProps) => {
	// const data = {
	// 	title: 'Введение в программирование',
	// 	video: 'https://www.youtube.com/embed/i-uvtDKeFgE',
	// 	additions: [
	// 		{ title: 'Презентация', file: 'https://www.youtube.com/' },
	// 		{ title: 'Регламент', file: 'https://www.youtube.com/' },
	// 		{ title: 'Книга', file: 'https://www.youtube.com/' },
	// 	],

	// 	lesson: [
	// 		{
	// 			title: 'Python Install',
	// 			type: 'text',
	// 			content: `Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC,
	// 				search in the start bar for Python or run the following on the Command Line (cmd.exe):
	// 				To play your video on a web page, do the following:

	// 					Upload the video to YouTube
	// 					Take a note of the video id
	// 					Define an <iframe> element in your web page
	// 					Let the src attribute point to the video URL
	// 					Use the width and height attributes to specify the dimension of the player
	// 					Add any other parameters to the URL (see below)`,
	// 		},
	// 		{
	// 			title: null,
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			title: null,
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			title: 'Python',
	// 			type: 'text',
	// 			content:
	// 				'Many PCs and Macs will have python already installed.To check if you have python installed on a Windows PC, search in the start bar for Python or run the following on the Command Line (cmd.exe):',
	// 		},
	// 		{
	// 			title: null,
	// 			type: 'code',
	// 			content: 'C:UsersYour Name>python --version',
	// 		},
	// 	],
	// }

	const additions = useSelector(getAdditionsData)

	return (
		<div className={cn(classes.LessonAdditions, [styles])}>
			<div className={classes.title}>
				<Htag tag={'medium'}>Дополнительные материалы</Htag>
			</div>
			<div className={classes.file_box}>
				<List
					variation={'card'}
					items={additions}
					renderItem={(addition: IAdditionData) => (
						<DownloadingFileButton
							file={addition.file}
							title={addition.title}
						/>
					)}
				></List>
			</div>
		</div>
	)
}

interface ILessonAdditionsProps {
	styles?: string
}
