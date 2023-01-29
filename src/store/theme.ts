import { create } from 'zustand'

/**
 * Component : Store > Theme
 * ---
 * Store that handle the theme as an example for zustand
 */

export type ThemeStore = {
    color: string
    changeColor: () => void
}

const useThemeStore = create<ThemeStore>(set => ({
    color: 'white',
    changeColor: () => set(state => ({ color: state.color === 'white' ? '#23414e' : 'white' })),
}))
export default useThemeStore
