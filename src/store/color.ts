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
    addColor: (data: Color) => void
    resetColors: () => void
}

// type MyPersist = (config: StateCreator<ColorStore>, options: PersistOptions<ColorStore>) => StateCreator<ColorStore>

const useColorStore = create<ColorStore>(
    set => ({
        colors: [],
        addColor: (data: Color) => set(state => ({ colors: [...state.colors, data] })),
        resetColors: () => set(() => ({ colors: [] })),
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
