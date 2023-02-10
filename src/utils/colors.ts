import { Color } from '@prisma/client'

// eslint-disable-next-line no-unused-vars
export const saveColor = async (reactionTime: number, color: string, addColor: (data: Color) => void) => {
    try {
        const colorToSave = {
            color,
            reactionTime,
            time: new Date().toLocaleDateString(),
        }
        const response = await fetch('/api/color', {
            method: 'POST',
            body: JSON.stringify(colorToSave),
        })
        addColor(await response.json())
    } catch (error) {
        throw new Error("Une erreur est survenue, contacter l'administrateur")
    }
}
