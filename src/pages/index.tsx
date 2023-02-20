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
    const [updateTime, setUpdateTime] = useState<number>(0)
    const [tries, setTries] = useState(colorChoices.length)
    const [start, setStart] = useState<boolean>(false)

    const router = useRouter()

    const updateColors = () => {
        console.log('color', color)
        const tmpColors = colorChoices.filter(col => col.name !== color)
        const tmpColor = tmpColors[Math.floor(Math.random() * tmpColors.length)].name
        console.log('tmpColors', tmpColors)
        console.log('tmpColor', tmpColor)
        setUpdateTime(Date.now())
        setColor(tmpColor)
        setColorChoices(tmpColors)
        setStart(state => !state)
    }

    // When OK on modal
    const handleOk = () => {
        setModalOpen(false)
        setStart(true)
        setColor(undefined)
    }

    const handleClick = () => {
        const remainingTries = tries - 1
        setTries(remainingTries)
        const reactionTime = Date.now() - updateTime
        if (confirm(`Votre temps de réaction est de ${reactionTime}ms`)) {
            setStart(false)
            handleOk()
        } else router.push('results')
    }

    useEffect(() => {
        setModalOpen(true)
        return () => {
            setModalOpen(false)
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!start) return
        const countDown = setTimeout(() => {
            updateColors()
        }, delay)

        return () => {
            clearTimeout(countDown)
        }
    }, [start])

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
