import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const {
            title,
            description,
            year,
            isFavorite,
            isForSale, // backward-compat key from older UI
            isInSale: isInSaleBody, // preferred key matching Prisma schema
            imageUrl, // backward-compat single image
            images,   // preferred JSON payload matching Prisma schema
            productId,
        } = data;

        if (!title || !description || !year) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Resolve booleans and images payload to match Prisma schema
        const isInSale = typeof isInSaleBody === 'boolean' ? isInSaleBody : !!isForSale;
        const imagesPayload = images !== undefined ? images : (imageUrl ? [{ url: imageUrl }] : null);

        const realisation = await prisma.realisation.create({
            data: {
                title,
                description,
                year: parseInt(year, 10),
                isFavorite: isFavorite || false,
                isInSale,
                images: imagesPayload,
                productId: isInSale ? productId : null,
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