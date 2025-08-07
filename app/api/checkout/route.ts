import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shippingMethodId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
    }

    // Récupérer les détails des produits depuis la base de données
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: true }
    });

    // Récupérer la méthode de livraison si spécifiée
    let shippingMethod = null;
    if (shippingMethodId) {
      shippingMethod = await prisma.shippingMethod.findUnique({
        where: { id: shippingMethodId }
      });
    }

    // Créer les line items pour Stripe
    const lineItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.description.substring(0, 200),
            images: product.images.length > 0 ? [product.images[0].url] : [],
          },
          unit_amount: Math.round(product.price * 100), // Stripe utilise les centimes
        },
        quantity: item.quantity,
      };
    });

    // Ajouter les frais de livraison si une méthode est sélectionnée
    if (shippingMethod) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Livraison - ${shippingMethod.name}`,
            description: shippingMethod.description || '',
            images: [],
          },
          unit_amount: Math.round(shippingMethod.price * 100),
        },
        quantity: 1,
      });
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/panier`,
      metadata: {
        shippingMethodId: shippingMethodId || '',
        items: JSON.stringify(items),
      },
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      billing_address_collection: 'required',
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}