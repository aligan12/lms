import { IStateSchema } from 'app/providers/StoreProvider'

export const getError = (state: IStateSchema) => state.createLessonAddition?.error
