'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Product, ProductImage, Category, ShippingMethod } from '@prisma/client';
import { TruckIcon } from '@heroicons/react/24/outline';

type CartProduct = Product & { images: ProductImage[], category: Category };
type CartItem = { product: CartProduct, quantity: number };

// Initialiser Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [hydratedCartItems, setHydratedCartItems] = useState<CartItem[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/panier');
      return;
    }

    const fetchData = async () => {
      try {
        // Récupérer les détails des produits
        const productIds = cartItems.map(item => item.productId);
        const productsRes = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: productIds }),
        });
        
        if (!productsRes.ok) throw new Error("Erreur lors de la récupération des produits");
        const products: CartProduct[] = await productsRes.json();
        
        const items = cartItems.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId);
          return { product, quantity: cartItem.quantity };
        }).filter(item => item.product) as CartItem[];

        setHydratedCartItems(items);

        // Récupérer les méthodes de livraison (endpoint public)
        const shippingRes = await fetch('/api/shipping');
        if (shippingRes.ok) {
          const shipping = await shippingRes.json();
          setShippingMethods(shipping);
          if (shipping.length > 0) {
            setSelectedShippingMethod(shipping[0].id);
          }
        }

      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cartItems, router]);

  const subtotal = hydratedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const selectedShipping = shippingMethods.find(method => method.id === selectedShippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    setProcessing(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const items = hydratedCartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingMethodId: selectedShippingMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-24">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Finaliser la commande</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Résumé de la commande */}
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-6">Résumé de votre commande</h2>
          
          <div className="space-y-4 mb-6">
            {hydratedCartItems.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.product.images[0]?.url || '/images/placeholder.jpg'}
                    alt={item.product.images[0]?.altText || item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-secondary-900">{item.product.name}</h3>
                  <p className="text-sm text-secondary-600">Quantité: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary-900">{(item.product.price * item.quantity).toFixed(2)}€</p>
                </div>
              </div>
            ))}
          </div>

          {/* Méthodes de livraison */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-4">Méthode de livraison</h3>
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={selectedShippingMethod === method.id}
                    onChange={(e) => setSelectedShippingMethod(e.target.value)}
                    className="mr-3"
                  />
                  <TruckIcon className="w-5 h-5 mr-3 text-primary-600" />
                  <div className="flex-grow">
                    <p className="font-medium text-secondary-900">{method.name}</p>
                    <p className="text-sm text-secondary-600">{method.description}</p>
                  </div>
                  <p className="font-bold text-secondary-900">{method.price.toFixed(2)}€</p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Récapitulatif des prix */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-secondary-900 mb-4">Récapitulatif</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-secondary-600">Sous-total</span>
                <span className="text-secondary-900">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Livraison</span>
                <span className="text-secondary-900">{shippingCost.toFixed(2)}€</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-secondary-900">Total</span>
                <span className="text-secondary-900">{total.toFixed(2)}€</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing || !selectedShippingMethod}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-colors duration-300 ${
                processing || !selectedShippingMethod
                  ? 'bg-secondary-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {processing ? 'Redirection vers Stripe...' : 'Procéder au paiement'}
            </button>

            <p className="text-xs text-secondary-500 mt-4 text-center">
              Paiement sécurisé par Stripe. Vos données bancaires ne sont pas stockées sur notre site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}