'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
}

export default function NewRealisationPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState<number | ''>('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isForSale, setIsForSale] = useState(false);
    const [imageUrl, setImageUrl] = useState(''); // Placeholder for upload logic
    const [products, setProducts] = useState<Product[]>([]);
    const [productId, setProductId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        // Fetch products if 'isForSale' is checked
        if (isForSale) {
            const fetchProducts = async () => {
                // Placeholder for fetching products from API
                const placeholderProducts = [
                    { id: 'prod-1', name: 'Tableau "Art Déco"' },
                    { id: 'prod-2', name: 'Miroir "Soleil"' },
                ];
                setProducts(placeholderProducts);
            };
            fetchProducts();
        }
    }, [isForSale]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Placeholder for image upload. In a real app, upload the image and get the URL.
        const uploadedImageUrl = 'https://example.com/placeholder.jpg';

        try {
            const response = await fetch('/api/admin/realisations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title, 
                    description, 
                    year, 
                    isFavorite, 
                    isForSale, 
                    imageUrl: uploadedImageUrl,
                    productId: isForSale ? productId : null 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create realisation');
            }

            router.push('/admin/realisations');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                        Ajouter une nouvelle réalisation
                    </h1>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Mettez en valeur votre travail en ajoutant une nouvelle réalisation à votre portfolio.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="realisation-title" className="block text-sm font-medium leading-6 text-gray-900">
                                Titre
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="realisation-title"
                                    id="realisation-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                                Année de création
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="year"
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                    placeholder="Ex: 2023"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                             <label className="block text-sm font-medium leading-6 text-gray-900">Options</label>
                             <div className="mt-2 space-y-4">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        id="isFavorite"
                                        name="isFavorite"
                                        type="checkbox"
                                        checked={isFavorite}
                                        onChange={(e) => setIsFavorite(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="isFavorite" className="font-medium text-gray-900">
                                            Mettre en favori
                                        </label>
                                        <p className="text-gray-500">La réalisation apparaîtra sur la page d'accueil.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        id="isForSale"
                                        name="isForSale"
                                        type="checkbox"
                                        checked={isForSale}
                                        onChange={(e) => setIsForSale(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="isForSale" className="font-medium text-gray-900">
                                            Marquer comme "En vente"
                                        </label>
                                        <p className="text-gray-500">La réalisation sera liée à un produit de la boutique.</p>
                                    </div>
                                </div>
                                {isForSale && (
                                    <div className="sm:col-span-4">
                                        <label htmlFor="product-link" className="block text-sm font-medium leading-6 text-gray-900">
                                            Lier à un produit existant
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="product-link"
                                                name="product-link"
                                                value={productId || ''}
                                                onChange={(e) => setProductId(e.target.value || null)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Sélectionner un produit</option>
                                                {products.map((prod) => (
                                                    <option key={prod.id} value={prod.id}>
                                                        {prod.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                             </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Image de la réalisation
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                                        >
                                            <span>Télécharger une image</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">ou glissez-déposez</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, WEBP jusqu'à 10Mo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4 mt-4">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-primary-300"
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la réalisation'}
                </button>
            </div>
        </form>
    );
} 