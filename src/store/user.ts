/* eslint-disable no-unused-vars */
import { StateCreator, create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
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

type MyPersist = (config: StateCreator<UserStore>, options: PersistOptions<UserStore>) => StateCreator<UserStore>

const useUserStore = create<UserStore>(
    (persist as MyPersist)(
        set => ({
            name: '',
            age: null,
            setName: () => set(state => ({ name: state.name })),
            setAge: () => set(state => ({ age: state.age })),
            setUser: data => set(data),
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
        }
    )
)

export default useUserStore
