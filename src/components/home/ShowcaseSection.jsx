import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ShowcaseSection = () => {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  gsap.registerPlugin(ScrollTrigger)

  // Wedding video showcase data with cinematic stills and highlights
  const showcaseItems = [
    {
      id: 1,
      title: 'Romantic Ceremony',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Ceremony'
    },
    {
      id: 2,
      title: 'First Dance Magic',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Reception'
    },
    {
      id: 3,
      title: 'Golden Hour Portraits',
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Portraits'
    },
    {
      id: 4,
      title: 'Emotional Vows',
      image: 'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Ceremony'
    },
    {
      id: 5,
      title: 'Celebration Moments',
      image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Reception'
    },
    {
      id: 6,
      title: 'Intimate Details',
      image: 'https://images.pexels.com/photos/1444408/pexels-photo-1444408.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Details'
    },
    {
      id: 7,
      title: 'Sunset Romance',
      image: 'https://images.pexels.com/photos/1444401/pexels-photo-1444401.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Portraits'
    },
    {
      id: 8,
      title: 'Joyful Celebration',
      image: 'https://images.pexels.com/photos/1444394/pexels-photo-1444394.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      type: 'Reception'
    }
  ]

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...showcaseItems, ...showcaseItems]

  useGSAP(() => {
    // Section title animation
    gsap.fromTo('.showcase-title',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.showcase-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Cards animation on scroll
    gsap.fromTo('.showcase-card',
      {
        opacity: 0,
        scale: 0.95,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  // Auto-scroll animation
  useEffect(() => {
    if (!trackRef.current || isDragging) return

    const autoScroll = gsap.to(trackRef.current, {
      x: '-50%', // Move half the width (since we duplicated items)
      duration: 40,
      ease: 'none',
      repeat: -1,
      paused: false
    })

    return () => autoScroll.kill()
  }, [isDragging])

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
    trackRef.current.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    trackRef.current.style.cursor = 'grab'
  }

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 overflow-hidden section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="showcase-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Our Cinematic Works
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="font-[font1] text-responsive leading-relaxed text-layer-2">
              Découvrez nos créations cinématographiques qui capturent l'essence de votre jour spécial
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Showcase */}
        <div className="showcase-container relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-pattern-dots">
          <div
            ref={trackRef}
            className="showcase-track flex gap-6 sm:gap-8 lg:gap-10 xl:gap-12 py-8 sm:py-10 lg:py-12 cursor-grab select-none"
            style={{ width: '200%' }} // Double width for seamless loop
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="showcase-card flex-shrink-0 w-72 sm:w-80 lg:w-96 xl:w-[420px] group gpu-accelerated"
              >
                <div className="relative aspect-[4/3] bg-black rounded-xl sm:rounded-2xl overflow-hidden video-glass transition-all duration-500 ease-out">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    draggable="false"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <div className="space-y-2 sm:space-y-3">
                      <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-[#D3FD50] text-black text-xs sm:text-sm font-[font2] uppercase tracking-wide rounded-full glow-accent">
                        {item.type}
                      </span>
                      <h3 className="font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-white text-layer-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D3FD50] rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(211,253,80,0.3)]" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D3FD50] rounded-full flex items-center justify-center glow-accent micro-bounce">
                      <span className="text-black text-2xl sm:text-3xl ml-1">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <p className="font-[font1] text-sm sm:text-base text-layer-1 opacity-70">
            <span className="desktop-up">Drag to explore • </span>
            <span className="mobile-only">Swipe to explore • </span>
            Auto-scrolling showcase
          </p>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection