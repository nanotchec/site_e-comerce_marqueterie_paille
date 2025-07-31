import React from 'react'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

interface BreadcrumbItem {
  name: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Schema.org structured data for breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: '/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        ...(item.current ? {} : { item: item.href }),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              href="/"
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <HomeIcon className="h-4 w-4" />
              <span className="sr-only">Accueil</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.name} className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-secondary-400 breadcrumb-separator" />
              {item.current ? (
                <span className="ml-2 text-sm font-medium text-secondary-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="ml-2 text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
} 