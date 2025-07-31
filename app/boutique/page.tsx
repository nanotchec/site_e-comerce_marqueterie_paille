import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { prisma } from '@/lib/prisma';
import type { Category } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Boutique : créations en marqueterie de paille',
  description: 'Découvrez toutes nos créations artisanales en marqueterie de paille : tableaux, mobilier, bijoux et objets déco. Qualité artisanale française.',
  openGraph: {
    title: 'Boutique : créations en marqueterie de paille – Atelier France-Pascale',
    description: 'Découvrez toutes nos créations artisanales en marqueterie de paille : tableaux, mobilier, bijoux et objets déco.',
    images: ['/images/boutique-hero.jpg'],
  },
};

const breadcrumbItems = [{ name: 'Boutique', href: '/boutique', current: true }];

// On étend le type Category généré par Prisma pour y ajouter nos champs custom
type CategoryWithCountAndLink = Category & {
  _count: { products: number };
  href: string;
  image: string;
};

async function getCategoriesWithProductCount(): Promise<CategoryWithCountAndLink[]> {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories.map((category) => ({
    ...category,
    href: `/boutique/${category.slug}`,
    image: `/images/category-${category.slug}.jpg`,
  }));
}

export default async function BoutiquePage() {
  const categories: CategoryWithCountAndLink[] = await getCategoriesWithProductCount();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Boutique - Créations en marqueterie de paille',
    description: 'Découvrez toutes nos créations artisanales en marqueterie de paille : tableaux, mobilier, bijoux et objets déco.',
    url: 'https://www.france-pascale.fr/boutique', // TODO: A rendre dynamique avec la variable d'environnement du site
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categories.reduce((total, cat) => total + cat._count.products, 0),
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: category.name,
        description: category.description,
        url: `https://www.france-pascale.fr${category.href}`
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="container-custom py-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/boutique-hero.jpg"
              alt="Atelier de marqueterie de paille avec créations diverses"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              Boutique
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Découvrez nos créations uniques en marqueterie de paille, 
              fruit d&apos;un savoir-faire artisanal transmis de génération en génération
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-secondary-900 mb-4">
                Nos créations
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Chaque pièce est réalisée à la main dans notre atelier parisien, 
                avec des matériaux nobles sélectionnés pour leur qualité exceptionnelle
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categories.map((category) => (
                <article key={category.id} className="group">
                  <Link href={category.href} className="block">
                    <div className="bg-white rounded-2xl card-shadow overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={`Catégorie ${category.name} - marqueterie de paille`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <span className="text-sm font-medium bg-primary-600 px-3 py-1 rounded-full">
                            {category._count.products} création{category._count.products > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="font-serif text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                          {category.name}
                        </h3>
                        <p className="text-secondary-600 mb-6 leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center text-primary-600 font-medium">
                          Découvrir la collection
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary-50 section-padding">
          <div className="container-custom text-center">
            <h2 className="font-serif text-3xl font-bold text-secondary-900 mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Notre atelier réalise également des créations sur mesure selon vos envies 
              et dimensions spécifiques
            </p>
            <Link 
              href="/sur-mesure" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Demander une création sur mesure
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
} 