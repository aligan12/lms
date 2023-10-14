import { IStateSchema } from 'app/providers/StoreProvider'

export const getCreateTaskAnswerLoading = (state: IStateSchema) => state.createTaskAnswer?.isLoading
