import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateLessonError = (state: IStateSchema) => state.createLesson?.error
