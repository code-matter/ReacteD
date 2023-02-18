/* eslint-disable no-unused-vars */
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import { Portal } from 'components'
import { Modal, Spin } from 'antd'
import { COLORS, TColorChoice } from 'constants/colors'
import useColorStore from 'store/color'
import { useRouter } from 'next/router'
import { saveColor } from 'utils'

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
    const delay = Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME)
    const [color, setColor] = useState<string | undefined>(undefined)
    const [colorChoices, setColorChoices] = useState<TColorChoice[]>(COLORS)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)

    const router = useRouter()

    console.log('delay', delay)
    const countDown = (shouldReset?: boolean) => {
        return setTimeout(() => {
            updateColors(shouldReset)
        }, delay)
    }

    const updateColors = (shouldReset?: boolean) => {
        const tmpColors = shouldReset ? colorChoices : colorChoices.filter(col => col.name !== color)
        const tmpColor = shouldReset
            ? colorChoices[Math.floor(Math.random() * tmpColors.length)].name
            : tmpColors[Math.floor(Math.random() * tmpColors.length)].name
        setTime(Date.now())
        setColor(tmpColor)
        setColorChoices(tmpColors)
    }

    const handleOk = (shouldReset?: boolean) => {
        setColor(undefined)
        setModalOpen(false)
        countDown(shouldReset)
    }

    const handleClick = () => {
        console.log('color', color)
        clearTimeout(countDown())

        if (!color) {
            if (confirm('TRICHEUR!')) {
                handleOk(true)
            }
            return
        }
        const reactionTime = Date.now() - time
        // if (reactionTime > 1000) {
        //     alert('Trop long!')
        //     handleOk(true)
        // }
        if (confirm(`Votre temps de réaction est de ${reactionTime}ms`)) {
            handleOk()
        } else router.push('results')
        console.log('reactionTime', reactionTime)
    }

    useEffect(() => {
        setModalOpen(true)
        return () => {
            setModalOpen(false)
            setIsLoading(false)
            clearTimeout(countDown())
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
                    onOk={() => handleOk()}
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
                        Préparez-vous, une fois que vous aurez cliqué sur OK, une couleur devrait apparaître d'ici{' '}
                        {MAX_TIME / 1000} secondes.
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
                    onClick={handleClick}
                >
                    <Spin spinning={isLoading}>{!color && <h1>PRÉPAREZ-VOUS!</h1>}</Spin>
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
