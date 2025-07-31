import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CustomWork from '@/components/home/CustomWork'
import LatestBlogPosts from '@/components/home/LatestBlogPosts'
import Newsletter from '@/components/home/Newsletter'

export const metadata: Metadata = {
  title: 'Marqueterie de paille artisanale – Atelier France-Pascale',
  description: 'Découvrez les créations uniques en marqueterie de paille de l\'atelier France-Pascale. Tableaux, mobilier, bijoux et objets déco artisanaux. Commandes sur mesure.',
  openGraph: {
    title: 'Marqueterie de paille artisanale – Atelier France-Pascale',
    description: 'Découvrez les créations uniques en marqueterie de paille de l\'atelier France-Pascale. Tableaux, mobilier, bijoux et objets déco artisanaux.',
    images: ['/images/hero-marqueterie.jpg'],
  },
}

// Schema.org structured data for Website
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Atelier France-Pascale',
  description: 'Marqueterie de paille artisanale française - Créations uniques et sur mesure',
  url: 'https://www.france-pascale.fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.france-pascale.fr/boutique?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Atelier France-Pascale',
    logo: 'https://www.france-pascale.fr/images/logo.png'
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">
        Marqueterie de paille artisanale
      </h1>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Pièces phares */}
      <FeaturedProducts />
      
      {/* Réalisations sur mesure */}
      <CustomWork />
      
      {/* Derniers articles du blog */}
      <LatestBlogPosts />
      
      {/* Newsletter et contact */}
      <Newsletter />
    </>
  )
} 