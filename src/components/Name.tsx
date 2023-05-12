"use client";
import { useContext, useState } from "react";
import ChatService from "@/services/ChatService";
import Cookies from 'universal-cookie'
import { GlobalContext } from "@/state/context";

const cookies = new Cookies()

const Name = () => {
  const [userName, setUserName] = useState<string>("")
  const { setState } = useContext(GlobalContext)

  const chatService = new ChatService();

  const handleChange = (e: any) => setUserName(e?.target?.value)
  
  const handleSubmit = async() => {
    if (!userName) alert('Ingresa un nombre para continuar')

    const chat = await chatService.post({ userName, messages: [] })

    const in24Hours = 60 * 60 * 24;
    cookies.set('chatToken', chat?.id, { path: '/', maxAge: in24Hours })
    setState('SET_INITIAL_STATE', { chatToken: chat?.id });
  }

  return (
    <div className="w-60">
      <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Cuál es tu nombre?</label>
      <input
        type="text"
        id="userName"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        value={userName}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Enviar
      </button>
    </div>
  )
}

export default Name;