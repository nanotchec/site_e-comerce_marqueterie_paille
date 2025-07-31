import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import { prisma } from '@/lib/prisma';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Marqueterie de paille artisanale – Atelier France-Pascale',
    template: '%s – Atelier France-Pascale'
  },
  description: 'Découvrez les créations uniques en marqueterie de paille de l\'atelier France-Pascale. Tableaux, mobilier, bijoux et objets déco artisanaux. Commandes sur mesure.',
  keywords: 'marqueterie de paille, artisanat français, tableaux artisanaux, mobilier paille, bijoux artisanaux, création sur mesure, art décoratif',
  authors: [{ name: 'France-Pascale' }],
  creator: 'Atelier France-Pascale',
  publisher: 'Atelier France-Pascale',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.france-pascale.fr/',
    siteName: 'Atelier France-Pascale',
    title: 'Marqueterie de paille artisanale – Atelier France-Pascale',
    description: 'Découvrez les créations uniques en marqueterie de paille de l\'atelier France-Pascale. Tableaux, mobilier, bijoux et objets déco artisanaux.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Créations en marqueterie de paille artisanale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier France-Pascale - Marqueterie de Paille',
    description: "Créations uniques et sur mesure en marqueterie de paille. L'art et l'artisanat d'un savoir-faire d'exception.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.france-pascale.fr/',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atelier France-Pascale',
  description: 'Atelier d\'artisanat spécialisé dans la marqueterie de paille',
  url: 'https://www.france-pascale.fr',
  logo: 'https://www.france-pascale.fr/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-1-23-45-67-89',
    contactType: 'Customer Service',
    availableLanguage: 'French'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France'
  },
  sameAs: [
    'https://www.facebook.com/france-pascale',
    'https://www.instagram.com/france_pascale_atelier'
  ]
}

async function getNavCategories() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  });
  return categories.map(c => ({ name: c.name, href: `/boutique/${c.slug}` }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navCategories = await getNavCategories();

  return (
    <html lang="fr" className="h-full bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full flex flex-col">
        <CartProvider>
          <Toaster position="top-center" />
          <Header navCategories={navCategories} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
} 