import create from 'zustand'


export const UseParadeState = create((set) => ({
    active: false,
    setActive: (val: boolean) => set((state) => ({ active: val })),
    addressInput: '',
    setAddressInput: (val: string) => set((state) => ({ addressInput: val })),
    addressValue: null,
    setAddressValue: (val: string) => set((state) => ({ addressValue: val })),
    isLoading: false,
    setIsLoading: (val: boolean) => set((state) => ({ isLoading: val }))
}))
