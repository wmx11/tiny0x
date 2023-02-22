import Layout from '@/components/Layout';
import mantineCache from '@/mantineCache';
import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps);

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
        {pageProps.isProfile ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThirdwebProvider>
    </MantineProvider>
  );
}
