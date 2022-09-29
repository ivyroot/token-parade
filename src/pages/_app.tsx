import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: true,
// })

import LCanvas from '@/components/layout/canvas'


function App({ Component, pageProps = { title: 'index' } }) {
  const [focusedNft, setFocusedNft] = useState(null)
  const onFocus = (nftInfo) => {
    setFocusedNft(nftInfo)
  }
  const fullProps = { ...pageProps, onFocus, focusedNft }
  return (
    <>
      <Header title={pageProps.title} />
        <Dom>
          <QueryClientProvider client={queryClient}>
            <Component {...fullProps} />
          </QueryClientProvider>
        </Dom>
        {Component?.r3f && <LCanvas>{Component.r3f(fullProps)}</LCanvas>}
    </>
  )
}

export default App
