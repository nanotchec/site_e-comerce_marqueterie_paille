import Image from 'next/image'
import Link from 'next/link'

const featuredProducts = [
  {
    id: 1,
    name: 'Tableau motif Art Déco',
    category: 'Tableaux',
    price: '280€',
    image: '/images/tableau-art-deco.jpg',
    href: '/boutique/tableaux/tableau-motif-art-deco',
    alt: 'Tableau en marqueterie de paille motif Art Déco doré'
  },
  {
    id: 2,
    name: 'Commode Louis XVI restaurée',
    category: 'Mobilier',
    price: '1250€',
    image: '/images/commode-louis-xvi.jpg',
    href: '/boutique/mobilier/commode-louis-xvi-restauree',
    alt: 'Commode Louis XVI restaurée avec marqueterie de paille'
  },
  {
    id: 3,
    name: 'Bracelet tressé doré',
    category: 'Bijoux',
    price: '45€',
    image: '/images/bracelet-tresse.jpg',
    href: '/boutique/bijoux/bracelets/bracelet-tresse-dore',
    alt: 'Bracelet artisanal en paille tressée dorée'
  },
  {
    id: 4,
    name: 'Miroir soleil vintage',
    category: 'Objets déco',
    price: '190€',
    image: '/images/miroir-soleil.jpg',
    href: '/boutique/objets-deco/miroir-soleil-vintage',
    alt: 'Miroir soleil vintage orné de marqueterie de paille'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-secondary-50" aria-labelledby="featured-heading">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 id="featured-heading" className="font-serif text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Pièces phares
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Découvrez notre sélection de créations exceptionnelles, 
            chacune témoignant du savoir-faire artisanal français
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <article 
              key={product.id} 
              className={`group card-shadow rounded-lg overflow-hidden bg-white animation-delay-${index * 100}`}
            >
              <Link href={product.href} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <span className="text-lg font-bold text-secondary-900">
                      {product.price}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/boutique" 
            className="btn-primary inline-flex items-center text-lg px-8 py-4"
          >
            Voir toute la boutique
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
} 