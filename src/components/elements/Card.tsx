import { ReactElement, forwardRef } from 'react'

export type TCard = {
    title?: string
    children?: ReactElement | ReactElement[]
    // ref: RefObject<HTMLDivElement>
}

const Card = forwardRef(function Card({ title, children }: TCard, ref: any) {
    return (
        <div className='card--container' ref={ref}>
            <h1>{title}</h1>
            {children}
        </div>
    )
})

export default Card
