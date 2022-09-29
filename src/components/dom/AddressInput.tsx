import { UseParadeState  } from '@/hooks/UseParadeState'
import { useState, useEffect, useRef } from 'react'

export const AddressInput = () => {
  const addressInput = UseParadeState((state) => state.addressInput)
  const setAddressInput = UseParadeState((state) => state.setAddressInput)
  const setAddressValue = UseParadeState((state) => state.setAddressValue)
  const setIsLoading = UseParadeState((state) => state.setIsLoading)
  const startParade = () => {
    setAddressValue(addressInput)
    setIsLoading(true)
  }
  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm bg-gray-900 shadow-xl md:text-base bottom-8 left-1/2 text-gray-50 transform -translate-x-1/2'
      style={{
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <div className='tracking-wider'>
        Enter Address: &nbsp;
        <input type="text" className='mx-8 text-slate-800 w-96' placeholder='0x123abc456...' value={addressInput} onChange={(e) => {setAddressInput(e.target.value)}} />
        <button onClick={startParade}>Go!</button>
      </div>
    </div>
  )
}
