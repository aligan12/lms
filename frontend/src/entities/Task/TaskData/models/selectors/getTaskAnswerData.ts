import { IStateSchema } from 'app/providers/StoreProvider'

export const getTaskAnswerData = (state: IStateSchema) => state.retrieveTaskData?.taskAnswerData
