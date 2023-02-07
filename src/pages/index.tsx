/* eslint-disable no-unused-vars */
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import { Portal } from 'components'
import { Modal } from 'antd'
import { COLORS, TColorChoice } from 'constants/colors'
import { Color } from '@prisma/client'
import useColorStore from 'store/color'

/**
 * Component : Pages > Home
 * ---
 * Homepage
 */

type THome = {}
const MIN_TIME = 500
const MAX_TIME = 5000

const Home: NextPageWithLayout = ({}: THome & any) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [time, setTime] = useState(0)
    const [tries, setTries] = useState(COLORS.length)
    const { colors, setColors } = useColorStore()
    const [colorChoices, setColorChoices] = useState<TColorChoice[]>(COLORS)

    const countDown = () =>
        setTimeout(() => {
            const tmpColors = colorChoices.filter(col => col.name !== color)
            const tmpColor = tmpColors[Math.floor(Math.random() * tmpColors.length)].name
            setColor(tmpColor)
            setTime(Date.now())
            setColorChoices(tmpColors)
        }, Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME))

    const handleOk = () => {
        setModalOpen(false)
        countDown()
    }
    const handleCancel = () => {
        reset()
    }
    const reset = () => {
        setColor('')
        setTime(0)
        setTries(COLORS.length)
        setModalOpen(true)
        setColorChoices(COLORS)
    }

    const handleClick = async (event: any) => {
        try {
            clearTimeout(countDown())
            const reactionTime = Date.now() - time
            saveColor(reactionTime)
            const currentTry = tries - 1
            if (confirm(`Votre reaction est de ${reactionTime}ms`)) {
                setTries(currentTry)
                if (currentTry <= 0) {
                    reset()
                    return
                }
                setColor('')
                handleOk()
            } else {
                reset()
            }
        } catch (error) {
            throw new Error("Veuillez contacter l'administrateur")
        }
    }

    const saveColor = async (reactionTime: number) => {
        try {
            const colorToSave = {
                color,
                reactionTime,
                time: new Date().toLocaleDateString(),
            }
            const response = await fetch('/api/color', {
                method: 'POST',
                body: JSON.stringify(colorToSave),
            })
            setColors(await response.json())
        } catch (error) {
            throw new Error("Une erreur est survenue, contacter l'administrateur")
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
            <Head>
                <title>DEV - Reacted</title>
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
                        veuillez noter que les données collectées sont totalement anonymes et que vous pouvez
                        recommencer ce test autant de fois que vous voulez.
                        <br />
                        <br />
                        Vous aurez {COLORS.length} tentatives.
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={color ? handleClick : () => null}
                >
                    {!color && <h1>PRÉPARE TOI!</h1>}
                </div>
                <style jsx>
                    {`
                        .react--container {
                            background-color: ${COLORS.find(col => col.name === color)?.hex ?? ''};
                        }
                    `}
                </style>
            </main>
        </>
    )
}

export default Home

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
