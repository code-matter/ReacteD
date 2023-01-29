/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import { MouseEventHandler, useEffect, useState } from 'react'
// import useUserStore from 'store/user'

type TReact = {
    colors: string[]
}

const MIN_TIME = 2000
const MAX_TIME = 10000

const React = ({ colors }: TReact) => {
    // const { name, age } = useUserStore()

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [color, setColor] = useState('')
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
            setColor('#eae7ee')
            handleOk()
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
                    Est adipisicing exercitation culpa irure irure aliqua nostrud cupidatat eiusmod anim deserunt. Anim
                    excepteur commodo ut consequat. Anim velit exercitation occaecat deserunt ipsum do duis et dolore.
                    Exercitation ea in veniam in quis commodo sint id reprehenderit voluptate qui. Ut aute ut elit
                    fugiat culpa incididunt minim magna anim. Eu cupidatat ea in ad adipisicing excepteur culpa aliquip.
                    Mollit nisi mollit ea aute aute veniam mollit occaecat commodo excepteur excepteur.
                    <br />
                    <br />
                    Si tu es prêt, clic sur OK pour commencer le test, une couleur va apparaître!
                </p>
            </Modal>
            <div className='react--container' style={{ backgroundColor: color }} onClick={handleClick} />
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
