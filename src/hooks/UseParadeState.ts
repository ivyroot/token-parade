import create from 'zustand'

export interface ParadeState {
    addressInput: string
    setAddressInput: (val: string) => void
    addressValue: string
    setAddressValue: (val: string) => void
    addressHex: string
    setAddressHex: (val: string) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
}

export const UseParadeState = create<ParadeState>((set) => ({
    addressInput: '',
    setAddressInput: (val: string) => set((state) => ({ addressInput: val })),
    addressValue: null,
    setAddressValue: (val: string) => set((state) => ({ addressValue: val })),
    addressHex: null,
    setAddressHex: (val: string) => set((state) => ({ addressHex: val })),
    isLoading: false,
    setIsLoading: (val: boolean) => set((state) => ({ isLoading: val }))
}))
