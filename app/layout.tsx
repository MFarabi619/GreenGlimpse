import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import { Providers } from '@/app/components/providers';

export const metadata = {
  title: 'Green Glimpse - Dashboard',
  description: 'Greater Vision for a Greener Tomorrow'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-800">
      <body className="h-full">
        <Providers>
          <Suspense>
            <Nav />
          </Suspense>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
