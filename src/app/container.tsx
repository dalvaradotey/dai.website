import { GlobalContext } from "@/state/context"
import { useContext, useEffect } from "react"
import AccessPassword from "@/components/AccessPassword"
import Chat from "@/components/Chat"
import Cookies from "universal-cookie"
import { decrypt } from "@/helpers/encrypt"

const USER_PASSWORD = process.env.USER_PASSWORD || ''
const cookies = new Cookies()

const Container = () => {
  const { state, setState } = useContext(GlobalContext)
  const userAccessToken = cookies?.get('userAccessToken')
  const chatToken = cookies?.get('chatToken')

  useEffect(() => {    
    if (!!userAccessToken && decrypt(userAccessToken) === USER_PASSWORD) {
      setState('SET_INITIAL_STATE', { isSessionActive: true })
    }

    if (!!chatToken) {
      setState('SET_INITIAL_STATE', { chatToken })
    }
  }, [userAccessToken])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24">
        {!state?.isSessionActive && <AccessPassword />}
        {state?.isSessionActive && <Chat />}
      </main>
    </>
  )
}

export default Container
