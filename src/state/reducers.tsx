import { IState } from './interfaces/state.inteface'
import { IAction } from './interfaces/action.interface'

const reducer = (state: any, action: IAction): IState => {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return { ...state, ...action.payload }
    case 'ADD_LIST_STATE':
      return {
        ...state,
        [action?.payload?.field]: [...state?.[action?.payload?.field], { ...action?.payload?.data }],
      }
    case 'UPDATE_LIST_STATE':
      return {
        ...state,
        [action?.payload?.field]: state?.[action?.payload?.field].map((item: any) => {
          if (item?.id === action?.payload?.id) {
            return { ...item, ...action?.payload?.data }
          }

          return item
        }),
      }
    case 'DELETE_LIST_STATE':
      return {
        ...state,
        [action?.payload?.field]: state?.[action?.payload?.field].filter((item: any) => item?.id !== action?.payload?.id),
      }
    default:
      return state
  }
}

export default reducer
