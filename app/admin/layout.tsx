'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  UsersIcon,
  FolderIcon,
  InboxIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  TruckIcon,
  StarIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Catalogue', href: '#', icon: FolderIcon,
    children: [
      { name: 'Produits', href: '/admin/products' },
      { name: 'Catégories', href: '/admin/categories' },
    ]
  },
  { name: 'Réalisations', href: '/admin/realisations', icon: PaintBrushIcon },
  { name: 'Commandes', href: '/admin/orders', icon: InboxIcon },
  { name: 'Livraison', href: '/admin/shipping', icon: TruckIcon },
  { name: 'Clients', href: '/admin/users', icon: UsersIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                       <h1 className="text-2xl font-bold text-white font-serif">Marqueterie</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {!item.children ? (
                                    <Link
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                        ? 'bg-secondary-800 text-white'
                                        : 'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                    >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                    </Link>
                                ) : (
                                    <div>
                                        <div
                                            className={classNames(
                                            'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </div>
                                        <ul className="ml-4 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                            <li key={child.name}>
                                                <Link
                                                href={child.href}
                                                className={classNames(
                                                    pathname === child.href
                                                    ? 'bg-secondary-800 text-white'
                                                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                                >
                                                {child.name}
                                                </Link>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary-900 px-6 pb-4">
             <div className="flex h-16 shrink-0 items-center">
                <h1 className="text-2xl font-bold text-white font-serif">Marqueterie</h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                            <Link
                            href={item.href}
                            className={classNames(
                                pathname === item.href
                                ? 'bg-secondary-800 text-white'
                                : 'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                            >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            </Link>
                        ) : (
                            <div>
                                <div
                                    className={classNames(
                                    'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                    )}
                                >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                </div>
                                <ul className="ml-4 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                    <li key={child.name}>
                                        <Link
                                        href={child.href}
                                        className={classNames(
                                            pathname === child.href
                                            ? 'bg-secondary-800 text-white'
                                            : 'text-secondary-400 hover:text-white hover:bg-secondary-800',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                        >
                                        {child.name}
                                        </Link>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1">
                 {/* Can be used for a search bar later */}
                </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
} 