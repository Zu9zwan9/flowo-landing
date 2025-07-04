import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import AccessibilityControls from '@/components/AccessibilityControls'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import TallyForm from '@/components/TallyForm'
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
  if (currentPage === 'privacy') {
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Flowo
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Why Flowo', 'Who It\'s For', 'Mission', 'Testimonials'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Join Beta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
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
              <div className="flex flex-col space-y-4">
                {['Why Flowo', 'Who It\'s For', 'Mission', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full">
                  Join Beta
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
            tapping into a <AnimatedCounter end={1} suffix="B+" /> market opportunity growing at ~<AnimatedCounter end={27} suffix="%" /> annually.
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
            <MagneticButton
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 h-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Learn More
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-sm opacity-75"
          >
            No credit card required • Free beta access
          </motion.p>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="flex flex-col items-center text-white/70 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => document.getElementById('why-flowo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </Button>
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
                    value={<><AnimatedCounter end={1} />B+</>}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: CheckSquare, text: "Free Beta Access" },
                { icon: X, text: "No Credit Card Required" },
                { icon: Sparkles, text: "Early Access Features" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center justify-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-600 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = ({ onPrivacyClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Flowo</span>
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
              links: ["About", "Team", "Careers"]
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

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentPage('home')} />
      default:
        return (
          <div className="min-h-screen bg-white">
            <main id="main-content">
              <HeroSection />
              <WhyFlowoSection />
              <WhoItsForSection />
              <MissionSection />
              <TestimonialsSection />
              <BetaSignupSection />
            </main>
            <Footer onPrivacyClick={() => setCurrentPage('privacy')} />
            <AccessibilityControls />
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
    </>
  )
}

export default App

