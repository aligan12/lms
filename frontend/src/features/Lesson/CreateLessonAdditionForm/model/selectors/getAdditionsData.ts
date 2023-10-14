import { IStateSchema } from 'app/providers/StoreProvider'

export const getAdditionsData = (state: IStateSchema) => state?.createLessonAddition?.additions_data
