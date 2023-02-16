export const saveColor = async (reactionTime: number, color: string | undefined, addColor: any) => {
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
