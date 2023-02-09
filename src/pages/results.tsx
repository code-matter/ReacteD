import { Color } from '@prisma/client'
import { Button } from 'antd'
import { Portal } from 'components'
import Card from 'components/elements/Card'
import { COLORS } from 'constants/colors'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useColorStore from 'store/color'

const Results = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined)

    const { colors } = useColorStore()
    const router = useRouter()
    console.log(
        'colors',
        _.sortBy(colors, col => col.color)
    )
    useEffect(() => {
        if (colors.length <= 0) router.replace('/')
    }, [])

    useEffect(() => {
        setContainerWidth(containerRef.current?.clientWidth)
    }, [containerRef.current])

    return (
        <div className='results'>
            <h1>Voici vos résultats:</h1>
            <Card title='Temps de réaction par couleur' ref={containerRef}>
                <ResponsiveContainer width='100%' height={400}>
                    <BarChart
                        data={_.sortBy(colors, col => col.color)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey={'color'} />
                        <YAxis />
                        <Tooltip
                            payload={colors}
                            labelFormatter={() => 'Temps de réaction'}
                            separator=''
                            formatter={(value: any) => [`${value} ms`, '']}
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
                            dataKey={'reactionTime'}
                            barSize={(containerWidth && containerWidth / (colors.length - 1)) || 50}
                        >
                            {_.sortBy(colors, col => col.color).map((color: Color) => (
                                <Cell key={color.color} fill={COLORS.find(col => col.name === color.color)?.hex} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
            <Button onClick={() => router.replace('/')} size='large'>
                Refaire le test
            </Button>
        </div>
    )
}

/**
 * getLayout
 * ---
 * Defines the component's layout
 *
 * @prop { ReactElement } page - Page to render within the layout
 */
Results.getLayout = function getLayout(page: ReactElement) {
    return <Portal>{page}</Portal>
}

export default Results
