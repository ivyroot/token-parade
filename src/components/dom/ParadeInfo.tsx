import { UseParadeState  } from '@/hooks/UseParadeState'

export const ParadeInfo = (params) => {
    const address = UseParadeState((state) => state.addressValue)
    const description = address ? `Parade for ${address}` : 'Enter an address to start a parade!'
    const isLoading = UseParadeState((state) => state.isLoading)
    const loadingMsg = isLoading ? 'Loading...' : ''
    return (
        <div
        className='absolute left-0 max-w-lg px-4 py-2 text-s md:text-base text-gray-50'
        style={{
            maxWidth: 'calc(100% - 28px)',
        }}
        >
            <div className='mx-8 my-2 text-slate-400'>{description}</div>
            <div className='mx-8 my-2 text-slate-400'>{loadingMsg}</div>
        </div>
    )
}
