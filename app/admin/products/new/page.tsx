'use client';

import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, ShippingMethod } from '@prisma/client';

export default function NewProductPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [selectedShippingMethods, setSelectedShippingMethods] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Fetch categories on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const [categoriesRes, shippingMethodsRes] = await Promise.all([
                    fetch('/api/admin/categories'),
                    fetch('/api/admin/shipping'),
                ]);

                if (!categoriesRes.ok || !shippingMethodsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const categoriesData = await categoriesRes.json();
                const shippingMethodsData = await shippingMethodsRes.json();

                setCategories(categoriesData);
                setShippingMethods(shippingMethodsData);

                if (categoriesData.length > 0) {
                    setCategoryId(categoriesData[0].id);
                }
            } catch (e) {
                setError('Impossible de charger les catégories ou les méthodes de livraison.');
                console.error(e);
            }
        }
        fetchData();
    }, []);

    const handleShippingMethodChange = (methodId: string) => {
        setSelectedShippingMethods(prev =>
            prev.includes(methodId)
                ? prev.filter(id => id !== methodId)
                : [...prev, methodId]
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, price, stock, categoryId, shippingMethodIds: selectedShippingMethods }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            // Redirect to products list on success
            router.push('/admin/products');
            
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
                Ajouter un nouveau produit
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Remplissez les informations ci-dessous pour ajouter un nouvel article à votre catalogue.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Nom du produit
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="product-name"
                        id="product-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="Ex: Tableau 'Forêt Enchantée'"
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
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="Décrivez les caractéristiques, les matériaux, les dimensions, etc."
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">La description doit être détaillée et optimisée pour le SEO.</p>
                </div>

                 <div className="sm:col-span-3">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Prix
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                        Quantité en stock
                    </label>
                    <div className="mt-2">
                        <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="0"
                        />
                    </div>
                </div>

                 <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Catégorie
                    </label>
                    <div className="mt-2">
                        <select
                        id="category"
                        name="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                        <option value="" disabled>Sélectionnez une catégorie</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Méthodes de livraison</label>
                    <div className="mt-2 space-y-2">
                        {shippingMethods.map(method => (
                            <div key={method.id} className="flex items-center">
                                <input
                                    id={`shipping-${method.id}`}
                                    name="shippingMethods"
                                    type="checkbox"
                                    value={method.id}
                                    checked={selectedShippingMethods.includes(method.id)}
                                    onChange={() => handleShippingMethodChange(method.id)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`shipping-${method.id}`} className="ml-3 block text-sm text-gray-900">
                                    {method.name} ({new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(method.price)})
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Images du produit
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                        >
                        <span>Téléchargez des fichiers</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
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
            <button 
                type="button" 
                onClick={() => router.back()}
                className="text-sm font-semibold leading-6 text-gray-900">
                Annuler
            </button>
            <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-primary-300"
            >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer le produit'}
            </button>
        </div>
    </form>
  )
} 