import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, description, price, stock, categoryId, shippingMethodIds } = data;

    // Basic validation
    if (!name || !description || !price || !stock || !categoryId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = createSlug(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        categoryId: categoryId,
        shippingMethods: {
          connect: shippingMethodIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    // Handle Prisma-specific errors if necessary
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                shippingMethods: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 