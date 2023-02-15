import Layout from '@/components/Layout';
import mantineCache from '@/mantineCache';
import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      emotionCache={mantineCache}
      withGlobalStyles
      withNormalizeCSS
      theme={{
        defaultRadius: 10,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
