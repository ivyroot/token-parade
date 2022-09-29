import { UseParadeState  } from '@/hooks/useParadeState'

export const ParadeInfo = (params) => {
    const address = UseParadeState((state) => state.addressValue)
    return (
        <div
        className='absolute max-w-lg px-4 py-2 text-sm bg-gray-900 shadow-xl md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2'
        style={{
            maxWidth: 'calc(100% - 28px)',
        }}
        >
            <div className='mx-8 my-2 text-slate-400'>Parade is {false ? 'active' : 'not running yet'}</div>
            <div className='mx-8 my-2 text-slate-400'>Address: {address}</div>
        </div>
    )
}
