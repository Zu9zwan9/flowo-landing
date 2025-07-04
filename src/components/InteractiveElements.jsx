import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Sparkles, 
  Timer, 
  CheckSquare, 
  Zap,
  Heart,
  Star,
  ArrowRight
} from 'lucide-react'

// Floating particles animation
export const FloatingParticles = ({ count = 20 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Animated counter component
export const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

// Morphing icon component
export const MorphingIcon = ({ icons, interval = 3000 }) => {
  const [currentIcon, setCurrentIcon] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, interval)

    return () => clearInterval(timer)
  }, [icons.length, interval])

  return (
    <motion.div
      key={currentIcon}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-8 h-8 flex items-center justify-center"
    >
      {React.createElement(icons[currentIcon], { className: "w-full h-full" })}
    </motion.div>
  )
}

// Interactive feature card with hover effects
export const InteractiveFeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = "from-purple-500 to-pink-500",
  delay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden relative">
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <CardContent className="p-6 relative z-10">
          <motion.div 
            className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center`}
            animate={isHovered ? { 
              scale: 1.1, 
              rotate: 5,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            } : { 
              scale: 1, 
              rotate: 0,
              boxShadow: "0 10px 20px rgba(139, 92, 246, 0.1)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-xl font-bold text-gray-900 mb-3 text-center"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 text-center leading-relaxed"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {description}
          </motion.p>

          {/* Hover indicator */}
          <motion.div
            className="flex items-center justify-center mt-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium mr-2">Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Animated progress bar
export const AnimatedProgressBar = ({ value, label, color = "purple" }) => {
  const [progress, setProgress] = useState(0)
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress(value)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [inView, value])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Pulsing CTA button
export const PulsingCTA = ({ children, onClick, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Button
        onClick={onClick}
        className={`relative overflow-hidden ${className}`}
      >
        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

// Magnetic button effect
export const MagneticButton = ({ children, ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!isHovered) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Button {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

// Staggered text animation
export const StaggeredText = ({ text, className = "" }) => {
  const words = text.split(' ')

  return (
    <motion.div 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Floating action button with tooltip
export const FloatingActionButton = ({ icon: Icon, tooltip, onClick, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center ${className}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: showTooltip ? 1 : 0, 
          scale: showTooltip ? 1 : 0.8,
          y: showTooltip ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap pointer-events-none"
      >
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </motion.div>
    </div>
  )
}

