
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Changed from Geist
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import BackgroundParticles from '@/components/background-particles';

const poppins = Poppins({ // Changed from Geist
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Charan - Portfolio',
  description: 'A modern portfolio website built with Next.js and AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased text-foreground bg-background`} suppressHydrationWarning> {/* Updated font variable */}
        <ThemeProvider defaultTheme="system" storageKey="charan-portfolio-theme">
          <BackgroundParticles />
          <Header />
          <main className="pt-16 relative z-10"> {/* Add padding-top to offset fixed header */}
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
