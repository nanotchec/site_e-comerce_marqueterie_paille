import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const shippingMethods = await prisma.shippingMethod.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(shippingMethods);
  } catch (error) {
    console.error('Error fetching shipping methods:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

