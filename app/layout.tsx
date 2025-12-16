import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import WalletProvider from '@/components/WalletProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OKX Wallet Clone',
  description: 'A simple cryptocurrency wallet clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <WalletProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 p-6">
                {children}
              </main>
              <footer className="p-4 text-center text-gray-500">
                © wh Wallet. For study purposes only.
              </footer>
            </div>
          </WalletProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}