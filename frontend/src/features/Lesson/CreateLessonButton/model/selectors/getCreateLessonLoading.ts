import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateLessonLoading = (state: IStateSchema) => state.createLesson?.isLoading
