import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTaskAnswerError = (state: IStateSchema) => state.createTaskAnswer?.error
