import Image from 'next/image'
import Link from 'next/link'

const latestPosts = [
  {
    id: 1,
    title: 'L\'entretien de la marqueterie de paille',
    excerpt: 'Découvrez nos conseils d\'experts pour préserver la beauté de vos créations en marqueterie de paille au fil des années.',
    image: '/images/blog-entretien.jpg',
    href: '/blog/entretien-marqueterie-paille',
    category: 'Conseils',
    date: '15 Décembre 2024',
    readTime: '5 min',
    alt: 'Artisan nettoyant délicatement une marqueterie de paille'
  },
  {
    id: 2,
    title: 'Histoire de la marqueterie de paille en France',
    excerpt: 'Plongez dans l\'histoire fascinante de cet art décoratif français, de ses origines au 17ème siècle à nos jours.',
    image: '/images/blog-histoire.jpg',
    href: '/blog/histoire-marqueterie-paille-france',
    category: 'Histoire',
    date: '08 Décembre 2024',
    readTime: '8 min',
    alt: 'Ancienne marqueterie de paille du 18ème siècle'
  },
  {
    id: 3,
    title: 'Restauration d\'un secrétaire Louis XV',
    excerpt: 'Suivez étape par étape la restauration complète d\'un secrétaire Louis XV orné de marqueterie de paille.',
    image: '/images/blog-restauration.jpg',
    href: '/blog/restauration-secretaire-louis-xv',
    category: 'Atelier',
    date: '01 Décembre 2024',
    readTime: '12 min',
    alt: 'Secrétaire Louis XV en cours de restauration'
  }
]

export default function LatestBlogPosts() {
  return (
    <section className="section-padding bg-secondary-50" aria-labelledby="blog-heading">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 id="blog-heading" className="font-serif text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Derniers articles
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Découvrez nos conseils d&apos;expert, l&apos;histoire de la marqueterie de paille 
            et les secrets de notre atelier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <article key={post.id} className="group bg-white rounded-lg card-shadow overflow-hidden">
              <Link href={post.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-secondary-500 mb-3">
                    <time dateTime="2024-12-15">{post.date}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} de lecture</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 font-medium">
                    Lire la suite
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="btn-secondary inline-flex items-center text-lg px-8 py-4"
          >
            Voir tous les articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
} 