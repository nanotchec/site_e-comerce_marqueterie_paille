import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, parentId } = data;
    console.log('[API Categories] Received data for creation:', data);

    if (!name) {
      console.log('[API Categories] Validation Error: Name is required.');
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }
    
    const slug = createSlug(name);
    console.log(`[API Categories] Generated slug: ${slug}`);


    console.log(`[API Categories] Attempting to create category "${name}"...`);
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId || null,
      },
    });
    console.log('[API Categories] Category created successfully:', category);

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('[API Categories] --- DETAILED ERROR ---');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    console.error('[API Categories] --- END DETAILED ERROR ---');
    
    if (error.code === 'P2002') {
        // We can check which field caused the error
        const target = error.meta?.target;
        if (target && target.includes('name')) {
            return NextResponse.json({ message: 'Une catégorie avec ce nom existe déjà.' }, { status: 409 });
        }
        if (target && target.includes('slug')) {
             return NextResponse.json({ message: 'Une catégorie avec ce slug existe déjà.' }, { status: 409 });
        }
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
                parent: true,
            },
            orderBy: {
                name: 'asc'
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 