import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Sparkles, 
  Mail, 
  User, 
  Brain, 
  CheckSquare,
  Loader2,
  ExternalLink
} from 'lucide-react'

// Configuration for Tally.so form
const TALLY_CONFIG = {
  // Replace with actual Tally.so form URL when available
  formUrl: "https://tally.so/r/YOUR_FORM_ID",
  // For demo purposes, we'll create a custom form
  isDemoMode: true
}

const TallyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    neurodivergentType: '',
    currentTools: '',
    challenges: '',
    newsletter: true,
    updates: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // In production, this would submit to Tally.so
      // For demo, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      
      // Track form submission (replace with actual analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'beta_signup'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (TALLY_CONFIG.isDemoMode && isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <CheckSquare className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Flowo Beta! 🎉</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for joining our beta program! We're excited to help you transform your planning experience. 
              You'll receive an email with next steps and early access information soon.
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600">
                <strong>What's next?</strong><br />
                • Check your email for beta access instructions<br />
                • Join our community Discord server<br />
                • Start planning with your neurodivergent brain in mind!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Production Tally.so iframe integration
  if (!TALLY_CONFIG.isDemoMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <iframe
              data-tally-src={TALLY_CONFIG.formUrl}
              loading="lazy"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Flowo Beta Signup"
              className="rounded-lg"
            />
            <script>
              {`var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.head.appendChild(s);}`}
            </script>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Demo form for development/preview
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join the Flowo Beta</h3>
            <p className="text-gray-600">
              Be among the first to experience planning that works with your neurodivergent brain
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Neurodivergent Type */}
            <div className="space-y-2">
              <Label htmlFor="neurodivergentType" className="text-sm font-medium text-gray-700">
                How would you describe yourself? (Optional)
              </Label>
              <div className="relative">
                <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="neurodivergentType"
                  type="text"
                  value={formData.neurodivergentType}
                  onChange={(e) => handleInputChange('neurodivergentType', e.target.value)}
                  className="pl-10"
                  placeholder="e.g., ADHD, Autistic, Neurodivergent, etc."
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Current Tools */}
            <div className="space-y-2">
              <Label htmlFor="currentTools" className="text-sm font-medium text-gray-700">
                What planning tools do you currently use? (Optional)
              </Label>
              <Input
                id="currentTools"
                type="text"
                value={formData.currentTools}
                onChange={(e) => handleInputChange('currentTools', e.target.value)}
                placeholder="e.g., Notion, Todoist, paper planners, etc."
                disabled={isSubmitting}
              />
            </div>

            {/* Challenges */}
            <div className="space-y-2">
              <Label htmlFor="challenges" className="text-sm font-medium text-gray-700">
                What's your biggest planning challenge? (Optional)
              </Label>
              <Input
                id="challenges"
                type="text"
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                placeholder="e.g., time blindness, task initiation, overwhelm, etc."
                disabled={isSubmitting}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-600">
                  Send me tips and resources for neurodivergent planning
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.updates}
                  onCheckedChange={(checked) => handleInputChange('updates', checked)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="updates" className="text-sm text-gray-600">
                  Notify me about Flowo updates and new features
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 h-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining Beta...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Free Beta Access
                </>
              )}
            </Button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing up, you agree to our{' '}
                <button 
                  type="button"
                  className="text-purple-600 hover:underline"
                  onClick={() => {/* Handle privacy policy click */}}
                >
                  Privacy Policy
                </button>
                . No spam, unsubscribe anytime.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TallyForm

