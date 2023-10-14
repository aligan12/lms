import { IStateSchema } from 'app/providers/StoreProvider'

export const getLessonContents = (state: IStateSchema) => state.createLessonContent?.lesson_data
