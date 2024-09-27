import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import Card from '../Home/Card'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const cardData = [
  { title: "Evento 1: Conferencia de Enfermería", imageUrl: "/media/image1.png" },
  { title: "Evento 2: Taller de Primeros Auxilios", imageUrl: "/media/image3.png" },
  { title: "Evento 3: Seminario de Ética en Enfermería", imageUrl: "/media/image1.png" },
  { title: "Evento 4: Curso de Actualización en Cuidados Intensivos", imageUrl: "/media/image3.png" },
  { title: "Evento 5: Jornada de Salud Mental", imageUrl: "/media/image1.png" },
  { title: "Evento 6: Taller de Primeros Auxilios", imageUrl: "/media/image3.png" },
  { title: "Evento 7: Seminario de Ética en Enfermería", imageUrl: "/media/image1.png" },
  { title: "Evento 8: Curso de Actualización en Cuidados Intensivos", imageUrl: "/media/image3.png" },
  { title: "Evento 9: Jornada de Salud Mental", imageUrl: "/media/image1.png" },
]

const InfiniteCarrousel: React.FC = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      loop={true}
      centeredSlides={true}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      breakpoints={{
        320: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        375: {
          slidesPerView: 1.4,
          spaceBetween: 15,
        },
        425: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
        1600: {
          slidesPerView: 4.5,  // Ajuste para una transición más suave
          spaceBetween: 50,
        },
        1920: {
          slidesPerView: 5.2,  // Mostrar un poco más de las tarjetas laterales
          spaceBetween: 80,
        },
      }}
      className="mySwiper overflow-visible"
    >
      {cardData.map((card, index) => (
        <SwiperSlide key={index} className="py-8 h-auto">
          <Card
            title={card.title}
            imageUrl={card.imageUrl}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default InfiniteCarrousel
