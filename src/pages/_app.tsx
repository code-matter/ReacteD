/* eslint-disable no-unused-vars */
import { ConfigProvider } from 'antd'
import { THEME } from 'assets/styles/config'
import 'assets/styles/styles.scss'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithI18Next } from 'ni18n'
import { ReactElement, ReactNode, useEffect } from 'react'
import useThemeStore, { ThemeStore } from 'store/theme'
import { ni18nConfig } from '../../ni18n.config'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

// Interaface
declare global {
    interface Window {
        Cypress?: Cypress.Cypress
        store?: ThemeStore
    }
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    // Logic to attach zustand store to window for testing.
    // TODO: Find a way to attach ALL slices for scalability
    const themeStore = useThemeStore()

    useEffect(() => {
        if (window.Cypress) {
            window.store = themeStore
        }
    }, [themeStore])

    // Logic for auth here ?
    const getLayout = Component.getLayout ?? ((page: any) => page)

    return getLayout(
        <ConfigProvider theme={THEME}>
            <Component {...pageProps} />
        </ConfigProvider>
    )
}

export default appWithI18Next(App, ni18nConfig)
