import { createContext } from 'react'
import { IState } from './interfaces/state.inteface'

export type IProps = {
  state: IState
  setState: (type: string, payload: any) => void
}

export const GlobalContext = createContext<IProps>({} as IProps)