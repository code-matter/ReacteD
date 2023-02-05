import { Color, PrismaClient } from '@prisma/client'
import { BarChart } from '@tremor/react'
import _ from 'lodash'
import '@tremor/react/dist/esm/tremor.css'

type TDashboard = {
    colors: Color[]
}

const prisma = new PrismaClient()

export const getServerSideProps = async () => {
    let colors = await prisma.color.findMany()
    let rtByColor = _.groupBy(colors, col => col.color)
    const t = _.map(rtByColor, color => {
        // color.reduce((prev, next) => {
        //     return prev + next.reactionTime
        // }, 0)
        // console.log(
        // 'color',
        color.reduce((p, n) => p + n.reactionTime, 0)
        // )
    })
    // let test = _.reduce(
    //     rtByColor,
    //     (prev, next) => {
    //         const newSum = next.reduce((p, n) => p + n.reactionTime, 0)
    //         return prev + newSum
    //     },
    //     0
    // )
    console.log('t', t)
    return {
        props: { colors },
    }
}

const Dashboard = ({ colors }: TDashboard) => {
    console.log(colors)
    console.log(_.groupBy(colors, col => col.color))

    return (
        <div>
            {colors.map((c: Color) => (
                <div key={c.id} style={{ backgroundColor: c.color }}>
                    {c.reactionTime}
                </div>
            ))}

            <BarChart
                data={colors}
                categories={['reactionTime']}
                dataKey='color'
                colors={['blue']}
                valueFormatter={undefined}
                layout='horizontal'
                stack={false}
                relative={false}
                startEndOnly={false}
                showXAxis={true}
                showYAxis={true}
                autoMinValue={false}
                yAxisWidth='w-14'
                showTooltip={true}
                showLegend={true}
                showGridLines={true}
                showAnimation={true}
                height='h-80'
                marginTop='mt-0'
            />
        </div>
    )
}

export default Dashboard
