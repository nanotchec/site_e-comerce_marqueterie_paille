'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionIdParam = searchParams?.get('session_id');
    
    if (!sessionIdParam) {
      router.push('/');
      return;
    }

    setSessionId(sessionIdParam);
    
    // Vider le panier après un paiement réussi
    clearCart();
    
    setLoading(false);
  }, [searchParams, router, clearCart]);

  if (loading) {
    return (
      <div className="container-custom py-24">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container-custom py-24">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Commande confirmée !
        </h1>
        
        <p className="text-xl text-secondary-600 mb-8">
          Merci pour votre achat. Votre commande a été enregistrée avec succès.
        </p>

        {sessionId && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-sm text-secondary-600 mb-2">Numéro de session :</p>
            <p className="font-mono text-sm text-secondary-900 break-all">{sessionId}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-secondary-700">
            Vous recevrez un email de confirmation avec les détails de votre commande
            et les informations de suivi dès que votre colis sera expédié.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/boutique"
              className="btn-primary text-center"
            >
              Continuer mes achats
            </Link>
            
            <Link
              href="/realisations"
              className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 font-medium rounded-lg hover:bg-secondary-50 transition-colors duration-300 text-center"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-primary-50 rounded-lg">
          <h2 className="text-lg font-bold text-secondary-900 mb-2">
            Questions sur votre commande ?
          </h2>
          <p className="text-secondary-700 mb-4">
            Notre équipe est là pour vous aider.
          </p>
          <Link
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}