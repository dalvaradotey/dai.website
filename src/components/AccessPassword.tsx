import { encrypt } from '@/helpers/encrypt'
import { GlobalContext } from '@/state/context'
import { useContext, useState } from 'react'
import Cookies from 'universal-cookie'

const USER_PASSWORD = process.env.USER_PASSWORD || ''
const cookies = new Cookies()

const AccessPassword = () => {
  const { setState } = useContext(GlobalContext)
  const [passwordInput, setPasswordInput] = useState<string>('')

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    if (passwordInput === USER_PASSWORD) {
      const in2Hours = 60 * 60 * 2;
      cookies.set('userAccessToken', encrypt(USER_PASSWORD), { path: '/', maxAge: in2Hours })
      setState('SET_INITIAL_STATE', { isSessionActive: true });
    } else {
      alert("Contraseña incorrecta")
    }

    event.preventDefault();
  }

  const handleChange = (e: any) => setPasswordInput(e?.target?.value);

  return (
    <form className="w-full md:w-fit" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingresa la contraseña</label>
        <input
          type="password"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
          value={passwordInput}
        />
        <input
          type="submit"
          value="Ingresar"
          className="mt-4 w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        />
      </div>
    </form>
  );
}

export default AccessPassword
