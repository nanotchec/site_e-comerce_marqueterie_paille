import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDisplay, { ProductWithDetails } from '@/components/products/ProductDisplay';

type Props = {
  params: { 
    categorySlug: string;
    productSlug: string;
  };
};

// Générer les métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.productSlug },
    include: { images: true, category: true }
  });

  if (!product) {
    return { title: 'Produit non trouvé' };
  }
  
  const title = `${product.name} - Marqueterie de Paille`;
  const description = product.description.substring(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${product.name} – Atelier France-Pascale`,
      description,
      images: product.images.length > 0 ? [product.images[0].url] : ['/images/placeholder.jpg'],
    },
  };
}

// Générer les routes statiques pour des performances optimales
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { category: { isNot: null } },
    select: { slug: true, category: { select: { slug: true } } },
  });

  return products
    .filter(p => p.category) // Filtre pour la sécurité, au cas où
    .map((product) => ({
      categorySlug: product.category!.slug,
      productSlug: product.slug,
  }));
}

// Fonction pour récupérer les données du produit
async function getProductData(productSlug: string) {
  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: {
      images: true,
      category: {
        include: {
          parent: true,
        },
      },
      shippingMethods: true,
    },
  });
  return product;
}


export default async function ProductPage({ params }: Props) {
  const product = await getProductData(params.productSlug);

  if (!product || !product.category) {
    notFound();
  }

  const breadcrumbItems: { name: string; href: string; current?: boolean }[] = [
    { name: 'Boutique', href: '/boutique' },
  ];
  if(product.category.parent) {
    breadcrumbItems.push({ name: product.category.parent.name, href: `/boutique/${product.category.parent.slug}` });
  }
  breadcrumbItems.push({ name: product.category.name, href: `/boutique/${product.category.slug}` });
  breadcrumbItems.push({ name: product.name, href: `/boutique/${product.category.slug}/${product.slug}`, current: true });


  return (
    <div className="bg-white">
        <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbItems} />
        </div>
        
        <main className="container-custom pb-16">
            <ProductDisplay product={product as ProductWithDetails} />
        </main>
    </div>
  );
} 