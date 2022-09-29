import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/Instructions'
import Shader from '@/components/canvas/Shader/Shader'
import { UseAddressTokens, NftTokenInfo, ResponseStatus, NftTokenResponse } from '@/hooks/UseAddressTokens'

import { NftDisplay } from '@/components/canvas/NftDisplay'
import { NftGroup } from '@/components/canvas/NftGroup'
import { ParadeInfo } from '@/components/dom/ParadeInfo'
import { AddressInput } from '@/components/dom/AddressInput'


// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
//   ssr: false,
// })



// dom components goes here
const Page = (props) => {
  return (
    <>
      <ParadeInfo focusedNft={props.focusedNft} onRestart={props.onRestart} />
      <AddressInput onRestart={props.onRestart} />
    </>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => {
  return (
    <>
      <NftGroup initialPos={[0, 0, 0]} onFocus={props.onFocus} startedAt={props.startedAt} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Project Title',
    },
  }
}
