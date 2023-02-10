import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
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

    const [color, setColor] = useState<string>('')
    const [time, setTime] = useState(0)
    const [tries, setTries] = useState(COLORS.length)
    const { resetColors, addColor } = useColorStore()
    const [colorChoices, setColorChoices] = useState<TColorChoice[]>(COLORS)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const countDown = (isTooLong?: boolean) =>
        setTimeout(() => {
            const tmpColors = isTooLong ? colorChoices : colorChoices.filter(col => col.name !== color)
            const tmpColor = isTooLong
                ? colorChoices[Math.floor(Math.random() * tmpColors.length)].name
                : tmpColors[Math.floor(Math.random() * tmpColors.length)].name
            setColor(tmpColor)
            setTime(Date.now())
            setColorChoices(tmpColors)
        }, Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME))

    const handleOk = (isTooLong?: boolean) => {
        setModalOpen(false)
        countDown(isTooLong)
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

    const handleClick = async () => {
        try {
            clearTimeout(countDown())
            const reactionTime = Date.now() - time
            if (reactionTime > 1000) {
                alert('Trop long, on réessaye!')
                setColor('')
                handleOk(true)
                return
            }
            saveColor(reactionTime, color, addColor)
            const currentTry = tries - 1
            if (confirm(`Votre reaction est de ${reactionTime}ms`)) {
                setTries(currentTry)
                if (currentTry <= 0) {
                    // reset()
                    setModalOpen(false)
                    setIsLoading(true)
                    router.push('results')
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

    useEffect(() => {
        setModalOpen(true)
        resetColors()
        return () => {
            reset()
            setIsLoading(false)
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
                    onClick={color ? handleClick : () => null}
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
