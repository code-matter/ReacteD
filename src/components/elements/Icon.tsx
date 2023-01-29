import { ICONS } from 'constants/icons'
import { ReactElement } from 'react'
import { IconBaseProps } from 'react-icons'

type TIcon = {
    icon: string
}

const Icon = ({ icon, ...props }: TIcon & IconBaseProps): ReactElement => {
    const Icon = ICONS[icon]
    return <Icon {...props} />
}

export default Icon
