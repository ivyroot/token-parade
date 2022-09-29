import { UseParadeState  } from '@/hooks/UseParadeState'
import { TokenInfo } from '@/components/dom/TokenInfo'

export const ParadeInfo = (params) => {
    const address = UseParadeState((state) => state.addressValue)
    const description = address ? `Token Parade` : 'Enter an Ethereum address to start NFT parade!'
    const isLoading = UseParadeState((state) => state.isLoading)
    const loadingMsg = isLoading ? 'Loading...' : ''
    const handleRestart = () => {
        if (params.onRestart) {
            params.onRestart();
        }
    }
    return (
        <div
        className='absolute left-0 max-w-lg px-4 py-2 text-s md:text-base text-gray-50'
        style={{
            maxWidth: 'calc(100% - 28px)',
        }}
        >
            <div className='mx-8 my-2 text-slate-400'>{description} <button onClick={handleRestart}>(restart)</button></div>
            <div className='mx-8 my-2 text-slate-400'>{loadingMsg}</div>
            <TokenInfo token={params.focusedNft} />
        </div>
    )
}
