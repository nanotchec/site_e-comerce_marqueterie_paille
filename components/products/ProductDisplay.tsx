'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import { Product, ProductImage, ShippingMethod, Category } from '@prisma/client';
import { useCart } from '@/context/CartContext';

export type ProductWithDetails = Product & {
  images: ProductImage[];
  shippingMethods: ShippingMethod[];
  category: Category;
};

type ProductDisplayProps = {
  product: ProductWithDetails;
};

export default function ProductDisplay({ product }: ProductDisplayProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0] || { id: 'placeholder', url: '/images/placeholder.jpg', altText: 'Image non disponible'});
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div>
            <div className="relative aspect-square rounded-lg overflow-hidden card-shadow">
            <Image
                src={selectedImage.url}
                alt={selectedImage.altText || product.name}
                fill
                className="object-cover"
                priority
            />
            </div>
            {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-4 mt-4">
                    {product.images.map(image => (
                    <button 
                        key={image.id} 
                        className={`relative aspect-square rounded-lg overflow-hidden card-shadow transition-all duration-200 ${selectedImage.id === image.id ? 'ring-2 ring-primary-500' : 'hover:opacity-80'}`}
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image src={image.url} alt={image.altText || product.name} fill className="object-cover" />
                    </button>
                    ))}
                </div>
            )}
        </div>

        {/* Product info */}
        <div>
            <h1 className="font-serif text-4xl font-bold text-secondary-900 mb-4">
            {product.name}
            </h1>
            
            <p className="text-4xl font-bold text-primary-600 mb-6">
            {product.price}€
            </p>

            {product.stock > 0 ? (
            <div className="flex items-center text-green-600 mb-6">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>En stock</span>
            </div>
            ) : (
            <div className="flex items-center text-red-600 mb-6">
                <span>Vendu</span>
            </div>
            )}

            <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="font-medium text-secondary-800">Quantité :</label>
                <select 
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    disabled={product.stock === 0}
                >
                    {Array.from({ length: Math.min(product.stock, 5) }, (_, i) => i + 1).map(i => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>
            </div>

            <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center
                ${product.stock > 0 ? 'bg-primary-600 hover:bg-primary-700' : 'bg-secondary-400 cursor-not-allowed'}`}
            >
            {product.stock > 0 ? 'Ajouter au panier' : 'Vendu'}
            </button>
            
            <div className="mt-10">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Description</h2>
            <div className="prose max-w-none text-secondary-700">
                <p>{product.description}</p>
            </div>
            </div>

            {product.shippingMethods.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-secondary-900 mb-4">Livraison</h2>
                    <div className="space-y-4 text-secondary-600">
                        {product.shippingMethods.map(method => (
                            <div key={method.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <TruckIcon className="w-6 h-6 mr-4 text-primary-600 flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-secondary-800">{method.name}</p>
                                    <p className="text-sm">{method.description}</p>
                                </div>
                                <p className="text-lg font-bold text-secondary-900">{method.price}€</p>
                            </div>
                        ))}
                     </div>
                </div>
            )}
        </div>
    </div>
  );
} 