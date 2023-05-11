import { ReactNode, useReducer } from 'react'
import { GlobalContext } from './context'
import reducers from './reducers'
import { INITIAL_STATE } from './initial-state'

interface IProps {
  children: ReactNode
}

export const GlobalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE)

  const setState = (type: string, payload: any) => dispatch({ type, payload })

  return <GlobalContext.Provider value={{ state, setState }}>{children}</GlobalContext.Provider>
}
