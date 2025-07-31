'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewShippingMethodPage() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [delay, setDelay] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !cost || !delay) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      const res = await fetch('/api/admin/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: parseFloat(cost),
          description: delay,
          // isActive is not in the schema anymore, but we can leave it for now
        }),
      });

      if (res.ok) {
        router.push('/admin/shipping');
      } else {
        const data = await res.json();
        setError(data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la communication avec le serveur.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Nouvelle méthode de livraison</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name" className="sr-only">Nom du transporteur</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nom du transporteur (ex: Colissimo)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cost" className="sr-only">Coût</label>
            <input
              id="cost"
              name="cost"
              type="number"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Coût en €"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="delay" className="sr-only">Délai</label>
            <input
              id="delay"
              name="delay"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Délai de livraison (ex: 2-3 jours ouvrés)"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
            />
          </div>
        </div>

        {/* The isActive field is removed from the form as it's not in the new schema logic */}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer la méthode de livraison
          </button>
        </div>
      </form>
    </div>
  );
} 