// TODO: temporary issue for disable SSL key auth
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { neueHaasFont } from './fonts';
import './globals.css';
import { config } from '@/config/config';
import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { getClient } from '@/lib/client';
import { layoutQuery, userQuery } from './_query';
import { IHeaderResponse } from '@/interfaces/header.interface';
import { IFooterResponse } from '@/interfaces/footer.interface';
import { Scripts } from '@/components/layout/Scripts';

export async function generateMetadata(): Promise<any> {
  const { data } = (
      await getClient().query({
        query: userQuery,
      })
  )?.data?.mainPage;
  const meta = data?.attributes?.pageMeta;

  return {
    metadataBase: new URL(config.DOMAIN),
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    title: meta?.metaTitle,
    description: meta?.metaDescription,
  };
}

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const res = (
      await getClient().query({
        query: layoutQuery,
      })
  )?.data;

  const meta = res?.mainPage?.data?.attributes?.pageMeta;
  const header = res?.header as IHeaderResponse;
  const footer = res?.footer as IFooterResponse;

  return (
      <html lang="en">
      <body className={neueHaasFont.className}>
      <Header header={header} />
      {children}
      <Footer footer={footer} />
      <Scripts title={meta?.title} description={meta?.description} />
      </body>
      </html>
  );
}
