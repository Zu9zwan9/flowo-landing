import React, { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

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
  const tallyFormUrl = "https://tally.so/embed/mZApRa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"

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
    <div className="w-full">
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <iframe
            data-tally-src={tallyFormUrl}
            loading="lazy"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Flowo Beta Signup"
            className="rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default TallyForm
