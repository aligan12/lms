import { IStateSchema } from 'app/providers/StoreProvider'

export const getAllTaskData = (state: IStateSchema) => state.retrieveTaskData?.allTaskData
