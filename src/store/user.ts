/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
/**
 * Component : Store > Theme
 * ---
 * Store that handle the theme as an example for zustand
 */

export type UserStore = {
    name: string
    age: number | null
    setName: (name: string) => void
    setAge: (age: number) => void
    setUser: (data: any) => void
}

const useUserStore = create<UserStore>(set => ({
    name: 'Alex Caissy',
    age: 28,
    setName: () => set(state => ({ name: state.name })),
    setAge: () => set(state => ({ age: state.age })),
    setUser: (data: any) => set(data),
}))
persist(useUserStore, {
    name: 'user-storage', // name of the item in the storage (must be unique)
})

export default useUserStore
