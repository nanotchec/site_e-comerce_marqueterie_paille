import React from 'react'
import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const navigation = {
  boutique: [
    { name: 'Tableaux', href: '/boutique/tableaux' },
    { name: 'Mobilier', href: '/boutique/mobilier' },
    { name: 'Objets déco', href: '/boutique/objets-deco' },
    { name: 'Bijoux', href: '/boutique/bijoux' },
  ],
  services: [
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Sur mesure', href: '/sur-mesure' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
    { name: 'Conditions générales de vente', href: '/cgv' },
    { name: 'Politique de retour', href: '/politique-retour' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/france-pascale',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/france_pascale_atelier',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a4.83 4.83 0 00-1.771 1.153A4.83 4.83 0 00.42 3.344c-.198.48-.333 1.05-.372 1.878C.01 6.049 0 6.516 0 10.017s.01 3.968.048 4.795c.04.828.174 1.398.372 1.878.205.657.478 1.216.923 1.771.556.445 1.114.718 1.771.923.48.198 1.05.333 1.878.372.827.04 1.294.048 4.795.048s3.968-.01 4.795-.048c.828-.04 1.398-.174 1.878-.372a4.83 4.83 0 001.771-.923 4.83 4.83 0 00.923-1.771c.198-.48.333-1.05.372-1.878.04-.827.048-1.294.048-4.795s-.01-3.968-.048-4.795c-.04-.828-.174-1.398-.372-1.878a4.83 4.83 0 00-.923-1.771A4.83 4.83 0 0018.656.42c-.48-.198-1.05-.333-1.878-.372C15.951.01 15.484 0 12.017 0zm0 2.16c3.407 0 3.813.012 5.15.048.758.035 1.204.166 1.486.275.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.728.275 1.486.037 1.337.048 1.743.048 5.15s-.011 3.813-.048 5.15c-.035.758-.166 1.204-.275 1.486a2.47 2.47 0 01-.598.92 2.47 2.47 0 01-.92.598c-.282.11-.728.24-1.486.275-1.337.037-1.743.048-5.15.048s-3.813-.011-5.15-.048c-.758-.035-1.204-.166-1.486-.275a2.47 2.47 0 01-.92-.598 2.47 2.47 0 01-.598-.92c-.11-.282-.24-.728-.275-1.486-.037-1.337-.048-1.743-.048-5.15s.011-3.813.048-5.15c.035-.758.166-1.204.275-1.486.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.728-.24 1.486-.275 1.337-.037 1.743-.048 5.15-.048z"
            clipRule="evenodd"
          />
          <path d="M12.017 15.986a3.97 3.97 0 110-7.94 3.97 3.97 0 010 7.94zm0-10.113a6.144 6.144 0 100 12.288 6.144 6.144 0 000-12.288zm7.844-2.078a1.436 1.436 0 11-2.872 0 1.436 1.436 0 012.872 0z" />
        </svg>
      ),
    },
  ],
}

const contactInfo = [
  {
    icon: PhoneIcon,
    text: '+33 1 23 45 67 89',
    href: 'tel:+33123456789',
  },
  {
    icon: EnvelopeIcon,
    text: 'contact@france-pascale.fr',
    href: 'mailto:contact@france-pascale.fr',
  },
  {
    icon: MapPinIcon,
    text: 'Paris, France',
    href: '/contact',
  },
]

export default function Footer() {
  return (
    <footer className="bg-secondary-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>
      <div className="container-custom py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">FP</span>
                </div>
                <div>
                  <div className="font-serif font-semibold text-xl text-white">
                    France-Pascale
                  </div>
                  <div className="text-sm text-secondary-400">
                    Marqueterie de paille artisanale
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-sm text-secondary-300">
              Artisan spécialisé dans la marqueterie de paille depuis plus de 20 ans. 
              Créations uniques et sur mesure pour sublimer votre intérieur avec l&apos;art 
              traditionnel français de la paille.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold leading-6 text-white">
                  Boutique
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.boutique.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-secondary-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold leading-6 text-white">
                  Services
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-secondary-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold leading-6 text-white">
                  Contact
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {contactInfo.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="flex items-center text-sm leading-6 text-secondary-300 hover:text-white transition-colors duration-200"
                      >
                        <item.icon className="h-5 w-5 mr-2 flex-shrink-0" />
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold leading-6 text-white">
                  Informations légales
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-secondary-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-secondary-700 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                href="/mentions-legales"
                className="text-sm text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-sm text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="text-sm text-secondary-400 hover:text-secondary-300 transition-colors duration-200"
              >
                CGV
              </Link>
            </div>
            <p className="mt-8 text-sm text-secondary-400 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} Atelier France-Pascale. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 