/* eslint-disable no-unused-vars */
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import { Portal } from 'components'
import { Modal } from 'antd'

/**
 * Component : Pages > Home
 * ---
 * Homepage
 */

type THome = {
    colors: string[]
    initColor: null | string
}
const MIN_TIME = 2000
const MAX_TIME = 10000
const NB_TRIES = 2

const Home: NextPageWithLayout = ({ colors, initColor }: THome & any) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string | null>(null)
    const [time, setTime] = useState(0)
    const [tries, setTries] = useState(NB_TRIES)
    const [results, setResults] = useState<any>([])

    const countDown = () =>
        setTimeout(() => {
            setColor(colors[Math.floor(Math.random() * colors.length)])
            setTime(Date.now())
        }, Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME))

    const handleOk = () => {
        console.log('OK')

        setModalOpen(false)
        countDown()
    }
    const handleCancel = () => {
        reset()
    }
    const reset = () => {
        setColor(null)
        setTime(0)
        setModalOpen(true)
    }

    const handleClick = (event: any) => {
        clearTimeout(countDown())
        const reactionTime = Date.now() - time
        const currentTry = tries - 1
        if (confirm(`Votre reaction est de ${reactionTime}ms`)) {
            setResults([...results, { color: color, rt: reactionTime }])
            setTries(currentTry)
            if (currentTry <= 0) {
                reset()
                return
            }
            setColor(null)
            handleOk()
        } else {
            reset()
        }
    }

    useEffect(() => {
        setModalOpen(true)
        setColor(null)
        return () => {
            setModalOpen(false)
        }
    }, [])

    return (
        <>
            <Head>
                <title>Reacted</title>
                <meta name='description' content='Reacted' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='main'>
                <Modal
                    title='Mesure ton temps de réaction!'
                    open={modalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    closable={false}
                    maskClosable={false}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <p>
                        Ce test est dans la cadre d'une recherche sur le temps de réaction en fonction des couleurs,
                        veuillez notez que les données collectés sont totalement anonyme et que vous pouvez recommencer
                        ce test autant de fois que vous voulez.
                        <br />
                        <br />
                        Vous aurez 10 tentatives.
                        <br />
                        <br />
                        Préparez-vous, une fois que vous aurez cliqué sur OK, une couleur devrait apparaître d'ici 10
                        secondes.
                        <br />
                        <br />
                        Cliquez n'importe où dès que vous voyez une couleur apparaître.
                    </p>
                </Modal>
                <div
                    className='react--container'
                    style={{
                        backgroundColor: color ? color : initColor,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={color ? handleClick : () => null}
                >
                    {!color && <h1>PRÉPARE TOI!</h1>}
                </div>
            </main>
        </>
    )
}

export default Home

export const getServerSideProps = () => {
    return {
        props: {
            colors: ['#340068', '#FF6978', '#B1EDE8', '#6D435A', '#FF9F1C'],
            initColor: null,
        },
    }
}

/**
 * getLayout
 * ---
 * Defines the component's layout
 *
 * @prop { ReactElement } page - Page to render within the layout
 */
Home.getLayout = function getLayout(page: ReactElement) {
    return <Portal>{page}</Portal>
}
