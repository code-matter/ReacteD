/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from 'react'
// import useUserStore from 'store/user'

type TReact = {
    colors: string[]
}

const MIN_TIME = 2000
const MAX_TIME = 10000

const React = ({ colors }: TReact) => {
    // const { name, age } = useUserStore()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string | null>(null)
    const [time, setTime] = useState(0)
    const countDown = () =>
        setTimeout(() => {
            setColor(colors[Math.floor(Math.random() * colors.length)])
            setTime(Date.now())
        }, Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME))

    const handleOk = () => {
        setModalOpen(false)
        countDown()
    }
    const handleCancel = () => {
        setModalOpen(false)
    }

    const handleClick = (event: any) => {
        clearTimeout(countDown())
        if (confirm(`Votre reaction est de ${Date.now() - time}ms`)) {
            setColor(null)
            handleOk()
        } else {
            router.push('/')
        }
    }

    useEffect(() => {
        setModalOpen(true)
        return () => {
            setModalOpen(false)
        }
    }, [])

    return (
        <>
            <Modal title='Mesure ton temps de réaction!' open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Prépare-toi, une fois que tu auras cliqué sur OK, une couleur devrait apparaître d'ici 10secondes.
                    <br />
                    Clic n'importe où dès que tu vois une couleur apparaître.
                </p>
            </Modal>
            <div
                className='react--container'
                style={{
                    backgroundColor: color ?? '',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={handleClick}
            >
                {!color && <h1>PRÉPARE TOI!</h1>}
            </div>
        </>
    )
}

export default React

export const getServerSideProps = () => {
    return {
        props: {
            colors: ['#340068', '#FF6978', '#B1EDE8', '#6D435A', '#FF9F1C'],
        },
    }
}

// React.getLayout = function getLayout(page: ReactElement) {
//     return <Portal>{page}</Portal>
// }
