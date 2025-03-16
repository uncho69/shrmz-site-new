import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shroomiez',
  description: 'Discover the first mushroom collection of Berachain',
  icons: {
    icon: '/shroomiez-logo.png',
    shortcut: '/shroomiez-logo.png',
    apple: '/shroomiez-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
