'use client';

import { useCart, CartItem as CartContextItem } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Product, ProductImage, Category } from '@prisma/client';

type CartProduct = Product & { images: ProductImage[], category: Category };
export type CartItem = { product: CartProduct, quantity: number };

export default function PanierPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const [hydratedCartItems, setHydratedCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length > 0) {
        try {
          const productIds = cartItems.map(item => item.productId);
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: productIds }),
          });
          if (!res.ok) throw new Error("Réponse réseau incorrecte");
          const products: CartProduct[] = await res.json();
          
          const items = cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            return { product, quantity: cartItem.quantity };
          }).filter(item => item.product) as CartItem[];

          setHydratedCartItems(items);
        } catch (error) {
          console.error("Erreur lors de la récupération des produits du panier:", error);
        }
      }
      setLoading(false);
    };

    fetchCartProducts();
  }, [cartItems]);

  const totalPrice = hydratedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (loading) {
    return <div className="container-custom text-center py-24">Chargement du panier...</div>
  }

  if (cartCount === 0) {
    return (
      <div className="container-custom text-center py-24">
        <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">Votre panier est vide</h1>
        <p className="text-xl text-secondary-600 mb-8">
          Il semble que vous n'ayez pas encore ajouté de créations à votre panier.
        </p>
        <Link href="/boutique" className="btn-primary text-lg">
          Découvrir nos créations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-8 text-center">Votre Panier</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
              {hydratedCartItems.map(({ product, quantity }) => (
                <li key={product.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.images[0]?.url || '/images/placeholder.jpg'}
                      alt={product.name}
                      width={128}
                      height={128}
                      className="h-32 w-32 rounded-lg object-cover"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-serif text-xl">
                        <Link href={`/boutique/${product.category.slug}/${product.slug}`} className="font-semibold text-secondary-800 hover:text-primary-600">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="ml-4 font-bold text-xl text-secondary-900">{product.price * quantity}€</p>
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"><MinusIcon className="h-4 w-4"/></button>
                        <span className="px-4 py-1 font-medium">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"><PlusIcon className="h-4 w-4"/></button>
                      </div>

                      <div className="flex">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          type="button"
                          className="font-medium text-primary-600 hover:text-primary-500 flex items-center"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1"/>
                          <span>Retirer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-lg sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-6">Résumé de la commande</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Sous-total</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Livraison</span>
                  <span className="font-semibold">Calculée à l'étape suivante</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/checkout"
                  className="w-full bg-primary-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg hover:bg-primary-700"
                >
                  Passer la commande
                </Link>
                <p className="text-center mt-4 text-sm text-gray-500">
                  Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 