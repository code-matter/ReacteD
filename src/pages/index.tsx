import Head from 'next/head'
import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import { Portal } from 'components'
import { Button, Form, Input, InputNumber } from 'antd'
import useUserStore from 'store/user'
import { useRouter } from 'next/router'

/**
 * Component : Pages > Home
 * ---
 * Homepage
 */
const Home: NextPageWithLayout = () => {
    const { setUser } = useUserStore()
    const router = useRouter()
    const handleSubmit = (data: FormData) => {
        // fetch('/api/form', { method: 'POST', body: JSON.stringify(data) })
        setUser(data)
        router.push('/react')
    }
    return (
        <>
            <Head>
                <title>Reacted</title>
                <meta name='description' content='Reacted' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='main'>
                <div className='form--container'>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <div className='form--item__flex'>
                            <Form.Item name='name' label='Nom' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name='age' label='Age' rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </div>
                        <Button htmlType='submit' color='primary'>
                            Soumettre
                        </Button>
                    </Form>
                </div>
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
