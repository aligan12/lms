import { IStateSchema } from 'app/providers/StoreProvider'

export const getUpdateCourseIsLoading = (state: IStateSchema) => state.updateCourseData?.isLoading
