'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const heroSlides = [
  {
    id: 1,
    title: 'Marqueterie de paille artisanale',
    subtitle: 'L\'art traditionnel français revisité',
    description: 'Découvrez nos créations uniques en marqueterie de paille, alliant savoir-faire ancestral et design contemporain.',
    image: '/images/hero-1.jpg',
    alt: 'Tableau en marqueterie de paille avec motifs géométriques'
  },
  {
    id: 2,
    title: 'Mobilier d\'exception',
    subtitle: 'Sublimez votre intérieur',
    description: 'Commodes, tables et meubles ornés de marqueterie de paille pour un intérieur raffiné et authentique.',
    image: '/images/hero-2.jpg',
    alt: 'Commode ancienne restaurée avec marqueterie de paille'
  },
  {
    id: 3,
    title: 'Créations sur mesure',
    subtitle: 'Réalisez vos projets uniques',
    description: 'Confiez-nous vos projets personnalisés. De l\'idée à la réalisation, nous donnons vie à vos envies.',
    image: '/images/hero-3.jpg',
    alt: 'Artisan travaillant la marqueterie de paille sur mesure'
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Présentation de l'atelier">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 text-primary-100">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-200">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/boutique" 
              className="btn-primary text-lg px-8 py-4 hover:bg-primary-700 hover:scale-105 transform transition-all duration-200"
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/sur-mesure" 
              className="btn-secondary text-lg px-8 py-4 bg-white/90 hover:bg-white text-secondary-900"
            >
              Commande sur mesure
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
        aria-label="Image précédente"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
        aria-label="Image suivante"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
} 