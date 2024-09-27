import React from 'react'

interface CardProps {
  title: string
  imageUrl: string
}

const Card: React.FC<CardProps> = ({ title, imageUrl }) => {
  return (
    <div className="h-full flex flex-col bg-customBlue rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-[280px] min-w-[200px] sm:min-w-[250px] md:min-w-[300px]">
      {/* Contenedor de la imagen con altura más baja */}
      <div className="h-32 sm:h-28 md:h-32 lg:h-36 xl:h-40 overflow-hidden border-4 border-customBlue rounded-t-2xl">
        <img 
          className="w-full h-full object-top object-cover"
          src={imageUrl} 
          alt={title}
        />
      </div>
      {/* Contenedor del contenido más comprimido y centrado */}
      <div className="w-full h-full p-2 lg:p-2 xl:p-2 flex justify-center items-center">
        <h3 className="font-bold text-white text-md mb-1 line-clamp-3 text-center">{title}</h3>
      </div>
    </div>
  )
}

export default Card
