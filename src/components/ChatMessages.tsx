import ChatService from "@/services/ChatService"
import { GlobalContext } from "@/state/context"
import { useContext, useState } from "react"

const ChatMessages = () => {
  const { state, setState } = useContext(GlobalContext)
  const chatService = new ChatService

  const getMessages = async() => {
    const chat = await chatService.get(state?.chatToken)

    setState('SET_INITIAL_STATE', {
      chatUserName: chat?.userName,
      chatMessages: chat?.messages,
    })
  }

  useState(() => { getMessages() })

  return (
    <>
      {!!state?.chatMessages?.length && (
        <div className="w-full mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Historial Chat</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {state?.chatMessages?.reverse()?.map((chatMessage, key) => (
                <li key={key} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className="font-bold">Q: </span>{chatMessage?.question}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-3">
                        <span className="font-bold">A: </span> {chatMessage?.answer}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">
                        {chatMessage?.createdAt}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatMessages
