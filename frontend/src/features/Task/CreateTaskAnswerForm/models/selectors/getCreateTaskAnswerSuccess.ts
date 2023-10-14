import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTaskAnswerSuccess = (state: IStateSchema) => state.createTaskAnswer?.successful
