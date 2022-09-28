import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/Instructions'
import Shader from '@/components/canvas/Shader/Shader'
import { UseAddressTokens, NftTokenInfo, ResponseStatus, NftTokenResponse } from '@/hooks/UseAddressTokens'

import { NftDisplay } from '@/components/canvas/NftDisplay'

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
      <Instructions />
    </>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => {
  const tokenResults = UseAddressTokens("chd.eth");
  const nftArray = tokenResults.data ? tokenResults.data : [];
  return (
    <>
      <NftDisplay tokenInfo={nftArray[0]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
