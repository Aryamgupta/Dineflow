import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'DineFlow',
  description: 'Restaurant SaaS platform for QR-powered ordering and operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="dineflow-theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try { var savedTheme = localStorage.getItem('dineflow-theme'); var initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = initialTheme; document.documentElement.style.colorScheme = initialTheme; } catch (_) { document.documentElement.dataset.theme = 'light'; }`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
