// import { Nav } from 'components'
import Footer from 'components/modules/Footer'
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
        <>
            <main className='portal' data-cy='portal'>
                {/* <Nav /> */}
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Portal
