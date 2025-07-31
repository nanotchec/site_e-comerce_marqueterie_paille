import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { title, description, year, isFavorite, isForSale, imageUrl, productId } = data;

        if (!title || !description || !year || !imageUrl) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const realisation = await prisma.realisation.create({
            data: {
                title,
                description,
                year: parseInt(year, 10),
                isFavorite: isFavorite || false,
                isForSale: isForSale || false,
                imageUrl,
                productId: isForSale ? productId : null,
            },
        });

        return NextResponse.json(realisation, { status: 201 });
    } catch (error) {
        console.error('Error creating realisation:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const realisations = await prisma.realisation.findMany({
            orderBy: {
                year: 'desc',
            },
        });
        return NextResponse.json(realisations);
    } catch (error) {
        console.error('Error fetching realisations:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 