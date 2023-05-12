import { IState } from './interfaces/state.inteface'

export const INITIAL_STATE: IState = {
  isSessionActive: false,
  chatToken: null,
  chatMessages: [],
  chatUserName: '',
}
