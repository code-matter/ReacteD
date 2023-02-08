/* eslint-disable no-unused-vars */
import { Color } from '@prisma/client'
import { StateCreator, create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
/**
 * Component : Store > Theme
 * ---
 * Store that handle the theme as an example for zustand
 */

export type ColorStore = {
    colors: Color[]
    setColors: (data: Color) => void
}

// type MyPersist = (config: StateCreator<ColorStore>, options: PersistOptions<ColorStore>) => StateCreator<ColorStore>

const useColorStore = create<ColorStore>(
    set => ({
        colors: [],
        setColors: (data: Color) => set(state => ({ colors: [...state.colors, data] })),
    })
    // (persist as MyPersist)(
    //     set => ({
    //         colors: [],
    //         setColors: (data: Color) => set(state => ({ colors: [...state.colors, data] })),
    //     }),
    //     {
    //         name: 'color-storage', // name of the item in the storage (must be unique)
    //     }
    // )
)

export default useColorStore
