import '../styles/globals.css';
import type { AppProps } from 'next/app';
// @ts-ignore
import { toast } from 'react-hot-toast';
import { useMemo } from 'react';
import Header from '../src/components/Header';
import { Provider } from 'react-redux';
import { store } from "../src/state"

import { Web3ContextProvider } from '../src/contexts/Web3';


export default function App({ Component, pageProps }: AppProps) {

    /**
     * wrap your app content with WalletProvider and WalletModalProvider
     * WalletProvider provide some useful properties and methods
     * WalletModalProvider provide a Modal in which you can select wallet you want use.
     *
     * Also you can provide a onError callback to process any error such as ConnectionError
     */
    return (
        <Provider store={store}>
            <Web3ContextProvider>
                <Header />
                <Component {...pageProps} />
            </Web3ContextProvider> 
        </Provider>

    );
}
