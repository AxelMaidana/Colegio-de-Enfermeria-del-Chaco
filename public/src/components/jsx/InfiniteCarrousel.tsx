import React, { useState, useCallback, useRef, useEffect } from 'react'

interface CardProps {
  image: string
  date: string
  title: string
  description: string
}

const Card: React.FC<CardProps & { isFocused: boolean }> = ({ image, date, title, description, isFocused }) => (
  <article className={`bg-customBlue shadow-md p-1 rounded-2xl w-64 mx-2 my-6 flex-shrink-0 transition-all duration-300 ease-in-out overflow-visible ${isFocused ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}>
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
  const carouselRef = useRef<HTMLDivElement>(null)

  const moveCarousel = useCallback((direction: 'left' | 'right') => {
    if (isAnimating || cards.length === 0) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => {
      let newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1
      if (newIndex < 0) newIndex = cards.length - 1
      if (newIndex >= cards.length) newIndex = 0
      return newIndex
    })

    setTimeout(() => setIsAnimating(false), 300)
  }, [cards.length, isAnimating])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveCarousel('left')
      if (event.key === 'ArrowRight') moveCarousel('right')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveCarousel])

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 272 // 256px (card width) + 16px (margin)
      const scrollPosition = currentIndex * cardWidth - (window.innerWidth - cardWidth) / 2
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  if (cards.length === 0) {
    return <div className="text-center text-gray-500">No hay tarjetas disponibles</div>
  }

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div 
        ref={carouselRef}
        className="flex overflow-x-hidden snap-x snap-mandatory md:justify-center"
        style={{ 
          scrollSnapType: 'x mandatory',
          paddingLeft: 'calc(50% - 136px)', // Half of the viewport minus half of the card width
          paddingRight: 'calc(50% - 136px)'
        }}
      >
        {cards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="w-64 flex-shrink-0 snap-center">
            <Card {...card} isFocused={index === currentIndex} />
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