import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Eye, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX, 
  Contrast,
  Type,
  Accessibility
} from 'lucide-react'

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    soundEffects: true
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('flowo-accessibility-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage and apply changes
  useEffect(() => {
    localStorage.setItem('flowo-accessibility-settings', JSON.stringify(settings))
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
      document.documentElement.style.setProperty('--transition-duration', '0.01ms')
    } else {
      document.documentElement.style.removeProperty('--animation-duration')
      document.documentElement.style.removeProperty('--transition-duration')
    }

    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }

    // Apply large text
    if (settings.largeText) {
      document.documentElement.classList.add('large-text')
    } else {
      document.documentElement.classList.remove('large-text')
    }
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const accessibilityOptions = [
    {
      key: 'reducedMotion',
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: settings.reducedMotion ? Pause : Play,
      value: settings.reducedMotion
    },
    {
      key: 'highContrast',
      label: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: Contrast,
      value: settings.highContrast
    },
    {
      key: 'largeText',
      label: 'Large Text',
      description: 'Increase text size for better readability',
      icon: Type,
      value: settings.largeText
    },
    {
      key: 'soundEffects',
      label: 'Sound Effects',
      description: 'Enable audio feedback for interactions',
      icon: settings.soundEffects ? Volume2 : VolumeX,
      value: settings.soundEffects
    }
  ]

  return (
    <>
      {/* Accessibility Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open accessibility controls"
        >
          <Accessibility className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-24 right-6 z-50 w-80"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Accessibility className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
                      <p className="text-sm text-gray-600">Customize your experience</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {accessibilityOptions.map((option) => (
                      <motion.div
                        key={option.key}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <option.icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{option.label}</div>
                            <div className="text-xs text-gray-500">{option.description}</div>
                          </div>
                        </div>
                        <Switch
                          checked={option.value}
                          onCheckedChange={(checked) => updateSetting(option.key, checked)}
                          aria-label={`Toggle ${option.label}`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Settings are saved automatically and persist across sessions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
    </>
  )
}

export default AccessibilityControls

