import { IStateSchema } from 'app/providers/StoreProvider'

export const getListGradeData = (state: IStateSchema) => state.listGradeData.gradeList
