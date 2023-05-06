import Image from 'next/image'
import { useEffect } from 'react'
import Form from './form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24">
      <Form />
    </main>
  )
}
