import React, { useState, useEffect, useCallback } from 'react'

interface CardProps {
  image: string
  date: string
  title: string
  description: string
}

const Card: React.FC<CardProps> = ({ image, date, title, description }) => (
  <article className="bg-customBlue shadow-md p-1 rounded-2xl w-full max-w-xs mx-2 flex-shrink-0 transition-transform duration-300 ease-in-out overflow-visible">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl border-2 border-customBlue" />  
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-customBlue text-white text-sm px-4 py-1 rounded-full">
        {date}
      </div>
    </div>
    <h4 className="text-lg font-semibold mt-2 text-center text-white">{title}</h4>
    <p className="text-center text-white opacity-80">{description}</p>
  </article>
)

interface InfiniteCarouselProps {
  cards: CardProps[]
}

export default function InfiniteCarousel({ cards }: InfiniteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const moveCarousel = useCallback((direction: 'left' | 'right') => {
    if (isAnimating || cards.length === 0) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      let newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1
      if (newIndex < 0) newIndex = cards.length - 1
      if (newIndex >= cards.length) newIndex = 0
      return newIndex
    })

    setTimeout(() => setIsAnimating(false), 300) // Match transition duration
  }, [cards.length, isAnimating])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveCarousel('left')
      if (event.key === 'ArrowRight') moveCarousel('right')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCarousel])

  if (cards.length === 0) {
    return <div className="text-center text-gray-500">No hay tarjetas disponibles</div>
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-8">
      <div 
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {cards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="w-full flex-shrink-0 flex justify-center items-center">
            <Card {...card} />
          </div>
        ))}
      </div>
      <button
        onClick={() => moveCarousel('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Tarjeta anterior"
      >
        <span className="text-2xl font-bold text-gray-600">&lt;</span>
      </button>
      <button
        onClick={() => moveCarousel('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Siguiente tarjeta"
      >
        <span className="text-2xl font-bold text-gray-600">&gt;</span>
      </button>
    </div>
  )
}