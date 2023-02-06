/* eslint-disable no-unused-vars */
import { Color, PrismaClient } from '@prisma/client'
import Card from 'components/elements/Card'
import { COLORS } from 'constants/colors'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Tooltip, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts'

type TDashboard = {
    colors: Color[]
    max: Color
}

const prisma = new PrismaClient()

export const getServerSideProps = async () => {
    let colors = await prisma.color.groupBy({
        by: ['color'],
        _sum: {
            reactionTime: true,
        },
        _avg: {
            reactionTime: true,
        },
        orderBy: {
            color: 'asc',
        },
    })

    let domainMax = await prisma.color.findFirst({
        orderBy: {
            reactionTime: 'desc',
        },
    })

    return {
        props: { colors, max: domainMax },
    }
}

const Dashboard = ({ colors, max }: TDashboard) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)
    useEffect(() => {
        setContainerWidth(containerRef.current?.clientWidth)
    }, [containerRef.current])
    console.log('max', max)
    return (
        <div className='dashboard'>
            <Card title='Temps de réaction par couleur' ref={containerRef}>
                <ResponsiveContainer width='100%' height={500}>
                    <BarChart
                        data={colors}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey={'color'} />
                        <YAxis domain={[0, Math.round(max?.reactionTime / 100) * 100 + 100]} />
                        <Tooltip
                            payload={colors}
                            labelFormatter={() => 'Temps de réaction moyen'}
                            separator=''
                            formatter={(value: any, name: any, props: any) => [`${value} ms`, '']}
                            wrapperStyle={{
                                outline: 'none',
                            }}
                            contentStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                            labelStyle={{ fontSize: 18, fontWeight: 600 }}
                        />
                        <Bar
                            dataKey={'_avg.reactionTime'}
                            barSize={(containerWidth && containerWidth / (colors.length - 1)) || 50}
                        >
                            {colors.map((color: Color) => (
                                <Cell key={color.color} fill={COLORS.find(col => col.name === color.color)?.hex} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}

export default Dashboard