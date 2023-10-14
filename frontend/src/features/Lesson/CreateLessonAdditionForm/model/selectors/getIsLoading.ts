import { IStateSchema } from 'app/providers/StoreProvider'

export const getIsLoading = (state: IStateSchema) => state?.createLessonAddition?.isLoading
