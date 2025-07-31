'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section className="section-padding bg-primary-600" aria-labelledby="newsletter-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter */}
          <div className="text-white">
            <h2 id="newsletter-heading" className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Restez informé
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Recevez nos dernières créations, conseils d&apos;entretien et actualités 
              de l&apos;atelier directement dans votre boîte mail. Pas de spam, 
              que du contenu de qualité !
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 rounded-lg text-secondary-900 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-secondary bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <EnvelopeIcon className="w-5 h-5 mr-2" />
                      S&apos;inscrire
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center bg-green-500/20 text-green-100 px-4 py-3 rounded-lg max-w-md">
                <CheckIcon className="w-5 h-5 mr-2" />
                Merci ! Vous êtes maintenant inscrit à notre newsletter.
              </div>
            )}

            <p className="text-sm text-primary-200 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos communications. 
              Vous pouvez vous désabonner à tout moment.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="font-serif text-3xl font-bold mb-4">
                Un projet en tête ?
              </h3>
              <p className="text-primary-100 mb-6 leading-relaxed">
                Vous avez une idée de création sur mesure ou des questions sur nos services ? 
                Notre équipe est là pour vous accompagner dans votre projet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="btn-secondary bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 flex items-center justify-center"
                >
                  Nous contacter
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/sur-mesure" 
                  className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  Devis sur mesure
                </Link>
              </div>

              {/* Contact info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-primary-100">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +33 1 23 45 67 89
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@france-pascale.fr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 