import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import Provider from '@/components/context/client-provider';
import { getServerAuthSession } from '@/server/auth';
import { TRPCReactProvider } from '@/trpc/react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { PHProvider } from '@/lib/posthog-provider';

const PostHogPageView = dynamic(() => import('../components/PostHogPageView'), {
  ssr: false
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata = {
  title: 'Profilee',
  description: 'A link in bio builder app',
  icons: [{ rel: 'icon', url: '/profilee-b.png' }]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <html lang='en'>
      <head>
        <Script async src='https://www.googletagmanager.com/gtag/js?id=G-3Y5VCPT4LB'></Script>
        <Script id='google-analytics'>
          {` window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-3Y5VCPT4LB');`}
        </Script>
      </head>
      <PHProvider>
        <body className={`h-full font-sans ${inter.variable}`}>
          <TRPCReactProvider headers={headers()}>
            <Provider session={session}>
              <PostHogPageView />
              {children}
            </Provider>
          </TRPCReactProvider>
          <Toaster richColors position='top-right' />
        </body>
      </PHProvider>
    </html>
  );
}
