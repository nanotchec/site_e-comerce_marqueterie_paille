import Image from 'next/image'
import Link from 'next/link'

const customWorkExamples = [
  {
    id: 1,
    title: 'Paravent japonisant',
    description: 'Paravent 3 panneaux avec motifs inspirés de l\'art japonais',
    image: '/images/paravent-custom.jpg',
    alt: 'Paravent sur mesure en marqueterie de paille motifs japonais'
  },
  {
    id: 2,
    title: 'Table basse contemporaine',
    description: 'Table basse moderne avec plateau en marqueterie géométrique',
    image: '/images/table-custom.jpg',
    alt: 'Table basse contemporaine avec marqueterie de paille géométrique'
  },
  {
    id: 3,
    title: 'Tête de lit royale',
    description: 'Tête de lit king size avec motifs baroques dorés',
    image: '/images/tete-lit-custom.jpg',
    alt: 'Tête de lit sur mesure ornée de marqueterie de paille baroque'
  }
]

const features = [
  {
    icon: '🎨',
    title: 'Design personnalisé',
    description: 'Création unique selon vos goûts et votre intérieur'
  },
  {
    icon: '📏',
    title: 'Sur mesure',
    description: 'Dimensions adaptées parfaitement à votre espace'
  },
  {
    icon: '🏆',
    title: 'Savoir-faire artisanal',
    description: 'Plus de 20 ans d\'expertise dans la marqueterie de paille'
  },
  {
    icon: '💎',
    title: 'Matériaux nobles',
    description: 'Paille de seigle sélectionnée et bois massif de qualité'
  }
]

export default function CustomWork() {
  return (
    <section className="section-padding bg-white" aria-labelledby="custom-work-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 id="custom-work-heading" className="font-serif text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Réalisations sur mesure
            </h2>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Donnez vie à vos projets les plus ambitieux. Notre atelier conçoit et réalise 
              des pièces uniques en marqueterie de paille, entièrement personnalisées selon 
              vos envies et dimensions.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/sur-mesure" 
                className="btn-primary inline-flex items-center justify-center px-8 py-4"
              >
                Demander un devis
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/realisations" 
                className="btn-secondary inline-flex items-center justify-center px-8 py-4"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden card-shadow">
                  <Image
                    src={customWorkExamples[0].image}
                    alt={customWorkExamples[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden card-shadow">
                  <Image
                    src={customWorkExamples[1].image}
                    alt={customWorkExamples[1].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden card-shadow">
                  <Image
                    src={customWorkExamples[2].image}
                    alt={customWorkExamples[2].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-200 rounded-full opacity-30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 