import classes from './CreateModulePage.module.scss'

import { EditModuleProgram } from 'widgets/Module/EditModuleProgram'

import { BackButton } from 'features/BackButton'
import { CreateModuleForm } from 'features/Module/CreateModuleForm'
import { ModuleTrashList } from 'features/Module/ModuleTrashList'

import { classnames as cn } from 'shared/lib'
import { Hr } from 'shared/ui'

const CreateModulePage = ({ styles }: ICreateModulePageProps) => {
	return (
		<div className={cn(classes.CreateModulePage, [styles])}>
			<BackButton />
			<div className={classes.course_card}>
				<div className={classes.form_wrapper}>
					<CreateModuleForm />
					<Hr />
					<ModuleTrashList />
				</div>
			</div>
			<div>
				<EditModuleProgram />
			</div>
		</div>
	)
}

export default CreateModulePage
interface ICreateModulePageProps {
	styles?: string
}
