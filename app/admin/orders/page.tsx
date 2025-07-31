'use client';

import { EyeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Order {
    id: string;
    number: string;
    createdAt: string;
    total: number;
    status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
    user: {
        name: string;
    };
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
  return classes.filter(Boolean).join(' ');
}


export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/admin/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Commandes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Consultez et gérez l'historique des commandes de vos clients.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        {loading ? (
            <p className="text-center py-4">Chargement...</p>
        ) : (
        <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
          <div className="min-w-full divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.number}>
                <div className="bg-gray-50 px-4 py-5 sm:px-6 lg:flex lg:items-center lg:justify-between">
                    <dl className="grid flex-auto grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-5">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">N° de commande</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">{order.number}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</time>
                        </dd>
                      </div>
                       <div>
                        <dt className="text-sm font-medium text-gray-500">Client</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">{order.user.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Total</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.total)}</dd>
                      </div>
                       <div className="hidden lg:block">
                        <dt className="text-sm font-medium text-gray-500">Statut</dt>
                        <dd className={classNames(statusStyles[order.status], 'mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium')}>
                            {order.status}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex items-center justify-end sm:mt-0">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <span>Voir la commande</span>
                        <EyeIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>
                </div>

                <div className="px-4 py-5 sm:px-6">
                  <ul role="list" className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-4">
                        <img src={item.product.imageUrl || ''} alt="" className="h-20 w-20 rounded-md object-cover" />
                        <div className="ml-4 flex flex-1 flex-col justify-center">
                            <h4 className="text-sm font-medium text-gray-900">
                                {item.product.name}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">{item.product.description.substring(0, 100)}...</p>
                        </div>
                         <p className="ml-4 text-sm font-medium text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.product.price)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
} 