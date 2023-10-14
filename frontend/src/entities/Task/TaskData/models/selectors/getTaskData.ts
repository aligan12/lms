import { IStateSchema } from 'app/providers/StoreProvider'

export const getTaskData = (state: IStateSchema) => state.retrieveTaskData?.taskData
