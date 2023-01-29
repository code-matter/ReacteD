import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { IconBaseProps } from 'react-icons'

type TIcons = {
    [key: string]: ComponentType<IconBaseProps>
}

export const ICONS: TIcons = {
    ChevronLeft: dynamic(() => import('react-icons/fa').then(res => res.FaChevronLeft)),
    ChevronRight: dynamic(() => import('react-icons/fa').then(res => res.FaChevronRight)),
}
