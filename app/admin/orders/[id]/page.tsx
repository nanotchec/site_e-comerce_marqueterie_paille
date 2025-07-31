'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'

interface Order {
  id: string;
  number: string;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
  createdAt: string;
  total: number;
  user: {
      name: string;
      email: string;
  };
  shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
  } | null;
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      description: string;
      imageUrl: string | null;
      price: number;
    };
  }[];
}

const statusStyles: { [key: string]: string } = {
  Delivered: 'bg-green-100 text-green-800',
  Processing: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
  Shipped: 'bg-blue-100 text-blue-800',
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    if (id) {
        const fetchOrder = async () => {
            try {
                // This would be a call to /api/admin/orders/[id] in a real app
                // For now, let's assume we filter from a full list or use a placeholder
                 const response = await fetch(`/api/admin/orders`);
                 if (!response.ok) throw new Error('Failed to fetch orders');
                 const orders: Order[] = await response.json();
                 const currentOrder = orders.find(o => o.id === id);
                 setOrder(currentOrder || null);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }
  }, [id]);

  if (loading) {
      return <p>Chargement...</p>;
  }

  if (!order) {
      return <p>Commande non trouvée.</p>;
  }


  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Commande #{order.number}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Détails de la commande passée le{' '}
            <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</time>.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/orders"
            className="block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Retour aux commandes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Produits</h3>
                     <ul role="list" className="mt-4 divide-y divide-gray-200">
                        {order.items.map((item) => (
                        <li key={item.id} className="flex py-4">
                            <img src={item.product.imageUrl || ''} alt="" className="h-20 w-20 rounded-md object-cover" />
                            <div className="ml-4 flex flex-1 flex-col justify-center">
                                <h4 className="text-sm font-medium text-gray-900">
                                    {item.product.name}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">{item.product.description.substring(0,100)}...</p>
                            </div>
                            <p className="ml-4 text-sm font-medium text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.product.price)}</p>
                        </li>
                        ))}
                    </ul>
                    <div className="mt-6 border-t border-gray-200 pt-6 text-right">
                        <p className="text-sm font-medium text-gray-500">Total</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.total)}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Client</h3>
                    <div className="mt-4">
                        <p className="font-medium text-gray-900">{order.user.name}</p>
                        <p className="text-gray-500">{order.user.email}</p>
                    </div>
                </div>
            </div>

            {order.shippingAddress && (
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Adresse de livraison</h3>
                    <address className="mt-4 not-italic text-gray-500">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                    </address>
                </div>
            </div>
            )}

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Statut de la commande</h3>
                    <div className="mt-4">
                       <div className="flex items-center">
                         <span className={classNames(statusStyles[order.status], 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium')}>
                            {order.status}
                        </span>
                       </div>
                        <div className="mt-4">
                             <label htmlFor="order-status" className="sr-only">Modifier le statut</label>
                             <select id="order-status" name="order-status" defaultValue={order.status} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                             </select>
                             <button className="mt-2 w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
                                Mettre à jour
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
} 