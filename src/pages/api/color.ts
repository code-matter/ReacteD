// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Color, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
    // Because of stringify with fetch
    const colorData: Color = JSON.parse(req.body)

    const savedColors = await prisma.ColorAlexDev.create({
        data: colorData,
    })

    res.json(savedColors)
}

export default handler
