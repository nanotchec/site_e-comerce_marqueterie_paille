import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // Use name, price, description to align with the new schema
        const { name, price, description } = data;

        if (!name || price === undefined || !description) {
            return NextResponse.json({ message: 'Missing required fields: name, price, description' }, { status: 400 });
        }

        const shippingMethod = await prisma.shippingMethod.create({
            data: {
                name,
                price,
                description,
            },
        });

        return NextResponse.json(shippingMethod, { status: 201 });
    } catch (error) {
        console.error('Error creating shipping method:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const shippingMethods = await prisma.shippingMethod.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        return NextResponse.json(shippingMethods);
    } catch (error) {
        console.error('Error fetching shipping methods:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 