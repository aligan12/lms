import { IStateSchema } from 'app/providers/StoreProvider'

export const getLessonAboutModuleList = (state: IStateSchema) => state?.createLessonAbout.module_list
