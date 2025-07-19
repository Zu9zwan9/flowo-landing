import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import TallyForm from '@/components/TallyForm'
import MockupGallery from '@/components/MockupGallery'
import CookieConsent from '@/components/CookieConsent'
import {
  FloatingParticles,
  AnimatedCounter,
  InteractiveFeatureCard,
  PulsingCTA,
  MagneticButton,
  StaggeredText
} from '@/components/InteractiveElements'
import {
  Brain,
  Sparkles,
  Timer,
  CheckSquare,
  Calendar,
  Heart,
  Microscope,
  Target,
  Star,
  Menu,
  X,
  ArrowDown,
  Play,
  Users,
  TrendingUp,
  DollarSign
} from 'lucide-react'

// Design System Colors
const colors = {
  primary: 'hsl(248, 100%, 70%)',
  secondary: 'hsl(340, 100%, 70%)',
  accent: 'hsl(45, 100%, 68%)',
  background: 'hsl(220, 13%, 97%)',
  surface: 'hsl(0, 0%, 100%)',
  text: 'hsl(222, 84%, 5%)',
  textMuted: 'hsl(215, 16%, 47%)',
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen, currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show navigation on privacy page
  if (currentPage === 'privacy' || currentPage === 'about' || currentPage === 'team') {
    return null
  }

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/images/logo.png"
              alt="Flowo Logo"
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['Why Flowo', 'Who It\'s For', 'Mission', 'Testimonials'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                className={`transition-colors font-semibold text-base tracking-wide ${
                  isScrolled ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-purple-200'
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={() => setCurrentPage('about')}
              className={`transition-colors font-semibold text-base tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-purple-200'
              }`}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 0 }}
            >
              About
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('team')}
              className={`transition-colors font-semibold text-base tracking-wide ${
                isScrolled ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-purple-200'
              }`}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 0 }}
            >
              Team
            </motion.button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-white text-base">
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Beta
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-6 py-2">
                {['Why Flowo', 'Who It\'s For', 'Mission', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                    className="text-gray-800 hover:text-purple-600 transition-colors font-semibold text-lg tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  className="text-gray-800 hover:text-purple-600 transition-colors font-semibold text-lg tracking-wide text-left"
                  onClick={() => {
                    setCurrentPage('about');
                    setIsMenuOpen(false);
                  }}
                >
                  About
                </button>
                <button
                  className="text-gray-800 hover:text-purple-600 transition-colors font-semibold text-lg tracking-wide text-left"
                  onClick={() => {
                    setCurrentPage('team');
                    setIsMenuOpen(false);
                  }}
                >
                  Team
                </button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all mt-2 text-white">
                  <span className="flex items-center justify-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Beta
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      {/* Floating Particles */}
      <FloatingParticles count={25} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <StaggeredText
            text="Transforming Planning for Neurodivergent Minds"
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          />

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
          >
            A revolutionary AI-powered planning platform built specifically for ADHD and neurodivergent users,
            tapping into a <AnimatedCounter end={15.2} suffix="B+" /> market opportunity growing at ~<AnimatedCounter end={27} suffix="%" /> annually.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <PulsingCTA
              onClick={() => document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Join Beta - Free Access
            </PulsingCTA>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-10 md:mt-12"
          >
            <p className="text-sm sm:text-base opacity-75 mb-2">
              No credit card required • Free beta access
            </p>
          </motion.div>

          {/* Learn More button moved down and made adaptive */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-10 md:mt-12 flex justify-center"
          >
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('why-flowo')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-white text-white hover:bg-white hover:text-purple-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto max-w-xs mx-auto"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Learn More
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 sm:mb-6 md:mb-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="flex flex-col items-center text-white/70 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => document.getElementById('why-flowo')?.scrollIntoView({ behavior: 'smooth' })}
          >

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-center leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Why Flowo Section
const WhyFlowoSection = () => {
  const features = [
    {
      icon: Target,
      title: "Visual Task Management",
      description: "Break down overwhelming tasks into visual, manageable chunks to reduce anxiety and support task initiation."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Non-linear, intuitive scheduling that adapts to your energy and focus patterns — not rigid time blocks."
    },
    {
      icon: CheckSquare,
      title: "AI-Generated Checklists",
      description: "Smart, adaptive checklists that learn how you work and provide just the right amount of structure without overwhelm."
    },
    {
      icon: Timer,
      title: "Visual Timers",
      description: "Engaging visual timers that help maintain focus and make time tangible for those who struggle with time blindness."
    },
    {
      icon: Brain,
      title: "Personalized Setup",
      description: "Answer a few questions about how your brain works best. Flowo adapts to your unique cognitive style."
    },
    {
      icon: TrendingUp,
      title: "Adaptive Support",
      description: "As you use Flowo, it learns what helps you focus and complete tasks, providing increasingly personalized support."
    }
  ]

  return (
    <section id="why-flowo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{lineHeight: '1.2'}}>
            Why Flowo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Traditional planning tools weren't built for neurodivergent minds. Flowo is different.
            We understand how your brain works and adapt to your unique cognitive style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <InteractiveFeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              color={index % 2 === 0 ? "from-purple-500 to-pink-500" : "from-blue-500 to-cyan-500"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Statistics Card Component
const StatCard = ({ value, label, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardContent className="p-6">
          <div className={`w-12 h-12 mx-auto mb-4 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Who It's For Section
const WhoItsForSection = () => {
  return (
    <section id="who-its-for" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Built for Your Brain
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Flowo is designed specifically for neurodivergent individuals, particularly those with ADHD,
              who struggle with traditional planning methods.
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  title: "ADHD Adults & Teens",
                  description: "Struggling with executive dysfunction, time blindness, and task initiation"
                },
                {
                  title: "Autistic Individuals",
                  description: "Needing structure and predictability in their daily routines"
                },
                {
                  title: "Anyone Seeking Better Planning",
                  description: "Who finds traditional productivity tools overwhelming or ineffective"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/*<Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">*/}
            {/*  <Users className="w-5 h-5 mr-2" />*/}
            {/*  Join Our Community*/}
            {/*</Button>*/}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Massive Underserved Population</h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter end={140} />-<AnimatedCounter end={180} />M
                  </div>
                  <p className="text-gray-600">Adults worldwide have ADHD</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    value={<><AnimatedCounter end={15.2 } />B+</>}
                    label="Market Size"
                    icon={DollarSign}
                    color="bg-gradient-to-r from-purple-500 to-purple-600"
                  />
                  <StatCard
                    value={<><AnimatedCounter end={27} />%</>}
                    label="Annual Growth"
                    icon={TrendingUp}
                    color="bg-gradient-to-r from-pink-500 to-pink-600"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Mission Section
const MissionSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Empathy-Driven",
      description: "Built by neurodivergent founders who understand the daily challenges",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Microscope,
      title: "Science-Backed",
      description: "Grounded in research on executive function and neurodiversity",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Impact-Focused",
      description: "Dedicated to making a meaningful difference in millions of lives",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-2xl text-gray-600 mb-16 leading-relaxed">
            To revolutionize productivity for neurodivergent minds by creating tools that understand
            and adapt to how different brains work, not forcing them into rigid systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-full mx-auto mb-6 flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {name.charAt(0)}
            </div>
            <div className="ml-4">
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="text-sm text-gray-600">{role}</div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed italic">"{content}"</p>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "ADHD Adult, Designer",
      content: "Finally, a planning app that gets it! The visual timers help me stay focused, and the flexible scheduling works with my brain, not against it."
    },
    {
      name: "Marcus T.",
      role: "Autistic, Software Engineer",
      content: "The AI-generated checklists break down my overwhelming projects into manageable steps. It's like having a personal assistant who understands my brain."
    },
    {
      name: "Alex R.",
      role: "ADHD Student",
      content: "I've tried every productivity app out there. Flowo is the first one that actually helps me get things done without feeling overwhelmed."
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{lineHeight: '1.2'}}>
            What Our Beta Users Say
          </h2>
          <p className="text-xl text-gray-600">Real feedback from neurodivergent individuals using Flowo</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Beta Signup Section
const BetaSignupSection = () => {
  return (
    <section id="beta-signup" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join the Beta
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Be among the first to experience planning that actually works for your neurodivergent brain.
              Free beta access with no credit card required.
            </p>

            {/* Tally.so Form */}
            <TallyForm />

            <div className="mt-16 sm:mt-20 md:mt-24 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">What You'll Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                {[
                  { icon: CheckSquare, text: "Free Beta Access" },
                  { icon: X, text: "No Credit Card Required" },
                  { icon: Sparkles, text: "Early Access Features" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-semibold text-lg sm:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = ({ onPrivacyClick, onTeamClick, onAboutClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="/images/logo.png"
                alt="Flowo Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionary planning for neurodivergent minds.
            </p>
            <div className="flex space-x-4">
              {['🐦', '💼', '📧'].map((emoji, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Beta Access", "Roadmap"]
            },
            {
              title: "Company",
              links: [
                { text: "About", onClick: onAboutClick },
                { text: "Team", onClick: onTeamClick }
              ]
            },
            {
              title: "Support",
              links: [
                { text: "Help Center", onClick: null },
                { text: "Privacy Policy", onClick: onPrivacyClick },
                { text: "Contact", onClick: null }
              ]
            }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.text}>
                    {typeof link === 'string' ? (
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="text-gray-400 hover:text-white transition-colors text-left"
                      >
                        {link.text}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="text-center text-gray-400">
          <p>&copy; 2024 Flowo. All rights reserved. Built with ❤️ for neurodivergent minds.</p>
        </div>
      </div>
    </footer>
  )
}

// Team Page Component
const TeamPage = ({ onBack }) => {
  const teamMembers = [
    {
      name: "Maksym Bardakh (Ivko)",
      role: "Founder & CEO",
      titles: ["Software Engineer", "ADHD Advocate"],
      bio: "After being diagnosed with ADHD, Maksym began a personal journey to better organize his life. A trained software engineer, he explored countless planning methods and productivity frameworks, seeking tools that truly support the neurodivergent mind. Along the way, he recognized a glaring gap: most systems weren’t built with people like him in mind.  After graduating from university, Maksym realized he had not only the technical skills but also the lived experience to create something better, not just for himself, but for others facing similar challenges. That realization led to the creation of Flowo: a platform designed to help neurodivergent individuals think, plan, and thrive on their terms.  In early 2024, he launched Flowo’s first research initiative focused on the unique needs of teens with ADHD. That work laid the foundation for a product built with real empathy, real insight, and a mission to make daily planning truly inclusive.",
      initial: "M"
    },
    {
      name: "Mykhailo Boichuk",
      role: "CTO & Lead Engineer",
      titles: ["Software Engineer", "ADHD Advocate"],
      bio: "Mykhailo is a skilled software engineer with a deep passion for creating technology that drives meaningful change. During university, he and Maksym formed a close partnership, collaborating on system design, application development, and a shared vision for tools that make life tangibly better.  When Maksym shared his idea for Flowo, Mykhailo immediately connected with its purpose. With a strong belief in technology for social good, he brought both technical rigor and user-centered thinking to the project. As CTO, Mykhailo leads the development of Flowo’s architecture, ensuring the platform is not only powerful and scalable but also intuitive and accessible for neurodivergent users.  Together, Maksym and Mykhailo combine lived experience with engineering excellence—pushing Flowo forward as a product that empowers individuals to organize their lives with confidence, clarity, and compassion.",
      initial: "M"
    }
  ]

  const navigateToSection = (sectionId) => {
    onBack()
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <main className="">
          <section className="py-20 bg-gradient-to-b from-purple-50 to-gray-100">
            <div className="container mx-auto px-4">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 text-center"
              >
                <Button
                    variant="ghost"
                    className="mb-8 text-gray-800 hover:text-gray-900"
                    onClick={onBack}
                >
                  ← Back to Home
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Our Team
                </h1>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  Meet the passionate minds behind Flowo, dedicated to creating better planning tools for neurodivergent individuals.
                </p>
              </motion.div>

              {/* Quick Navigation */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  ['why-flowo', 'Why Flowo'],
                  ['who-its-for', "Who It's For"],
                  ['mission', 'Mission'],
                  ['testimonials', 'Testimonials']
                ].map(([id, label]) => (
                    <Button
                        key={id}
                        variant="outline"
                        className="text-gray-800 border-gray-300 hover:bg-gray-200"
                        onClick={() => navigateToSection(id)}
                    >
                      {label}
                    </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="bg-gray-50 rounded-xl shadow-lg overflow-hidden mb-20"
                    >
                      <div className="p-8 bg-gray-50">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                            {member.initial}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                            <p className="text-purple-600 font-medium">{member.role}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          {member.titles.map((title, i) => (
                              <Badge key={i} className="mr-2 mb-2 bg-purple-100 text-purple-800">
                                {title}
                              </Badge>
                          ))}
                        </div>

                        <p className="text-gray-800 leading-relaxed mb-6">
                          {member.bio}
                        </p>
                      </div>
                    </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer
            onPrivacyClick={() => onBack('privacy')}
            onTeamClick={() => onBack('team')}
            onAboutClick={() => onBack('about')}
        />
      </div>
  )
}

// About Page Component
const AboutPage = ({ onBack }) => {
  // Function to navigate to a section on the home page
  const navigateToSection = (sectionId) => {
    onBack()
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <main className="">
          <section className="py-20 bg-gradient-to-b from-purple-50 to-gray-100">
            <div className="container mx-auto px-4">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-16 text-center"
              >
                <Button
                    variant="ghost"
                    className="mb-8 text-gray-800 hover:text-gray-900"
                    onClick={onBack}
                >
                  ← Back to Home
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  About Flowo
                </h1>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                  Our journey to create better planning tools for neurodivergent minds.
                </p>
              </motion.div>

              {/* Quick Navigation */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  ['why-flowo', 'Why Flowo'],
                  ['who-its-for', "Who It's For"],
                  ['mission', 'Mission'],
                  ['testimonials', 'Testimonials']
                ].map(([id, label]) => (
                    <Button
                        key={id}
                        variant="outline"
                        className="text-gray-800 border-gray-300 hover:bg-gray-200"
                        onClick={() => navigateToSection(id)}
                    >
                      {label}
                    </Button>
                ))}
              </div>

              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 bg-gray-50">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Journey</h2>
                    <p className="text-gray-800 leading-relaxed mb-8">
                      Our journey began with firsthand experience: when Maksym was diagnosed with ADHD, it sparked a deeper exploration into the everyday challenges neurodivergent individuals face with traditional planning tools.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Research & Insights</h2>
                    <p className="text-gray-800 leading-relaxed mb-6">
                      In early 2024, we initiated a research project focused on understanding the needs of ADHD teens. This included:
                    </p>

                    <ul className="list-disc pl-6 mb-8 text-gray-800 space-y-2">
                      <li>1:1 interviews with neurodivergent individuals and their caregivers</li>
                      <li>Online surveys targeting ADHD communities</li>
                      <li>Observation sessions to understand how users interact with existing planning tools</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
                    <p className="text-gray-800 leading-relaxed mb-6">
                      Key insights emerged consistently across our research:
                    </p>

                    <ul className="list-disc pl-6 mb-8 text-gray-800 space-y-2">
                      <li>Difficulty initiating tasks</li>
                      <li>Frustration with rigid, linear planning systems</li>
                      <li>Overwhelm from traditional tools that demand high executive function</li>
                      <li>The need for visual, intuitive, and forgiving systems</li>
                      <li>A strong desire for tools that adapt to the user, not the other way around</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Solution</h2>
                    <p className="text-gray-800 leading-relaxed mb-8">
                      This validation process shaped both the vision and functionality of Flowo. The user pain points we uncovered continue to guide our design and development priorities. We are building Flowo, a flexible planning tool designed from the ground up for ADHD'ers and other neurodivergent users. It includes features like visual timers, adaptive AI-generated checklists, and non-linear, intuitive scheduling that meets users where they are—mentally and emotionally.
                    </p>

                    <p className="text-gray-800 leading-relaxed font-medium">
                      The core goal is to reduce overwhelm, support task initiation, and create a planning experience that aligns with how users actually think.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer
            onPrivacyClick={() => onBack('privacy')}
            onTeamClick={() => onBack('team')}
            onAboutClick={() => {}}
        />
      </div>
  )
}

// Pricing Page Component
const PricingPage = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals just getting started",
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      features: [
        "Visual task management",
        "Flexible scheduling",
        "Basic AI assistance",
        "Mobile app access"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      description: "Enhanced features for power users",
      price: billingCycle === 'monthly' ? 19.99 : 199.99,
      features: [
        "Everything in Basic",
        "Advanced AI-generated checklists",
        "Custom visual timers",
        "Progress analytics",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Team",
      description: "Collaboration tools for groups",
      price: billingCycle === 'monthly' ? 49.99 : 499.99,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared projects",
        "Admin controls",
        "Team analytics",
        "Dedicated account manager"
      ],
      highlighted: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <Button
                variant="ghost"
                className="mb-8"
                onClick={onBack}
              >
                ← Back to Home
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pricing Plans
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your needs. All plans include a 14-day free trial.
              </p>

              <div className="flex items-center justify-center mt-8 mb-12">
                <div className="bg-gray-100 p-1 rounded-full flex items-center">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      billingCycle === 'monthly' 
                        ? 'bg-white shadow-md text-purple-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      billingCycle === 'yearly' 
                        ? 'bg-white shadow-md text-purple-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setBillingCycle('yearly')}
                  >
                    Yearly <span className="text-green-500 font-semibold">Save 16%</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-xl overflow-hidden ${
                    plan.highlighted 
                      ? 'ring-2 ring-purple-500 shadow-xl transform md:scale-105' 
                      : 'border border-gray-200 shadow-lg'
                  }`}
                >
                  <div className="p-6">
                    {plan.highlighted && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full inline-block mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    <Button
                      className={`w-full mb-6 ${
                        plan.highlighted 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : 'bg-gray-800 hover:bg-gray-900'
                      }`}
                    >
                      Start Free Trial
                    </Button>
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckSquare className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-6 mt-8">
                {[
                  {
                    question: "Can I switch plans later?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                  },
                  {
                    question: "Is there a free trial?",
                    answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and Apple Pay."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-6 text-left">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer
        onPrivacyClick={() => onBack('privacy')}
        onTeamClick={() => onBack('team')}
        onAboutClick={() => onBack('about')}
      />
      {/*<AccessibilityControls />*/}
    </div>
  );
};

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentPage('home')} />
      case 'team':
        return <TeamPage onBack={() => setCurrentPage('home')} />
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('home')} />
      case 'pricing':
        return <PricingPage onBack={() => setCurrentPage('home')} />
      default:
        return (
          <div className="min-h-screen bg-white">
            <main id="main-content">
              <HeroSection />
              <WhyFlowoSection />
              <WhoItsForSection />
              <MissionSection />
              <TestimonialsSection />
              <MockupGallery />
              <BetaSignupSection />
            </main>
            <Footer
              onPrivacyClick={() => setCurrentPage('privacy')}
              onTeamClick={() => setCurrentPage('team')}
              onAboutClick={() => setCurrentPage('about')}
            />
            {/*<AccessibilityControls />*/}
          </div>
        )
    }
  }

  return (
    <>
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
      <CookieConsent />
    </>
  )
}

export default App
