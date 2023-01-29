import Icon from 'components/elements/Icon'
import IntlBtn from 'components/elements/IntlBtn'
import Image from 'next/image'
import { useState } from 'react'

type TNav = {}

const Nav = ({}: TNav) => {
    const [navOpen, setNavOpen] = useState<Boolean>(false)

    return (
        <div className={`nav ${navOpen ? 'opened' : ''}`}>
            <section className='nav--header'>
                {navOpen && (
                    <>
                        <IntlBtn />
                        <Image src='logo.svg' width={navOpen ? 100 : 0} height={navOpen ? 50 : 0} alt='Unifika' />
                    </>
                )}
                <Icon icon={navOpen ? 'ChevronRight' : 'ChevronLeft'} onClick={() => setNavOpen(!navOpen)} />
            </section>
        </div>
    )
}

export default Nav
