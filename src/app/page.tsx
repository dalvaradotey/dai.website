"use client"
import { GlobalProvider } from '@/state/provider';
import Container from './container';

export default function Home() {
  return (
    <GlobalProvider>
      <Container />
    </GlobalProvider>
  )
}
