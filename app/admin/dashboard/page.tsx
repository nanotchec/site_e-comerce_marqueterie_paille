'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const stats = [
  { name: 'Total Revenue', stat: '€405,091.00', previousStat: '€320,540.00', change: '12.32%', changeType: 'increase' },
  { name: 'New Orders', stat: '1,204', previousStat: '1,120', change: '4.57%', changeType: 'increase' },
  { name: 'Avg. Order Value', stat: '€336.45', previousStat: '€286.19', change: '8.86%', changeType: 'increase' },
  { name: 'Visitors', stat: '21,504', previousStat: '18,342', change: '10.23%', changeType: 'increase' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  // Placeholder functions for real data fetching
  const getLowStockProducts = () => [
    { name: 'Tableau "Art Déco"', stock: 3, sku: 'TBL-AD-01' },
    { name: 'Bracelet "Tressé"', stock: 5, sku: 'BIJ-BR-03' },
  ];

  const getBestSellers = () => [
    { name: 'Miroir "Soleil"', sales: 124, revenue: '€12,276.00' },
    { name: 'Commode "Louis XVI"', sales: 89, revenue: '€88,110.00' },
    { name: 'Tableau "Géométrique"', sales: 210, revenue: '€8,290.00' },
  ];

  const lowStockProducts = getLowStockProducts();
  const bestSellers = getBestSellers();

  return (
    <>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-6">Tableau de bord</h1>
        <div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                    <dt>
                    <p className="truncate text-sm font-medium text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                    <p
                        className={classNames(
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                        )}
                    >
                        {item.change}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                            View all<span className="sr-only"> {item.name} stats</span>
                        </a>
                        </div>
                    </div>
                    </dd>
                </div>
                ))}
            </dl>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Low Stock Alerts */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Alertes de stock bas</h2>
                <ul role="list" className="divide-y divide-gray-200 mt-4">
                {lowStockProducts.map((product) => (
                    <li key={product.sku} className="flex py-4">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-bold text-red-600">Stock: {product.stock}</p>
                    </div>
                    </li>
                ))}
                </ul>
            </div>

            {/* Best Sellers */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Meilleures ventes</h2>
                <ul role="list" className="divide-y divide-gray-200 mt-4">
                {bestSellers.map((product) => (
                    <li key={product.name} className="flex py-4">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} ventes</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </>
  );
} 