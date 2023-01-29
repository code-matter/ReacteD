// import { Nav } from 'components'
import { ReactElement } from 'react'

/**
 * Component : Layout > Portal
 * ---
 * Layout for the portal side of the application.
 */

type TPortal = {
    children: ReactElement
}

const Portal = ({ children }: TPortal) => {
    return (
        <div className='portal' data-cy='portal'>
            {/* <Nav /> */}
            {children}
        </div>
    )
}

export default Portal
