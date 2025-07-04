import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react'

const PrivacyPolicy = ({ onBack }) => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Account information (email, name) when you sign up for beta access",
        "Usage data to improve our app's functionality and user experience",
        "Device information for compatibility and performance optimization",
        "Feedback and communication when you contact our support team"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide and improve our planning platform services",
        "Send important updates about your beta access and app features",
        "Analyze usage patterns to enhance neurodivergent-friendly features",
        "Respond to your questions and provide customer support"
      ]
    },
    {
      title: "Data Protection",
      icon: Lock,
      content: [
        "All data is encrypted in transit and at rest using industry-standard protocols",
        "We implement strict access controls and regular security audits",
        "Your planning data remains private and is never shared with third parties",
        "We comply with GDPR, CCPA, and other applicable privacy regulations"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access, update, or delete your personal information at any time",
        "Opt out of non-essential communications",
        "Request a copy of your data in a portable format",
        "Contact us with any privacy concerns or questions"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-purple-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-gray-600 mt-1">Last updated: December 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Privacy Matters</h2>
                    <p className="text-gray-600">We're committed to protecting your personal information</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  At Flowo, we understand that privacy is especially important for neurodivergent individuals. 
                  This policy explains how we collect, use, and protect your information when you use our 
                  planning platform. We believe in transparency and giving you control over your data.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl text-gray-900">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg bg-gray-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We're here to help. If you have any questions about this privacy policy or how we handle your data, 
                  please don't hesitate to reach out to our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Contact Privacy Team
                  </Button>
                  <Button variant="outline">
                    Download Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Separator className="my-12" />

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center text-gray-500 text-sm"
          >
            <p>
              This privacy policy is effective as of December 2024 and will remain in effect except with respect to any 
              changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

