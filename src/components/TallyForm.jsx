import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * TallyForm component that embeds a Tally.so form
 *
 * This component embeds the Tally.so form with the following configuration:
 * - alignLeft=1: Aligns the form to the left
 * - hideTitle=1: Hides the form title
 * - transparentBackground=1: Makes the background transparent
 * - dynamicHeight=1: Adjusts the height dynamically based on content
 */
const TallyForm = () => {
  // URL for the Tally.so form with configuration parameters
  const tallyFormUrl = "https://tally.so/embed/mZApRa?alignLeft=1&hideTitle=1&dynamicHeight=1"

  // Load the Tally.so embed script
  useEffect(() => {
    // This script is provided by Tally.so to load the form
    const script = document.createElement('script')
    script.src = "https://tally.so/widgets/embed.js"
    script.async = true
    document.body.appendChild(script)

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section id="beta-signup" className="py-2">
      <div className="container mx-auto px-4">
        <Card className="bg-white rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-lg py-0 gap-0">
          {/* Header with title and description */}
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-8 rounded-t-2xl">
            <CardTitle>Sign up to try Flowo before everyone else.</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center px-6 pb-8">
            <iframe
              data-tally-src={tallyFormUrl}
              loading="lazy"
              style={{ minHeight: '500px' }}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Flowo Beta Signup"
              className="w-full md:w-4/5 lg:w-3/4 mx-auto"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default TallyForm
