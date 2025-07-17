import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import screen1 from '@/assets/Screen1.png'
import screen2 from '@/assets/Screen2.png'
import screen3 from '@/assets/Screen3.png'
import screen4 from '@/assets/Screen4.png'
import screen5 from '@/assets/Screen5.png'
import screen6 from '@/assets/Screen6.png'
import screen7 from '@/assets/Screen7.png'
import screen8 from '@/assets/Screen8.png'
import screen9 from '@/assets/Screen9.png'

const MockupGallery = () => {
  const screens = [
    { img: screen1, title: 'Stay Focused, Stay Flowing', subtitle: 'Visual structure that helps you focus — not feel behind.' },
    { img: screen2, title: 'Finally, a Task Creator That Adapts to You', subtitle: 'Choose planning style, deadline, color, and category — make it yours in seconds.' },
    { img: screen3, title: 'Big Task? Let AI Break It Into Easy Steps', subtitle: 'Turn “where do I start?” into small wins — instantly and automatically.' },
    { img: screen4, title: 'Turn Chaos into Clarity', subtitle: 'Every task is structured into simple, doable actions — no more overwhelm.' },
    { img: screen5, title: 'Estimate Time Without the Pressure', subtitle: 'Use best/worst/realistic time to plan flexibly — and stop second-guessing yourself.' },
    { img: screen6, title: 'One Tap to Focus Mode', subtitle: 'Start, pause, or resume tasks anytime — without breaking your rhythm.' },
    { img: screen7, title: 'Your Routine, Your Rules', subtitle: 'Adaptable routines for focus, flexibility, and real life.' },
    { img: screen8, title: 'Make Progress Feel Good', subtitle: 'Get friendly insights — not guilt — and grow with clarity.' },
    { img: screen9, title: 'Celebrate Every Win', subtitle: 'Satisfying confetti marks progress and keeps you motivated to keep going.' },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.section
      id="screens"
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            See the app in action
          </h2>
        </div>

        {/* Dynamic caption for active slide */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">
            {screens[activeIndex].title}
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {screens[activeIndex].subtitle}
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          pagination={{ clickable: true }}
          loop={true}
          onSlideChange={({ realIndex }) => setActiveIndex(realIndex)}
          className="pb-16"
        >
          {screens.map((screenObj, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-w-xs mx-auto">
                <img src={screenObj.img} alt={screenObj.title} className="slide-img w-full rounded-xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to action */}
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600 mb-6">
            Ready to try it yourself?
          </p>
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the beta testing
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default MockupGallery
