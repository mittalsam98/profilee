import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import Provider from '@/components/context/client-provider';
import { getServerAuthSession } from '@/server/auth';
import { TRPCReactProvider } from '@/trpc/react';

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
      <body className={`h-full font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <Provider session={session}>{children}</Provider>
        </TRPCReactProvider>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
