import { UseParadeState  } from '@/hooks/UseParadeState'
import { useState, useEffect, useRef } from 'react'

export const AddressInput = (props) => {
  const addressInput = UseParadeState((state) => state.addressInput)
  const setAddressInput = UseParadeState((state) => state.setAddressInput)
  const addressValue = UseParadeState((state) => state.addressValue)
  const setAddressValue = UseParadeState((state) => state.setAddressValue)
  const setIsLoading = UseParadeState((state) => state.setIsLoading)
  const startParade = () => {
    if (addressInput != addressValue) {
    setAddressValue(addressInput)
    setIsLoading(true)
    } else if (props.onRestart) {
      props.onRestart();
    }
  }
  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm shadow-xl bg-slate-300 md:text-base bottom-40 sm:bottom-8 left-1/2 text-gray-50 transform -translate-x-1/2'
      style={{
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <div className='tracking-wider'>
        Enter Address: &nbsp;
        <input type="text" className='p-2 mx-8 text-sm text-slate-800 md:w-96' placeholder='0x123abc456...' value={addressInput} onChange={(e) => {setAddressInput(e.target.value)}} />
        <button onClick={startParade}>Go!</button>
      </div>
    </div>
  )
}
