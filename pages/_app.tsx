import Layout from '@/components/Layout';
import mantineCache from '@/mantineCache';
import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { web3Config } from '../web3/config';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider
      emotionCache={mantineCache}
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Container: {
            defaultProps: {
              size: 'lg',
            },
          },
          Checkbox: {
            defaultProps: {
              color: 'grape',
            },
          },
          Loader: {
            defaultProps: {
              color: 'grape',
            },
          },
        },
        colorScheme: 'dark',
        defaultRadius: 8,
        focusRingStyles: {
          inputStyles: (theme) => {
            return {
              borderColor: theme.colors.yellow,
              outline: 'none',
            };
          },
        },
      }}
    >
      <ThirdwebProvider
        activeChain="binance"
        authConfig={{
          domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
          authUrl: '/api/auth',
        }}
      >
        <ModalsProvider>
          {pageProps.isProfile ? (
            <Component {...pageProps} />
          ) : (
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          )}
        </ModalsProvider>
      </ThirdwebProvider>
    </MantineProvider>
  );
}
