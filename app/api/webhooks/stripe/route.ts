import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Gérer les différents types d'événements
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      try {
        // Créer la commande dans la base de données
        await handleCompletedCheckout(session);
        console.log('Commande créée avec succès pour la session:', session.id);
      } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
      }
      break;

    case 'payment_intent.succeeded':
      console.log('Paiement réussi:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('Échec du paiement:', event.data.object.id);
      break;

    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  if (!session.metadata) {
    throw new Error('No metadata found in session');
  }

  const { shippingMethodId, items: itemsJson } = session.metadata;
  const items = JSON.parse(itemsJson);

  // Créer la commande
  const order = await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      status: 'PAID',
      total: session.amount_total! / 100, // Convertir de centimes en euros
      shippingMethodId: shippingMethodId || null,
      customerEmail: session.customer_details?.email || '',
      customerName: session.customer_details?.name || '',
      shippingAddress: session.customer_details?.address
        ? {
            line1: session.customer_details.address.line1 ?? '',
            line2: session.customer_details.address.line2 ?? '',
            city: session.customer_details.address.city ?? '',
            postal_code: session.customer_details.address.postal_code ?? '',
            country: session.customer_details.address.country ?? '',
          }
        : undefined,
    },
  });

  // Créer les items de commande et mettre à jour le stock
  for (const item of items) {
    await prisma.orderLineItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: 0, // Sera mis à jour par un trigger ou une requête séparée
      },
    });

    // Décrémenter le stock
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  // Mettre à jour les prix des items (après création pour avoir les prix actuels)
  const orderItems = await prisma.orderLineItem.findMany({
    where: { orderId: order.id },
    include: { product: true },
  });

  for (const orderItem of orderItems) {
    await prisma.orderLineItem.update({
      where: { id: orderItem.id },
      data: {
        price: orderItem.product.price,
      },
    });
  }

  return order;
}