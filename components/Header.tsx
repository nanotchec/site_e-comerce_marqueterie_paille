'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { useCart } from '@/context/CartContext';

type NavCategory = {
  name: string;
  href: string;
};

type HeaderProps = {
  navCategories: NavCategory[];
};

export default function Header({ navCategories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navigation = [
    {
      name: 'Boutique',
      href: '/boutique', // Ce href est pour le menu mobile
      children: [
        { name: 'Toutes les catégories', href: '/boutique' },
        ...navCategories,
      ],
    },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Sur mesure', href: '/sur-mesure' },
    { name: 'Blog', href: '/blog' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <nav className="container-custom" aria-label="Navigation principale">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Atelier France-Pascale</span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">FP</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-serif font-semibold text-xl text-secondary-900">
                    France-Pascale
                  </div>
                  <div className="text-sm text-secondary-600">
                    Marqueterie de paille
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <Popover.Group className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <Popover className="relative">
                    <Popover.Button as={Link} href={item.href} className="flex items-center gap-x-1 text-sm font-medium leading-6 text-secondary-900 hover:text-primary-600 transition-colors duration-200 outline-none">
                      {item.name}
                      <ChevronDownIcon className="h-4 w-4 flex-none text-secondary-400" aria-hidden="true" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-secondary-900/5">
                        <div className="p-4">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-50 hover:text-primary-600 transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium leading-6 text-secondary-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </Popover.Group>

          <div className="flex items-center lg:flex-1 lg:justify-end">
            <Link href="/panier" className="group -m-2 flex items-center p-2">
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-secondary-600 group-hover:text-primary-600"
                aria-hidden="true"
              />
              {cartCount > 0 && (
                <span className="ml-2 text-sm font-medium text-white bg-primary-600 rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">articles dans votre panier, voir le panier</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden ml-4">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-secondary-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-secondary-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Atelier France-Pascale</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-serif font-bold">FP</span>
                    </div>
                    <span className="font-serif font-semibold text-lg">France-Pascale</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-secondary-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-secondary-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-secondary-900 hover:bg-secondary-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <div className="ml-4 mt-2 space-y-1">
                            {item.children.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-secondary-700 hover:bg-secondary-50"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </header>
  )
} 