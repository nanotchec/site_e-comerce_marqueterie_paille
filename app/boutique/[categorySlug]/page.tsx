import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { categorySlug: string };
};

// Générer les métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.categorySlug },
  });

  if (!category) {
    return {
      title: 'Catégorie non trouvée',
    };
  }

  return {
    title: `${category.name} - Boutique`,
    description: category.description || `Découvrez tous nos produits dans la catégorie ${category.name}`,
    openGraph: {
        title: `${category.name} en marqueterie de paille – Atelier France-Pascale`,
        description: category.description || `Collection de ${category.name} artisanaux en marqueterie de paille.`,
        // TODO: Remplacer par une image dynamique de la catégorie
        images: [`/images/category-${category.slug}-hero.jpg`],
    },
  };
}

// Générer les routes statiques pour des performances optimales
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}

// Fonction pour récupérer une catégorie et ses produits (y compris des sous-catégories)
async function getCategoryData(categorySlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      parent: true,
      children: {
        select: { id: true }
      }
    },
  });

  if (!category) {
    return null;
  }

  const categoryIds = [category.id, ...category.children.map(c => c.id)];

  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    include: {
        images: true
    }
  });

  return { category, products };
}


export default async function CategoryPage({ params }: Props) {
  const data = await getCategoryData(params.categorySlug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  const breadcrumbItems: { name: string; href: string; current?: boolean }[] = [
    { name: 'Boutique', href: '/boutique' },
  ];
  if (category.parent) {
    breadcrumbItems.push({ name: category.parent.name, href: `/boutique/${category.parent.slug}` });
  }
  breadcrumbItems.push({ name: category.name, href: `/boutique/${category.slug}`, current: true });


  return (
    <div className="bg-white">
      <div className="container-custom py-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <section className="container-custom mb-12">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-bold text-secondary-900 mb-6">
            {category.name}
          </h1>
          {category.description && (
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-secondary-600 leading-relaxed">
                {category.description}
              </p>
            </div>
          )}
        </div>
      </section>
      
      <section className="container-custom mb-16">
        <h2 className="sr-only">Produits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article key={product.id} className="group">
              <Link href={`/boutique/${category.slug}/${product.slug}`} className="block">
                <div className="bg-white rounded-lg card-shadow overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.images[0]?.url || '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                          Vendu
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-primary-600">
                        {product.price}€
                      </span>
                    </div>
                    <p className="text-sm text-secondary-600 mb-3 truncate">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-16">
             <h2 className="font-serif text-2xl text-secondary-700">Aucun produit dans cette catégorie pour le moment.</h2>
             <p className="text-secondary-500 mt-2">Revenez bientôt ou explorez nos autres créations !</p>
             <Link href="/boutique" className="btn-primary mt-6">
                Retour à la boutique
             </Link>
          </div>
        )}
      </section>
    </div>
  );
} 